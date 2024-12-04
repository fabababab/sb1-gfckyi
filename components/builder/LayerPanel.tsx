'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Trash2, GripVertical, Layers } from 'lucide-react';
import { useBuilderStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { COMPONENTS } from '@/lib/components';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export function LayerPanel() {
  const components = useBuilderStore((state) => state.components);
  const activeComponent = useBuilderStore((state) => state.activeComponent);
  const setActiveComponent = useBuilderStore((state) => state.setActiveComponent);
  const removeComponent = useBuilderStore((state) => state.removeComponent);
  const toggleComponentVisibility = useBuilderStore((state) => state.toggleComponentVisibility);
  const hiddenComponents = useBuilderStore((state) => state.hiddenComponents);
  const reorderComponents = useBuilderStore((state) => state.reorderComponents);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = components.findIndex((item) => item.id === active.id);
      const newIndex = components.findIndex((item) => item.id === over.id);
      reorderComponents(oldIndex, newIndex);
    }
  };

  return (
    <div className="w-80 border-l border-border h-full bg-card">
      <div className="p-4 border-b flex items-center gap-2">
        <Layers className="h-4 w-4" />
        <h2 className="font-semibold text-lg">Layers</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-60px)]">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <div className="p-4 space-y-2">
            <SortableContext
              items={components.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {components.length === 0 ? (
                <div className="text-center text-muted-foreground text-sm py-8">
                  Add components to see them here
                </div>
              ) : (
                components.map((component) => {
                  const componentMeta = COMPONENTS.find(c => c.id === component.componentId);
                  return (
                    <SortableItem key={component.id} id={component.id}>
                      <div
                        className={cn(
                          "p-3 rounded-md flex items-center justify-between group hover:bg-accent/5",
                          activeComponent === component.id && "bg-accent/10"
                        )}
                        onClick={() => setActiveComponent(component.id)}
                      >
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                          <span className="text-sm font-medium">
                            {componentMeta?.title || component.componentId}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleComponentVisibility(component.id);
                            }}
                          >
                            {hiddenComponents.includes(component.id) ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeComponent(component.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </SortableItem>
                  );
                })
              )}
            </SortableContext>
          </div>
        </DndContext>
      </ScrollArea>
    </div>
  );
}