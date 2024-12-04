'use client';

import { useBuilderStore } from '@/lib/store';
import { ComponentStyle } from '@/lib/types';
import { useCallback } from 'react';

export function useComponentStyles(instanceId: string) {
  const updateComponentStyles = useBuilderStore((state) => state.updateComponentStyles);
  const components = useBuilderStore((state) => state.components);

  const findComponentStyles = useCallback(() => {
    const findInComponents = (components: any[]): ComponentStyle | undefined => {
      for (const component of components) {
        if (component.id === instanceId) {
          return component.styles;
        }
        if (component.children) {
          const found = findInComponents(component.children);
          if (found) return found;
        }
      }
    };
    return findInComponents(components);
  }, [instanceId, components]);

  const updateStyles = useCallback((category: keyof ComponentStyle, property: string, value: any) => {
    const newStyles = {
      [category]: {
        [property]: value,
      },
    };
    updateComponentStyles(instanceId, newStyles);
  }, [instanceId, updateComponentStyles]);

  return {
    styles: findComponentStyles(),
    updateStyles,
  };
}