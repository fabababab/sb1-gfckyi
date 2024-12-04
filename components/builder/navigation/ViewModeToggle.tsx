'use client';

import { Button } from "@/components/ui/button";
import { Laptop, Smartphone, Tablet } from "lucide-react";
import { useViewMode } from "@/hooks/useViewMode";

const viewModeIcons = {
  mobile: Smartphone,
  tablet: Tablet,
  desktop: Laptop,
};

export function ViewModeToggle() {
  const { viewMode, setViewMode, isPreviewMode } = useViewMode();

  if (!isPreviewMode) return null;

  return (
    <div className="flex items-center gap-2">
      {(Object.keys(viewModeIcons) as Array<keyof typeof viewModeIcons>).map((mode) => {
        const Icon = viewModeIcons[mode];
        return (
          <Button
            key={mode}
            variant={viewMode === mode ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode(mode)}
          >
            <Icon className="h-4 w-4" />
          </Button>
        );
      })}
    </div>
  );
}