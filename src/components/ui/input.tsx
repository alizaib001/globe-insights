// shadcn.com - @shadcn

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Interface for Input component props.
 * Extends the standard HTML input element attributes.
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input component wrapped with React.forwardRef to support refs.
 *
 * This component renders an input element with Tailwind CSS classes for styling.
 * It supports all standard HTML input attributes through props.
 *
 * @param {InputProps} props - Props for the Input component.
 * @param {React.Ref} ref - Reference to the input element.
 * @returns {JSX.Element} The input element with applied styles and properties.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

/** Set the display name for the Input component */
Input.displayName = "Input";

export { Input };
