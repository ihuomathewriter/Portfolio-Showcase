import React from "react";
import { cn } from "@/lib/utils";

interface EditorialCardProps {
  initials: string;
  pattern?: "diagonal" | "dots" | "crosshatch" | "grid";
  className?: string;
  variant?: "primary" | "secondary";
}

export function EditorialCard({ initials, pattern = "diagonal", className, variant = "primary" }: EditorialCardProps) {
  const getPattern = () => {
    switch (pattern) {
      case "dots":
        return `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%23000000' fill-opacity='0.1'/%3E%3C/svg%3E")`;
      case "crosshatch":
        return `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l20 20M20 0L0 20' stroke='%23000000' stroke-width='0.5' stroke-opacity='0.1' fill='none'/%3E%3C/svg%3E")`;
      case "grid":
        return `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0v20H0' stroke='%23000000' stroke-width='0.5' stroke-opacity='0.1' fill='none'/%3E%3C/svg%3E")`;
      case "diagonal":
      default:
        return `url("data:image/svg+xml,%3Csvg width='10' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-1 11L11 -1M9 11L11 9M-1 1L1 -1' stroke='%23000000' stroke-width='0.5' stroke-opacity='0.1'/%3E%3C/svg%3E")`;
    }
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden border border-border aspect-[3/4]",
        variant === "primary" ? "bg-primary/5" : "bg-secondary/10",
        className
      )}
    >
      <div 
        className="absolute inset-0 z-0 opacity-50 mix-blend-multiply"
        style={{ backgroundImage: getPattern(), backgroundSize: "20px 20px" }}
      />
      <span className="font-serif text-4xl lg:text-5xl z-10 text-primary opacity-80 tracking-tighter uppercase">
        {initials}
      </span>
    </div>
  );
}
