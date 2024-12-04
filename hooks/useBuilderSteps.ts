'use client';

import { useBuilderStore } from '@/lib/store';
import { Layout, Paintbrush, Eye } from 'lucide-react';
import { BuilderStep } from '@/lib/types';

export const builderSteps = [
  { 
    id: 'layout' as BuilderStep,
    label: 'Layout',
    icon: Layout,
    description: 'Design your page structure'
  },
  { 
    id: 'styling' as BuilderStep,
    label: 'Styling',
    icon: Paintbrush,
    description: 'Customize appearance'
  },
  { 
    id: 'preview' as BuilderStep,
    label: 'Preview',
    icon: Eye,
    description: 'View final result'
  },
] as const;

export function useBuilderSteps() {
  const currentStep = useBuilderStore((state) => state.currentStep);
  const setCurrentStep = useBuilderStore((state) => state.setCurrentStep);

  const currentStepConfig = builderSteps.find(step => step.id === currentStep);

  return {
    steps: builderSteps,
    currentStep,
    setCurrentStep,
    currentStepConfig,
  };
}