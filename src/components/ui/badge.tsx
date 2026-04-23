import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-neutral-900 text-white",
        secondary: "bg-neutral-100 text-neutral-900",
        destructive: "bg-red-500 text-white",
        outline: "border border-neutral-300 text-neutral-900",
        accent: "bg-lime-300 text-neutral-900",
        brand: "bg-[#FFD23F] text-neutral-900",
        hit: "bg-red-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
