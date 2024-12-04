'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useBuilderStore } from '@/lib/store';
import { Paintbrush, Code } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FONT_FAMILIES } from '@/lib/fonts';
import { ComponentStyle } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { COMPONENTS } from '@/lib/components';
import { CodeView } from './CodeView';

export function ThemePanel() {
  const theme = useBuilderStore((state) => state.theme);
  const updateTheme = useBuilderStore((state) => state.updateTheme);
  const activeComponent = useBuilderStore((state) => state.activeComponent);
  const components = useBuilderStore((state) => state.components);
  const updateComponentStyles = useBuilderStore((state) => state.updateComponentStyles);

  const [componentStyles, setComponentStyles] = useState<ComponentStyle>({});
  const [viewMode, setViewMode] = useState<'design' | 'code'>('design');

  const activeInstance = activeComponent 
    ? components.find(c => c.id === activeComponent) 
    : null;

  const componentMeta = activeInstance
    ? COMPONENTS.find(c => c.id === activeInstance.componentId)
    : null;

  useEffect(() => {
    if (activeInstance?.styles) {
      setComponentStyles(activeInstance.styles);
    } else {
      setComponentStyles({});
    }
  }, [activeInstance]);

  const handleStyleChange = (category: keyof ComponentStyle, property: string, value: string) => {
    const newStyles = {
      ...componentStyles,
      [category]: {
        ...(componentStyles[category] || {}),
        [property]: value,
      },
    };
    setComponentStyles(newStyles);
    if (activeComponent) {
      updateComponentStyles(activeComponent, newStyles);
    }
  };

  return (
    <div className="w-80 border-l border-border h-full bg-card">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Paintbrush className="h-4 w-4" />
          <h2 className="font-semibold text-lg">Theme</h2>
        </div>
        {activeComponent && (
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('design')}
              className={`p-2 rounded-md ${viewMode === 'design' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/10'}`}
            >
              <Paintbrush className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`p-2 rounded-md ${viewMode === 'code' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/10'}`}
            >
              <Code className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      <ScrollArea className="h-[calc(100vh-60px)]">
        <Tabs defaultValue="global" className="p-4">
          <TabsList className="w-full">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger 
              value="component" 
              disabled={!activeComponent}
            >
              Component
            </TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-6">
            {/* Global theme controls */}
          </TabsContent>

          <TabsContent value="component" className="space-y-6">
            {activeComponent && componentMeta ? (
              <>
                <Card className="p-4">
                  <h3 className="font-medium mb-2">{componentMeta.title}</h3>
                  <p className="text-sm text-muted-foreground">{componentMeta.description}</p>
                </Card>

                {viewMode === 'design' ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Typography</h4>
                      <div className="space-y-2">
                        <Label>Font Size</Label>
                        <Select
                          value={componentStyles.typography?.fontSize || ''}
                          onValueChange={(value) => handleStyleChange('typography', 'fontSize', value)}
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
                          value={componentStyles.typography?.textAlign || ''}
                          onValueChange={(value) => handleStyleChange('typography', 'textAlign', value)}
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

                    <div className="space-y-4">
                      <h4 className="font-medium">Colors</h4>
                      <div className="space-y-2">
                        <Label>Text Color</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={componentStyles.colors?.text || '#000000'}
                            onChange={(e) => handleStyleChange('colors', 'text', e.target.value)}
                            className="w-12 h-8 p-1"
                          />
                          <Input
                            type="text"
                            value={componentStyles.colors?.text || ''}
                            onChange={(e) => handleStyleChange('colors', 'text', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Background Color</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={componentStyles.colors?.background || '#ffffff'}
                            onChange={(e) => handleStyleChange('colors', 'background', e.target.value)}
                            className="w-12 h-8 p-1"
                          />
                          <Input
                            type="text"
                            value={componentStyles.colors?.background || ''}
                            onChange={(e) => handleStyleChange('colors', 'background', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Spacing</h4>
                      <div className="space-y-2">
                        <Label>Padding</Label>
                        <Select
                          value={componentStyles.spacing?.padding || ''}
                          onValueChange={(value) => handleStyleChange('spacing', 'padding', value)}
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
                          value={componentStyles.spacing?.margin || ''}
                          onValueChange={(value) => handleStyleChange('spacing', 'margin', value)}
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
                  </div>
                ) : (
                  <CodeView componentId={componentMeta.id} />
                )}
              </>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Select a component to customize its styles
              </div>
            )}
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
}