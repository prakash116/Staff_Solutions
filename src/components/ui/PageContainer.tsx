import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface PageContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  size?: "default" | "narrow";
}

export function PageContainer({ as: Tag = "div", className, children, size = "default" }: PageContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", size === "narrow" ? "max-w-3xl" : "max-w-7xl", className)}>
      {children}
    </Tag>
  );
}
