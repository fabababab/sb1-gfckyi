'use client';

import { useBuilderStore } from '@/lib/store';
import { COMPONENTS } from '@/lib/components';
import { wireframes } from '@/lib/wireframes';
import { templates } from '@/lib/templates';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

interface ComponentRendererProps {
  componentId: string;
  instanceId: string;
  isWireframe: boolean;
}

export function ComponentRenderer({ componentId, instanceId, isWireframe }: ComponentRendererProps) {
  const activeComponent = useBuilderStore((state) => state.activeComponent);
  const component = COMPONENTS.find(c => c.id === componentId);
  const { styles, isThemeEnabled } = useTheme(instanceId);
  
  if (!component) return null;

  const WireframeComponent = wireframes[componentId];
  const TemplateComponent = templates[componentId];

  const Component = isWireframe ? WireframeComponent : TemplateComponent;

  if (!Component) {
    return (
      <div className="p-8 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground text-center">
          Component {component.title} not implemented yet
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative transition-all",
        isWireframe && "hover:bg-muted/5",
        activeComponent === instanceId && "ring-2 ring-primary",
        !isWireframe && "theme-enabled"
      )}
      onClick={(e) => {
        e.stopPropagation();
        useBuilderStore.getState().setActiveComponent(instanceId);
      }}
      style={isThemeEnabled ? styles : undefined}
    >
      <Component />
      {isWireframe && component.isLayout && (
        <div className="absolute top-2 right-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
          Layout Component
        </div>
      )}
    </div>
  );
}