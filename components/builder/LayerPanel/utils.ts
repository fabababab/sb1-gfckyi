'use client';

import { ComponentInstance } from '@/lib/types';

export function findItemDeep(
  items: ComponentInstance[],
  itemId: string
): ComponentInstance | null {
  for (const item of items) {
    if (item.id === itemId) return item;
    if (item.children) {
      const child = findItemDeep(item.children, itemId);
      if (child) return child;
    }
  }
  return null;
}

export function getProjection(
  items: ComponentInstance[],
  activeId: string,
  overId: string,
  offsetLeft: number,
  depth: boolean
) {
  const activeItem = findItemDeep(items, activeId);
  const overItem = findItemDeep(items, overId);

  if (!activeItem || !overItem) return null;

  const activeLevel = getItemLevel(items, activeId);
  const overLevel = getItemLevel(items, overId);
  
  let targetLevel = overLevel;
  if (depth) {
    const modifier = Math.round(offsetLeft / 16);
    targetLevel = Math.max(0, overLevel + modifier);
  }

  const parentId = getParentId(items, overId, targetLevel);
  const parent = parentId ? findItemDeep(items, parentId) : null;
  const siblings = parent ? parent.children : items;
  
  const overIndex = siblings?.findIndex(item => item.id === overId) ?? -1;

  return {
    parentId: parent?.id ?? null,
    index: overIndex + 1,
  };
}

function getItemLevel(items: ComponentInstance[], itemId: string, level = 0): number {
  for (const item of items) {
    if (item.id === itemId) return level;
    if (item.children) {
      const childLevel = getItemLevel(item.children, itemId, level + 1);
      if (childLevel !== -1) return childLevel;
    }
  }
  return -1;
}

function getParentId(
  items: ComponentInstance[],
  itemId: string,
  targetLevel: number,
  level = 0
): string | null {
  if (level === targetLevel) return null;

  for (const item of items) {
    if (item.children) {
      if (item.children.some(child => child.id === itemId)) {
        return level + 1 === targetLevel ? item.id : null;
      }
      const childResult = getParentId(item.children, itemId, targetLevel, level + 1);
      if (childResult) return childResult;
    }
  }
  return null;
}