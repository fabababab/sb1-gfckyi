'use client';

import { DragOverlay } from '@dnd-kit/core';
import { COMPONENTS } from '@/lib/components';

interface DraggableOverlayProps {
  draggedId: string | null;
  components: any[];
}

export function DraggableOverlay({ draggedId, components }: DraggableOverlayProps) {
  if (!draggedId) return null;

  const draggedComponent = components.find(c => c.id === draggedId);
  if (!draggedComponent) return null;

  const componentMeta = COMPONENTS.find(c => c.id === draggedComponent.componentId);

  return (
    <DragOverlay>
      <div className="p-3 rounded-md bg-background border shadow-lg">
        <span className="text-sm font-medium">
          {componentMeta?.title || draggedComponent.componentId}
        </span>
      </div>
    </DragOverlay>
  );
}