import React from "react";

// Define and export the CategoriesPageHeader component
export const CategoriesPageHeader = () => {
  return (
    // Container for the header content with maximum width and centered alignment
    <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
      {/* Header title */}
      <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
        Explore Boundless Information: Discover Our Wide-Ranging Categories
      </h2>
      {/* Header description */}
      {/* Description of the content */}
      <p className="font-light text-gray-500 sm:text-xl">
        Dive into the depths of boundless information with{" "}
        <strong className="font-semibold text-gray-700">
          Current Trend Times
        </strong>{" "}
        wide-ranging categories. Our collection spans a variety of topics,
        meticulously organized to provide you with easy access to valuable
        insights and engaging content. From current trends to historical
        perspectives,{" "}
        <strong className="font-semibold text-gray-700">
          Current Trend Times
        </strong>{" "}
        offers a treasure trove of knowledge waiting to be discovered. Embark on
        your journey today and explore all that{" "}
        <strong className="font-semibold text-gray-700">
          Current Trend Times
        </strong>{" "}
        has to offer!
      </p>
    </div>
  );
};
