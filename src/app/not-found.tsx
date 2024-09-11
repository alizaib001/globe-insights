// Importing React is unnecessary as this is a React file and React is not explicitly used

// Define the Custom404 functional component
export default function Custom404() {
  return (
    // Section for the 404 error page, centered horizontally and vertically with a white background
    <section className="flex w-full items-center justify-center bg-white">
      {/* Container for content, centered horizontally, with padding */}
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        {/* Container for the content, centered horizontally */}
        <div className="mx-auto max-w-screen-sm text-center">
          {/* Heading for the 404 error message */}
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-blue-600 lg:text-9xl">
            404
          </h1>
          {/* Subheading for the 404 error message */}
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Something&#39;s missing.
          </p>
          {/* Paragraph explaining the 404 error */}
          <p className="mb-4 text-lg font-light text-gray-500">
            Sorry, we can&#39;t find that page. You&#39;ll find lots to explore
            on the home page.
          </p>
          {/* Link back to the homepage */}
          <a
            href="/"
            className="my-4 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Back to Homepage
          </a>
        </div>
      </div>
    </section>
  );
}
