// Importing necessary components and functions from the respective paths
import { getCategories } from "@/utils/sanityQueries"; // Importing function to fetch categories data
import { CategoriesPageHeader } from "@/components/categoriesPage/CategoriesPageHeader"; // Importing CategoriesPageHeader component
import { CategoriesPagePlaceHolder } from "@/components/categoriesPage/CategoriesPagePlaceHolder"; // Importing CategoriesPagePlaceHolder component
import { CategoryTile } from "@/components/categoriesPage/CategoryTile"; // Importing CategoryTile component

// Define and export the Categories component
export default async function Categories() {
  // Fetch categories data
  const categories = await getCategories();

  return (
    // Container for categories page content with maximum width
    <div className="mx-auto max-w-screen-xl bg-white">
      {/* Content container with vertical alignment */}
      <div className="mx-auto flex flex-col items-center justify-center px-4 py-8 lg:px-6 lg:py-16">
        {/* Render the categories page header */}
        <CategoriesPageHeader />
        {/* Conditional rendering based on categories data */}
        {!categories ? (
          // Render placeholder component if categories data is not available
          <CategoriesPagePlaceHolder />
        ) : categories.length === 0 ? (
          // Render placeholder component if categories array is empty
          <CategoriesPagePlaceHolder />
        ) : (
          // Render grid layout for category tiles if categories data is available
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Map through categories array and render CategoryTile component for each category */}
            {categories.map((category: any, index: number) => (
              <CategoryTile key={index} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
