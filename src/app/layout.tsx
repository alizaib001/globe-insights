// Importing type definitions for Metadata from Next.js
import type { Metadata } from "next";
// Importing the Inter font from Google Fonts for use as sans-serif font
import { Inter as FontSans } from "next/font/google";
// Importing global CSS styles
import "./globals.css";
// Importing the NavbarMain component
import NavbarMain from "@/components/navbar/NavbarMain";
// Importing utility function 'cn' from utils
import { cn } from "@/lib/utils";
// Importing the Footer component
import { Footer } from "@/components/footer/Footer";

// Defining the sans-serif font settings
export const fontSans = FontSans({
  subsets: ["latin"], // Including Latin characters
  variable: "--font-sans", // CSS variable name for the font
});

// Metadata for the website
export const metadata: Metadata = {
  title: "Globe Insights", // Title of the website
  description: "Your Daily Source for the Latest News and Updates.", // Description of the website
};

// Default function for the RootLayout component
export default function RootLayout({
  children, // Children components to be rendered within the layout
}: Readonly<{
  children: React.ReactNode; // Children prop as React.ReactNode
}>) {
  return (
    // HTML document structure with lang attribute set to "en"
    <html lang="en">
      {/* Body element with class names for styling and font settings */}
      <body
        className={cn(
          "min-h-screen bg-white font-sans antialiased flex flex-col", // Common classes for body styling
          fontSans.variable, // CSS variable for sans-serif font
        )}
      >
        {/* Main navigation component */}
        <NavbarMain />
        {/* Container for page content with maximum width and centered */}
        <div className="mx-auto flex max-w-[1440px] p-4 flex-grow">{children}</div>
        {/* Footer component */}
        <Footer />
      </body>
    </html>
  );
}
