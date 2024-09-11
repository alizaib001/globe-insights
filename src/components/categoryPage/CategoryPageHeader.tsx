import React from "react";

// Define the props interface for the CategoryPageHeader component
interface CategoryPageHeaderProps {
  category: any; // Type definition for the category object
}

// CategoryPageHeader functional component
export const CategoryPageHeader: React.FC<CategoryPageHeaderProps> = ({
  category, // Destructure the category object from props
}) => {
  // Render the CategoryPageHeader component
  return (
    <div className="mx-auto max-w-2xl lg:mx-0">
      {/* Render the category title */}
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {category.title}
      </h2>
    </div>
  );
};
