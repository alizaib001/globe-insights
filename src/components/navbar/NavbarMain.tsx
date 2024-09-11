import React from "react"; // Import React library
import { Navbar } from "./Navbar"; // Import Navbar component
import { getCategoriesTitleSlug } from "@/utils/sanityQueries"; // Import function for fetching category data

// Asynchronous function to fetch categories and render the Navbar component
export default async function NavbarMain() {
  // Fetch categories data asynchronously
  const categories = await getCategoriesTitleSlug();

  // Render the Navbar component with fetched categories as props
  return <Navbar categories={categories} />;
}
