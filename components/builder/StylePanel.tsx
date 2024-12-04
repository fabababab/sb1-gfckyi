'use client';

import { useComponentStyles } from '@/hooks/useComponentStyles';
import { useBuilderStore } from '@/lib/store';
import { COMPONENTS } from '@/lib/components';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Paintbrush } from 'lucide-react';

export function StylePanel() {
  const activeComponent = useBuilderStore((state) => state.activeComponent);
  const components = useBuilderStore((state) => state.components);

  const activeInstance = activeComponent 
    ? components.find(c => c.id === activeComponent) 
    : null;

  const componentMeta = activeInstance
    ? COMPONENTS.find(c => c.id === activeInstance.componentId)
    : null;

  const { styles, updateStyles } = useComponentStyles(activeComponent || '');

  if (!activeComponent || !componentMeta) {
    return (
      <div className="w-80 border-l border-border h-full bg-card">
        <div className="p-4 border-b flex items-center gap-2">
          <Paintbrush className="h-4 w-4" />
          <h2 className="font-semibold text-lg">Styles</h2>
        </div>
        <div className="p-4 text-center text-muted-foreground">
          Select a component to customize its styles
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-border h-full bg-card">
      <div className="p-4 border-b flex items-center gap-2">
        <Paintbrush className="h-4 w-4" />
        <h2 className="font-semibold text-lg">Styles</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-60px)]">
        <div className="p-4 space-y-6">
          <Card className="p-4">
            <h3 className="font-medium mb-2">{componentMeta.title}</h3>
            <p className="text-sm text-muted-foreground">{componentMeta.description}</p>
          </Card>

          <div className="space-y-6">
            {/* Typography */}
            <div className="space-y-4">
              <h4 className="font-medium">Typography</h4>
              <div className="space-y-2">
                <Label>Font Size</Label>
                <Select
                  value={styles?.typography?.fontSize || ''}
                  onValueChange={(value) => updateStyles('typography', 'fontSize', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-sm">Small</SelectItem>
                    <SelectItem value="text-base">Base</SelectItem>
                    <SelectItem value="text-lg">Large</SelectItem>
                    <SelectItem value="text-xl">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Text Align</Label>
                <Select
                  value={styles?.typography?.textAlign || ''}
                  onValueChange={(value) => updateStyles('typography', 'textAlign', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Spacing */}
            <div className="space-y-4">
              <h4 className="font-medium">Spacing</h4>
              <div className="space-y-2">
                <Label>Padding</Label>
                <Select
                  value={styles?.spacing?.padding || ''}
                  onValueChange={(value) => updateStyles('spacing', 'padding', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select padding" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p-0">None</SelectItem>
                    <SelectItem value="p-2">Small</SelectItem>
                    <SelectItem value="p-4">Medium</SelectItem>
                    <SelectItem value="p-6">Large</SelectItem>
                    <SelectItem value="p-8">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Margin</Label>
                <Select
                  value={styles?.spacing?.margin || ''}
                  onValueChange={(value) => updateStyles('spacing', 'margin', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select margin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m-0">None</SelectItem>
                    <SelectItem value="m-2">Small</SelectItem>
                    <SelectItem value="m-4">Medium</SelectItem>
                    <SelectItem value="m-6">Large</SelectItem>
                    <SelectItem value="m-8">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-4">
              <h4 className="font-medium">Colors</h4>
              <div className="space-y-2">
                <Label>Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styles?.colors?.text || '#000000'}
                    onChange={(e) => updateStyles('colors', 'text', e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <Input
                    type="text"
                    value={styles?.colors?.text || ''}
                    onChange={(e) => updateStyles('colors', 'text', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styles?.colors?.background || '#ffffff'}
                    onChange={(e) => updateStyles('colors', 'background', e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <Input
                    type="text"
                    value={styles?.colors?.background || ''}
                    onChange={(e) => updateStyles('colors', 'background', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}