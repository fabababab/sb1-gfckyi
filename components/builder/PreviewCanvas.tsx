'use client';

import { useBuilderStore } from '@/lib/store';
import { ComponentRenderer } from './ComponentRenderer';
import { useViewMode } from '@/hooks/useViewMode';
import { useComponentDragDrop } from '@/hooks/useComponentDragDrop';
import { cn } from '@/lib/utils';
import { COMPONENTS } from '@/lib/components';

export function PreviewCanvas() {
  const { viewMode, isPreviewMode, currentViewMode } = useViewMode();
  const components = useBuilderStore((state) => state.components);
  const hiddenComponents = useBuilderStore((state) => state.hiddenComponents);
  const currentStep = useBuilderStore((state) => state.currentStep);
  const { handleDragOver, handleDrop } = useComponentDragDrop();

  const renderDropZone = (index: number, parentId?: string, isNested?: boolean) => (
    <div
      className={cn(
        "drop-zone transition-all",
        isNested && "nested",
        "hover:border-primary/40 hover:bg-primary/5"
      )}
      onDrop={(e) => {
        e.stopPropagation();
        handleDrop(index, parentId);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const target = e.currentTarget;
        target.classList.add('border-primary/40', 'bg-primary/5');
      }}
      onDragLeave={(e) => {
        const target = e.currentTarget;
        target.classList.remove('border-primary/40', 'bg-primary/5');
      }}
    />
  );

  const renderComponent = (component: any, index: number, parentId?: string) => {
    if (hiddenComponents.includes(component.id)) return null;

    const componentMeta = COMPONENTS.find(c => c.id === component.componentId);
    const isLayout = componentMeta?.isLayout;

    return (
      <div key={component.id}>
        {renderDropZone(index, parentId)}
        <div
          className={cn(
            'component-wrapper',
            currentStep === 'layout' && [
              'hover:ring-2 hover:ring-primary/50 rounded-lg',
              isLayout && 'layout'
            ]
          )}
        >
          <ComponentRenderer 
            componentId={component.componentId}
            instanceId={component.id}
            isWireframe={currentStep === 'layout'}
          />
          {isLayout && (
            <div className="space-y-2">
              {component.children?.map((child: any, childIndex: number) => 
                renderComponent(child, childIndex, component.id)
              )}
              {currentStep === 'layout' && renderDropZone(
                component.children?.length || 0,
                component.id,
                true
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const previewContent = (
    <div 
      className={cn(
        'preview-canvas theme-enabled',
        currentStep === 'layout' && 'wireframe',
        isPreviewMode && [
          'preview',
          currentViewMode.width,
          'shadow-2xl'
        ]
      )}
    >
      {components.length === 0 ? (
        <div 
          className="h-[80vh] flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg m-4"
          onDrop={(e) => {
            e.preventDefault();
            handleDrop(0);
          }}
          onDragOver={handleDragOver}
        >
          <p className="text-muted-foreground">
            {currentStep === 'layout' 
              ? 'Drag components here or select from the menu to start building'
              : 'Add components to start building'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {components.map((component, index) => renderComponent(component, index))}
          {currentStep === 'layout' && renderDropZone(components.length)}
        </div>
      )}
    </div>
  );

  return (
    <div className={cn(
      "flex-1 overflow-auto",
      isPreviewMode ? "bg-gray-100 p-8" : "bg-background"
    )}>
      {previewContent}
    </div>
  );
}