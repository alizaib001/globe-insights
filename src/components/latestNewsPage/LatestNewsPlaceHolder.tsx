import React from "react";

// Define the LatestNewsPlaceHolder functional component
export const LatestNewsPlaceHolder = () => {
  // Render the LatestNewsPlaceHolder component
  return (
    <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-5 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {/* Render placeholder text */}
      <p className="mb-4 text-lg font-semibold text-gray-400">
        Content Coming Soon
      </p>
    </div>
  );
};
