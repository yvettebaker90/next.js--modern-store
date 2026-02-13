import CategoryNav from "@/components/category-nav";
import ProductCard from "@/components/product-card";
import { getCategories, getProducts } from "@/lib/api";
import type { Category, Product } from "@/types/product";
import { getFirstImage } from "@/lib/image";

// Type definition for page props
// searchParams is a Promise containing filter parameters from the URL query string
type PageProps = {
  searchParams?: Promise<{
    category?: string; // Selected category filter from ?category=X
    page?: string;     // Current page number from ?page=X
  }>;
};

/**
 * HomePage - Main page that displays products with filtering and pagination
 * 
 * Features:
 * - Fetches categories and products from the Platzi Store API
 * - Filters products by selected category (optional)
 * - Implements pagination with 20 items per page
 * - Removes malformed category names from display
 * - Only shows products that have valid images
 * - Handles API errors gracefully with error messages
 */
export default async function HomePage({ searchParams }: PageProps) {
  // Await the Promise to get the actual search parameters
  const params = await searchParams;
  
  // Extract category filter from URL params, convert to number (or undefined if not present)
  const activeCategoryId = params?.category
    ? Number(params.category)
    : undefined;

  // Extract page number from URL params, defaults to page 1
  const currentPage = params?.page ? Number(params.page) : 1;
  
  // Pagination settings: show 20 items per page
  const itemsPerPage = 21;
  // Calculate starting position for current page (e.g., page 2 starts at item 20)
  const offset = (currentPage - 1) * itemsPerPage;

  // Initialize state variables for categories, products, and error handling
  let categories: Category[] = [];
  let allProducts: Product[] = [];
  let errorMessage = "";

  // Fetch all categories from the API
  try {
    categories = await getCategories();
    // Filter out categories with malformed or empty names
    categories = categories.filter((cat) => {
      const name = cat.name?.trim() || "";
      // Remove if empty, or if it looks like malformed data (timestamps, IDs, etc)
      return (
        name.length > 0 &&
        !name.match(/^(cat|prod-cat)-\d+/) && // Remove timestamp-based IDs like "cat-1770889012202"
        !name.match(/^\d+$/) // Remove pure numeric IDs like "12345"
      );
    });
  } catch (_err) {
    errorMessage = "Kunde inte hämta kategorier just nu.";
  }

  // Fetch products from the API, optionally filtered by category
  try {
    allProducts = await getProducts(activeCategoryId);
    // Filter out products without images to maintain a consistent display
    allProducts = allProducts.filter((p) => getFirstImage(p.images));
  } catch (_err) {
    errorMessage =
      errorMessage || "Kunde inte hämta produkter just nu. Försök igen senare.";
  }

  // Calculate pagination values
  const totalProducts = allProducts.length;
  // Get only the products for the current page
  const products = allProducts.slice(offset, offset + itemsPerPage);
  // Calculate total number of pages needed
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  // Check if there's a next page available
  const hasNextPage = currentPage < totalPages;
  // Check if there's a previous page available
  const hasPrevPage = currentPage > 1;

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <header className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            The Modern Store
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover amazing products from Platzi Fake Store API
          </p>

          {categories.length > 0 && (
            <div className="mt-8">
              <CategoryNav
                categories={categories}
                activeCategoryId={activeCategoryId}
              />
            </div>
          )}
        </header>

        {errorMessage && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {errorMessage}
          </div>
        )}

        <section>
          {!errorMessage && products.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center">
              <p className="text-lg text-gray-600">No products found in this category</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-sm font-medium text-gray-600">
                  Showing {products.length} of {totalProducts} products
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalProducts > itemsPerPage && (
                <div className="mt-12 flex items-center justify-center gap-4">
                  {hasPrevPage && (
                    <a
                      href={`/?${activeCategoryId ? `category=${activeCategoryId}&` : ""}page=${currentPage - 1}`}
                      className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium transition hover:border-gray-400 hover:bg-gray-50"
                    >
                      ← Previous
                    </a>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      Page {currentPage}
                    </span>
                    <span className="text-gray-400">of</span>
                    <span className="text-sm font-medium text-gray-900">
                      {totalPages}
                    </span>
                  </div>

                  {hasNextPage && (
                    <a
                      href={`/?${activeCategoryId ? `category=${activeCategoryId}&` : ""}page=${currentPage + 1}`}
                      className="rounded-lg border border-black bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                      Next →
                    </a>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}