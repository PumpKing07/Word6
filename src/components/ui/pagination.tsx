import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

type ButtonSize = "default" | "sm" | "lg" | "icon";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

interface PaginationLinkProps
  extends Omit<React.ComponentProps<typeof Link>, "href"> {
  isActive?: boolean;
  href: string;
  disabled?: boolean;
  size?: ButtonSize;
}

const PaginationLink = ({
  className,
  isActive,
  disabled,
  href,
  size = "icon",
  children,
  ...props
}: PaginationLinkProps) => {
  const classes = cn(
    buttonVariants({
      variant: isActive ? "brand" : "outline",
      size,
    }),
    "transition-all",
    isActive && "shadow-md",
    className,
  );

  if (disabled) {
    return (
      <span
        aria-disabled
        className={cn(classes, "pointer-events-none opacity-40")}
      >
        {children}
      </span>
    );
  }
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      href={href}
      className={classes}
      {...props}
    >
      {children}
    </Link>
  );
};
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  disabled,
  href,
  ...props
}: Omit<PaginationLinkProps, "size">) => (
  <PaginationLink
    aria-label="Go to previous page"
    href={href}
    size="default"
    disabled={disabled}
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="hidden sm:inline">Назад</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  disabled,
  href,
  ...props
}: Omit<PaginationLinkProps, "size">) => (
  <PaginationLink
    aria-label="Go to next page"
    href={href}
    size="default"
    disabled={disabled}
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span className="hidden sm:inline">Вперёд</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-10 w-10 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
