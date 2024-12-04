'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Layers } from 'lucide-react';
import { useBuilderStore } from '@/lib/store';
import { SortableList } from './SortableList';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { DraggableOverlay } from './DraggableOverlay';
import { useSortableTree } from './useSortableTree';

export function LayerPanel() {
  const components = useBuilderStore((state) => state.components);
  const activeComponent = useBuilderStore((state) => state.activeComponent);
  const setActiveComponent = useBuilderStore((state) => state.setActiveComponent);
  const removeComponent = useBuilderStore((state) => state.removeComponent);
  const toggleComponentVisibility = useBuilderStore((state) => state.toggleComponentVisibility);
  const hiddenComponents = useBuilderStore((state) => state.hiddenComponents);

  const {
    activeId,
    handleDragStart,
    handleDragMove,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  } = useSortableTree();

  return (
    <div className="w-80 border-l border-border h-full bg-card">
      <div className="p-4 border-b flex items-center gap-2">
        <Layers className="h-4 w-4" />
        <h2 className="font-semibold text-lg">Layers</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-60px)]">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="p-4">
            {components.length === 0 ? (
              <div className="text-center text-muted-foreground text-sm py-8">
                Add components to see them here
              </div>
            ) : (
              <SortableList
                items={components}
                activeId={activeComponent}
                hiddenItems={hiddenComponents}
                onSelect={setActiveComponent}
                onToggleVisibility={toggleComponentVisibility}
                onRemove={removeComponent}
              />
            )}
          </div>
          <DraggableOverlay draggedId={activeId} components={components} />
        </DndContext>
      </ScrollArea>
    </div>
  );
}