'use client';

import { useBuilderStore } from '@/lib/store';
import { COMPONENTS } from '@/lib/components';
import { templates } from '@/lib/templates';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useState } from 'react';

export function CodeView({ componentId }: { componentId: string }) {
  const [copied, setCopied] = useState(false);
  
  const component = COMPONENTS.find(c => c.id === componentId);
  if (!component) return null;

  const Template = templates[componentId];
  if (!Template) return null;

  // Get the source code of the component
  const sourceCode = Template.toString();
  
  // Format the code for display
  const formattedCode = sourceCode
    .replace(/^function\s+default\s*/, '')  // Remove default function name
    .replace(/^export\s+default\s+function\s*/, '')  // Remove export default
    .replace(/^function\s*/, ''); // Remove function keyword

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Component Code</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-2"
        >
          <Copy className="h-4 w-4 mr-1" />
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
      <ScrollArea className="h-[500px] w-full rounded-md border">
        <pre className="p-4 text-sm">
          <code className="language-tsx">{formattedCode}</code>
        </pre>
      </ScrollArea>
    </div>
  );
}