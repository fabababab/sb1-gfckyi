'use client';

import { ComponentInstance } from '@/lib/types';

export interface DragItem {
  id: string;
  type: string;
  children?: DragItem[];
}

export interface TreeItem extends ComponentInstance {
  depth: number;
  index: number;
}

export interface DropPosition {
  parentId: string | null;
  index: number;
}