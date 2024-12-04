'use client';

import { useBuilderStore } from '@/lib/store';
import { useState } from 'react';

export function HeadingWireframe({ instanceId }: { instanceId: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const updateComponentContent = useBuilderStore((state) => state.updateComponentContent);
  const content = useBuilderStore((state) => 
    state.components.find(c => c.id === instanceId)?.content || 'Heading Text'
  );

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsEditing(false);
    updateComponentContent(instanceId, e.target.value);
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={content}
        onChange={(e) => updateComponentContent(instanceId, e.target.value)}
        onBlur={handleBlur}
        autoFocus
        className="w-full bg-transparent border-none text-2xl font-bold focus:outline-none focus:ring-1 focus:ring-primary/20 rounded px-2"
      />
    );
  }

  return (
    <div 
      className="space-y-2 cursor-text" 
      onDoubleClick={handleDoubleClick}
    >
      <div className="h-8 bg-muted/30 rounded flex items-center px-3 font-medium">
        {content}
      </div>
    </div>
  );
}