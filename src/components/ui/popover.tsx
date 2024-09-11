"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

/** Root component of the Popover */
const Popover = PopoverPrimitive.Root;

/** Trigger component of the Popover */
const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * Content component of the Popover, wrapped with React.forwardRef to support refs.
 *
 * This component uses PopoverPrimitive.Content from the Radix UI library
 * and applies additional styling and positioning properties.
 *
 * @param {Object} props - Props for the PopoverContent component.
 * @param {string} props.className - Additional class names for styling.
 * @param {string} props.align - Alignment of the popover content.
 * @param {number} props.sideOffset - Offset for the side of the popover content.
 * @param {React.Ref} ref - Reference to the popover content element.
 * @returns {JSX.Element} The popover content element wrapped in a portal.
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));

/** Set the display name for the PopoverContent component */
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
