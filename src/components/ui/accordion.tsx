// Import necessary modules and components
// shadcn.com - @shadcn
"use client";
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

// Import utility function
import { cn } from "@/lib/utils";

// Define Accordion component
const Accordion = AccordionPrimitive.Root;

// Define AccordionItem component
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(
  // AccordionItem component with forwardRef
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b", className)}
      {...props}
    />
  ),
);
AccordionItem.displayName = "AccordionItem"; // Set display name for AccordionItem component

// Define AccordionTrigger component
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(
  // AccordionTrigger component with forwardRef
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ),
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName; // Set display name for AccordionTrigger component

// Define AccordionContent component
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(
  // AccordionContent component with forwardRef
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  ),
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName; // Set display name for AccordionContent component

// Export Accordion components for usage in other files
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
