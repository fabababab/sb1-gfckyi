'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Search } from 'lucide-react';
import { useBuilderStore } from '@/lib/store';
import { COMPONENTS, COMPONENT_CATEGORIES } from '@/lib/components';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ComponentCard } from './ComponentCard';
import { useComponentDragDrop } from '@/hooks/useComponentDragDrop';
import { cn } from '@/lib/utils';

export function ComponentMenu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(COMPONENT_CATEGORIES[0].id);
  const addComponent = useBuilderStore((state) => state.addComponent);
  const { handleDragStart } = useComponentDragDrop();

  const filteredComponents = COMPONENTS.filter((component) =>
    (component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (searchQuery || component.category === selectedCategory)
  );

  return (
    <div className="w-80 border-r border-border h-full bg-card">
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <h2 className="font-semibold text-lg">Components</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="p-4 border-b overflow-x-auto">
        <div className="flex gap-2">
          {COMPONENT_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors",
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-204px)]">
        <div className="p-4 space-y-2">
          {filteredComponents.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No components found
            </div>
          ) : (
            filteredComponents.map((component) => (
              <ComponentCard
                key={component.id}
                component={component}
                onAdd={() => addComponent(component.id)}
                onDragStart={() => handleDragStart(component.id)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}