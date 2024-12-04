'use client';

import { Button } from "@/components/ui/button";
import { BuilderStep } from "@/lib/types";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface StepButtonProps {
  id: BuilderStep;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export function StepButton({ id, label, icon: Icon, isActive, onClick }: StepButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (id === 'layout') {
      router.push('/');
    }
    onClick();
  };

  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      className={cn(
        "gap-2 relative",
        isActive && "after:absolute after:bottom-[-17px] after:left-0 after:right-0 after:h-[2px] after:bg-primary"
      )}
      onClick={handleClick}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  );
}