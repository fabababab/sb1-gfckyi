'use client';

import { useBuilderSteps } from "@/hooks/useBuilderSteps";
import { ViewModeToggle } from "./navigation/ViewModeToggle";
import { StepButton } from "./navigation/StepButton";
import { cn } from "@/lib/utils";

export function StepNavigation() {
  const { steps, currentStep, setCurrentStep } = useBuilderSteps();

  return (
    <div className={cn(
      "h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      "sticky top-0 z-50 flex items-center justify-between px-4"
    )}>
      <div className="flex items-center gap-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {index > 0 && (
              <div className="flex items-center mx-2 text-muted-foreground">
                <div className="h-px w-8 bg-border" />
              </div>
            )}
            <StepButton
              id={step.id}
              label={step.label}
              icon={step.icon}
              isActive={currentStep === step.id}
              onClick={() => setCurrentStep(step.id)}
            />
          </div>
        ))}
      </div>
      <ViewModeToggle />
    </div>
  );
}