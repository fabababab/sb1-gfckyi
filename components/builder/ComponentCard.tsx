'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, LayoutGrid } from 'lucide-react';
import { ComponentMeta } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ComponentCardProps {
  component: ComponentMeta;
  onAdd: () => void;
  onDragStart: () => void;
}

export function ComponentCard({ component, onAdd, onDragStart }: ComponentCardProps) {
  return (
    <Card 
      className={cn(
        "p-4 hover:bg-accent/5 cursor-move group relative",
        component.isLayout && "border-primary/20"
      )}
      draggable
      onDragStart={onDragStart}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            {component.isLayout && (
              <LayoutGrid className="h-4 w-4 text-primary" />
            )}
            <h4 className="font-medium text-sm">{component.title}</h4>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{component.description}</p>
          <div className="flex gap-2 mt-2">
            {component.isFixed && (
              <Badge variant="secondary" className="text-xs">
                Fixed {component.fixedPosition}
              </Badge>
            )}
            {component.isLayout && (
              <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                Layout
              </Badge>
            )}
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {component.isLayout && component.allowedChildren && (
        <div className="mt-2 pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Accepts: {component.allowedChildren.map((child, index) => (
              <span key={child}>
                {index > 0 && ", "}
                <span className="text-primary">{child}</span>
              </span>
            ))}
          </p>
        </div>
      )}
    </Card>
  );
}