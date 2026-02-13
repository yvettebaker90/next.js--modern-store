import ProductCard from "@/components/product-card";
import { getProducts } from "@/lib/api";
import { getFirstImage } from "@/lib/image";
import type { Product } from "@/types/product";
import Link from "next/link";

// Type definition for search page props
// searchParams is a Promise containing the search query from the URL
type SearchPageProps = {
  searchParams?: Promise<{
    q?: string; // The search query string from ?q=search_term
  }>;
};

/**
 * SearchPage - Displays search results for products
 * 
 * Features:
 * - Searches products by title, description, and category name
 * - Requires at least 2 characters to perform search
 * - Only shows products with valid images
 * - Limits results to 50 products maximum
 * - Shows helpful messages for empty searches or no results
 * - Handles API errors gracefully
 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Await the Promise to get the actual search parameters
  const params = await searchParams;
  // Extract and normalize the search query (lowercase and trimmed)
  const query = params?.q?.toLowerCase().trim() || "";

  let results: Product[] = [];
  let error = "";

  // Validate search query length
  if (query.length < 2) {
    error = "Please enter at least 2 characters to search.";
  } else {
    // Perform search if query is valid
    try {
      // Fetch all products from the API
      const allProducts = await getProducts();
      // Filter products matching the search query
      results = allProducts
        .filter(
          (product) =>
            // Only show products with valid images
            getFirstImage(product.images) &&
            // Search in product title, description, and category name
            (product.title.toLowerCase().includes(query) ||
              product.description?.toLowerCase().includes(query) ||
              product.category?.name?.toLowerCase().includes(query))
        )
        .slice(0, 50); // Limit results to 50 items
    } catch (_err) {
      error = "Failed to search products. Please try again.";
    }
  }

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Search Results
          </h1>
          {query && (
            <p className="mt-4 text-lg text-gray-600">
              Results for:{" "}
              <span className="font-semibold text-gray-900">"{query}"</span>
            </p>
          )}
        </div>

        {error && (
          <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-700">
            {error}
          </div>
        )}

        {query && results.length > 0 && (
          <div>
            <p className="mb-8 text-sm font-medium text-gray-600">
              Found <span className="font-semibold text-gray-900">{results.length}</span>{" "}
              product{results.length !== 1 ? "s" : ""}
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {query && results.length === 0 && !error && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center">
            <p className="mb-6 text-lg text-gray-600">
              No products found matching{" "}
              <span className="font-semibold">"{query}"</span>
            </p>
            <Link
              href="/"
              className="inline-block rounded-lg bg-black px-6 py-2 text-white transition hover:bg-gray-800"
            >
              Back to Home
            </Link>
          </div>
        )}

        {!query && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center">
            <p className="mb-6 text-lg text-gray-600">
              Enter a search term to find products
            </p>
            <Link
              href="/"
              className="inline-block rounded-lg bg-black px-6 py-2 text-white transition hover:bg-gray-800"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
