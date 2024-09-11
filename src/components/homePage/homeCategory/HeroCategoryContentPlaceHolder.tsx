import React from "react";

// Define an interface for the component's props
interface HeroCategoryContentPlaceHolderProps {
  styling: string; // Prop to accept custom styling classes as a string
}

// Define and export the HeroCategoryContentPlaceHolder functional component
export const HeroCategoryContentPlaceHolder: React.FC<
  HeroCategoryContentPlaceHolderProps
> = ({ styling }) => {
  return (
    // Apply the custom styling classes along with default classes
    <div className={`w-full lg:basis-1/3 lg:self-stretch ${styling}`}>
      {/* Display a placeholder message */}
      <p className="mb-4 text-lg font-semibold text-gray-400">
        Content Coming Soon
      </p>
    </div>
  );
};
