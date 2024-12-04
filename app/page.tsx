'use client';

import { useBuilderSteps } from '@/hooks/useBuilderSteps';
import { ComponentMenu } from '@/components/builder/ComponentMenu';
import { PreviewCanvas } from '@/components/builder/PreviewCanvas';
import { ThemePanel } from '@/components/builder/ThemePanel';
import { LayerPanel } from '@/components/builder/LayerPanel';
import { StepNavigation } from '@/components/builder/StepNavigation';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const { currentStep } = useBuilderSteps();

  return (
    <main className="flex flex-col h-screen">
      <StepNavigation />
      <div className="flex flex-1 overflow-hidden">
        {currentStep === 'layout' && (
          <>
            <ComponentMenu />
            <Separator orientation="vertical" />
            <PreviewCanvas />
            <Separator orientation="vertical" />
            <LayerPanel />
          </>
        )}
        {currentStep === 'styling' && (
          <>
            <PreviewCanvas />
            <Separator orientation="vertical" />
            <ThemePanel />
          </>
        )}
        {currentStep === 'preview' && (
          <PreviewCanvas />
        )}
      </div>
    </main>
  );
}