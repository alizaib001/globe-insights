// Import necessary modules and components
import * as React from "react"; // Import the entire React library
import { useRouter } from "next/navigation"; // Import the useRouter hook from Next.js for navigation
import { ChevronsUpDown } from "lucide-react"; // Import the ChevronsUpDown icon from lucide-react
import { Button } from "@/components/ui/button"; // Import the Button component from the UI library
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"; // Import Command components from the UI library
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Import Popover components from the UI library

// Interface defining the structure of the DropDownProps
interface DropDownProps {
  categories: {
    title: string;
    slug: string;
  }[];
}

// DropDown component definition using React Functional Component with DropDownProps
export const DropDown: React.FC<DropDownProps> = ({ categories }) => {
  const router = useRouter(); // Initialize router for navigation
  const [open, setOpen] = React.useState(false); // State to handle the popover open/close status

  return (
    // Popover component to display the dropdown menu
    <Popover open={open} onOpenChange={setOpen}>
      {/* PopoverTrigger to open/close the popover, wrapping the Button component */}
      <PopoverTrigger asChild>
        <Button
          variant="outline" // Button variant
          role="combobox" // ARIA role for accessibility
          aria-expanded={open} // ARIA attribute to indicate if the combobox is expanded
          className="w-[200px] justify-between" // CSS classes for styling
        >
          Explore...
          {/* Icon to indicate dropdown functionality */}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      {/* PopoverContent to define the content inside the popover */}
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {/* Input field for searching within the dropdown */}
          <CommandInput placeholder="Explore categories..." />
          {/* Message displayed when no category is found */}
          <CommandEmpty>No category found.</CommandEmpty>
          {/* Grouping of command items */}
          <CommandGroup>
            {/* Map through the categories and create a CommandItem for each */}
            {categories.map((category, index) => (
              <CommandItem
                key={index} // Unique key for each item
                value={category.title} // Value attribute for the command item
                onSelect={() => {
                  // Function to handle item selection
                  setOpen(false); // Close the popover
                  router.push(
                    `/categories/${category.slug != "categories" ? category.slug : ""}`, // Navigate to the category's page
                  );
                }}
                className="cursor-pointer" // CSS class to change cursor on hover
              >
                {/* Display the category title */}
                {category.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
