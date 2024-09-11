import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string.
 *
 * This function uses `clsx` to conditionally combine class names
 * and then merges them using `twMerge` to handle Tailwind CSS class merging.
 *
 * @param {...ClassValue[]} inputs - The class names to be combined.
 * @returns {string} A single string with the combined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
