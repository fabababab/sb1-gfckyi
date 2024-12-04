'use client';

import { useState } from 'react';
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { useBuilderStore } from '@/lib/store';
import { findItemDeep, getProjection } from './utils';

export function useSortableTree() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState<{
    parentId: string | null;
    index: number;
  } | null>(null);

  const components = useBuilderStore((state) => state.components);
  const moveComponent = useBuilderStore((state) => state.moveComponent);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
    setOverId(active.id as string);
  };

  const handleDragMove = ({ delta }: any) => {
    setOffsetLeft(delta.x);
  };

  const handleDragOver = ({ over }: any) => {
    setOverId(over?.id ?? null);

    if (activeId && over?.id) {
      const activeItem = findItemDeep(components, activeId);
      const overItem = findItemDeep(components, over.id);

      if (!activeItem || !overItem) return;

      const projection = getProjection(
        components,
        activeId,
        over.id,
        offsetLeft,
        false
      );

      if (!projection) return;

      setCurrentPosition(projection);
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);
    setOverId(null);
    setOffsetLeft(0);
    setCurrentPosition(null);

    if (over && active.id !== over.id && currentPosition) {
      moveComponent(
        active.id as string,
        currentPosition.parentId,
        currentPosition.index
      );
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverId(null);
    setOffsetLeft(0);
    setCurrentPosition(null);
  };

  return {
    activeId,
    overId,
    handleDragStart,
    handleDragMove,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  };
}