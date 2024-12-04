'use client';

import { ComponentInstance } from '@/lib/types';
import { SortableItem } from './SortableItem';
import { COMPONENTS } from '@/lib/components';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface SortableListProps {
  items: ComponentInstance[];
  activeId: string | null;
  hiddenItems: string[];
  level?: number;
  onSelect: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onRemove: (id: string) => void;
}

export function SortableList({
  items,
  activeId,
  hiddenItems,
  level = 0,
  onSelect,
  onToggleVisibility,
  onRemove,
}: SortableListProps) {
  return (
    <SortableContext
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div className="space-y-2">
        {items.map((item) => {
          const componentMeta = COMPONENTS.find(c => c.id === item.componentId);
          const isLayout = componentMeta?.isLayout;
          
          return (
            <div key={item.id}>
              <SortableItem
                component={item}
                isActive={activeId === item.id}
                isHidden={hiddenItems.includes(item.id)}
                level={level}
                onSelect={onSelect}
                onToggleVisibility={onToggleVisibility}
                onRemove={onRemove}
                isLayout={isLayout}
              />
              {isLayout && item.children && item.children.length > 0 && (
                <SortableList
                  items={item.children}
                  activeId={activeId}
                  hiddenItems={hiddenItems}
                  level={level + 1}
                  onSelect={onSelect}
                  onToggleVisibility={onToggleVisibility}
                  onRemove={onRemove}
                />
              )}
            </div>
          );
        })}
      </div>
    </SortableContext>
  );
}