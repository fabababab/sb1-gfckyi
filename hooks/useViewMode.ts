'use client';

import { useBuilderStore } from '@/lib/store';
import { ViewMode } from '@/lib/types';

export const viewModeConfig = {
  mobile: {
    width: 'max-w-[375px]',
    label: 'Mobile',
  },
  tablet: {
    width: 'max-w-[768px]',
    label: 'Tablet',
  },
  desktop: {
    width: 'max-w-[1440px]',
    label: 'Desktop',
  },
} as const;

export function useViewMode() {
  const viewMode = useBuilderStore((state) => state.viewMode);
  const setViewMode = useBuilderStore((state) => state.setViewMode);
  const currentStep = useBuilderStore((state) => state.currentStep);

  const isPreviewMode = currentStep === 'preview';
  const currentViewMode = viewModeConfig[viewMode];

  return {
    viewMode,
    setViewMode,
    isPreviewMode,
    currentViewMode,
    viewModeConfig,
  };
}