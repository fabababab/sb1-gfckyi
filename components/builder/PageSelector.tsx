'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBuilderStore } from '@/lib/store';
import { Plus, FileText } from 'lucide-react';
import { useState } from 'react';

export function PageSelector() {
  const [newPageName, setNewPageName] = useState('');
  const pages = useBuilderStore((state) => state.pages);
  const currentPageId = useBuilderStore((state) => state.currentPageId);
  const addPage = useBuilderStore((state) => state.addPage);
  const setCurrentPage = useBuilderStore((state) => state.setCurrentPage);

  const handleAddPage = () => {
    if (!newPageName) return;
    const pageId = newPageName.toLowerCase().replace(/\s+/g, '-');
    const path = pageId === 'home' ? '/' : `/${pageId}`;
    
    addPage({
      id: pageId,
      name: newPageName,
      path,
    });
    
    setNewPageName('');
  };

  return (
    <div className="p-4 border-b border-border flex items-center gap-4">
      <FileText className="w-4 h-4" />
      <Select value={currentPageId || ''} onValueChange={setCurrentPage}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select page" />
        </SelectTrigger>
        <SelectContent>
          {pages.map((page) => (
            <SelectItem key={page.id} value={page.id}>
              {page.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2">
        <Input
          placeholder="New page name"
          value={newPageName}
          onChange={(e) => setNewPageName(e.target.value)}
          className="w-32"
        />
        <Button size="sm" onClick={handleAddPage} disabled={!newPageName}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}