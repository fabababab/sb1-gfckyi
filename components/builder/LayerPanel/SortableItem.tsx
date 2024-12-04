'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Trash2, GripVertical, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COMPONENTS } from '@/lib/components';
import { ComponentInstance } from '@/lib/types';

interface SortableItemProps {
  component: ComponentInstance;
  isActive: boolean;
  isHidden: boolean;
  isLayout?: boolean;
  level?: number;
  onSelect: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onRemove: (id: string) => void;
}

export function SortableItem({
  component,
  isActive,
  isHidden,
  isLayout,
  level = 0,
  onSelect,
  onToggleVisibility,
  onRemove,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const componentMeta = COMPONENTS.find(c => c.id === component.componentId);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginLeft: level > 0 ? `${level * 1}rem` : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "p-3 rounded-md flex items-center justify-between group hover:bg-accent/5",
        isActive && "bg-accent/10",
        isDragging && "opacity-50"
      )}
      onClick={() => onSelect(component.id)}
    >
      <div className="flex items-center gap-2">
        <div {...listeners} className="cursor-grab">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
        {isLayout && <LayoutGrid className="h-4 w-4 text-primary" />}
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
            onToggleVisibility(component.id);
          }}
        >
          {isHidden ? (
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
            onRemove(component.id);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}