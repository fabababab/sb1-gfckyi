'use client';

import { useBuilderStore } from '@/lib/store';
import { useState } from 'react';

export function ParagraphWireframe({ instanceId }: { instanceId: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const updateComponentContent = useBuilderStore((state) => state.updateComponentContent);
  const content = useBuilderStore((state) => 
    state.components.find(c => c.id === instanceId)?.content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  );

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsEditing(false);
    updateComponentContent(instanceId, e.target.value);
  };

  if (isEditing) {
    return (
      <textarea
        value={content}
        onChange={(e) => updateComponentContent(instanceId, e.target.value)}
        onBlur={handleBlur}
        autoFocus
        rows={3}
        className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-primary/20 rounded p-2 resize-none"
      />
    );
  }

  return (
    <div 
      className="space-y-2 cursor-text" 
      onDoubleClick={handleDoubleClick}
    >
      <div className="h-6 bg-muted/20 rounded flex items-center px-3">
        {content}
      </div>
    </div>
  );
}