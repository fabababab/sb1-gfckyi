'use client';

import { useBuilderStore } from '@/lib/store';
import { useState } from 'react';
import { COMPONENTS } from '@/lib/components';
import { ComponentInstance } from '@/lib/types';

export function useComponentDragDrop() {
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [draggedInstance, setDraggedInstance] = useState<string | null>(null);
  const addComponent = useBuilderStore((state) => state.addComponent);
  const components = useBuilderStore((state) => state.components);
  const moveComponent = useBuilderStore((state) => state.moveComponent);

  const findComponent = (components: ComponentInstance[], instanceId: string): ComponentInstance | null => {
    for (const component of components) {
      if (component.id === instanceId) return component;
      if (component.children) {
        const found = findComponent(component.children, instanceId);
        if (found) return found;
      }
    }
    return null;
  };

  const isValidDrop = (draggedId: string, targetParentId?: string) => {
    // Allow dropping at root level
    if (!targetParentId) return true;

    // Find the parent component
    const parentComponent = findComponent(components, targetParentId);
    if (!parentComponent) return false;

    // Get metadata for both components
    const draggedMeta = COMPONENTS.find(c => c.id === draggedId);
    const parentMeta = COMPONENTS.find(c => c.id === parentComponent.componentId);
    
    // Parent must be a layout component
    if (!parentMeta?.isLayout) return false;
    
    // Parent must allow this type of child
    if (!parentMeta.allowedChildren?.includes(draggedId)) return false;

    // Prevent nesting layout components too deeply (optional)
    if (draggedMeta?.isLayout) {
      let depth = 0;
      let current = parentComponent;
      while (current) {
        depth++;
        if (depth > 3) return false; // Maximum nesting depth of 3
        current = findComponent(components, current.id);
      }
    }

    return true;
  };

  const handleDragStart = (componentId: string, instanceId?: string) => {
    setDraggedComponent(componentId);
    if (instanceId) {
      setDraggedInstance(instanceId);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (targetIndex: number, parentId?: string) => {
    if (!draggedComponent) return;

    // Validate the drop
    if (!isValidDrop(draggedComponent, parentId)) {
      console.warn('Invalid drop target for this component');
      return;
    }

    // If we're moving an existing component
    if (draggedInstance) {
      // Prevent dropping a component into itself or its children
      if (parentId) {
        let current = findComponent(components, parentId);
        while (current) {
          if (current.id === draggedInstance) {
            console.warn('Cannot drop a component into itself or its children');
            return;
          }
          current = current.children ? findComponent(current.children, parentId) : null;
        }
      }

      moveComponent(draggedInstance, parentId || null, targetIndex);
      setDraggedInstance(null);
    } else {
      // Adding a new component
      addComponent(draggedComponent, parentId);
    }
    
    setDraggedComponent(null);
  };

  return {
    draggedComponent,
    draggedInstance,
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
}