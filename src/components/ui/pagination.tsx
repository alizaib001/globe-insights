import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

/**
 * Pagination component that serves as a navigation container for pagination elements.
 *
 * @param {React.ComponentProps<"nav">} props - Props for the navigation element.
 * @returns {JSX.Element} A nav element with pagination styles and properties.
 */
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

/**
 * PaginationContent component that serves as a container for pagination items.
 *
 * @param {React.ComponentProps<"ul">} props - Props for the unordered list element.
 * @returns {JSX.Element} A ul element with pagination content styles and properties.
 */
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

/**
 * PaginationItem component that serves as an item within the pagination content.
 *
 * @param {React.ComponentProps<"li">} props - Props for the list item element.
 * @returns {JSX.Element} A li element with pagination item styles and properties.
 */
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<typeof Link>;

/**
 * PaginationLink component that serves as a link within the pagination.
 *
 * @param {PaginationLinkProps} props - Props for the PaginationLink component.
 * @param {boolean} [props.isActive] - Indicates if the link is active.
 * @param {string} [props.size="icon"] - Size of the link.
 * @returns {JSX.Element} A Link component styled as a pagination button.
 */
const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

/**
 * PaginationPrevious component that serves as a link to the previous page.
 *
 * @param {React.ComponentProps<typeof PaginationLink>} props - Props for the PaginationPrevious component.
 * @returns {JSX.Element} A PaginationLink component with an icon and label for previous page navigation.
 */
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

/**
 * PaginationNext component that serves as a link to the next page.
 *
 * @param {React.ComponentProps<typeof PaginationLink>} props - Props for the PaginationNext component.
 * @returns {JSX.Element} A PaginationLink component with an icon and label for next page navigation.
 */
const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

/**
 * PaginationEllipsis component that indicates there are more pages in the pagination.
 *
 * @param {React.ComponentProps<"span">} props - Props for the span element.
 * @returns {JSX.Element} A span element with an ellipsis icon and screen reader text.
 */
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
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
