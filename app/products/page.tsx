import Image from "next/image";
import { getProductById } from "@/lib/api";
import { getFirstImage, cleanImageUrl } from "@/lib/image";

// Type definition for dynamic route parameters
type Props = {
  params: { id: string }; // Product ID from the URL (e.g., /products/5)
};

/**
 * ProductPage - Detailed product page showing full product information
 * 
 * Features:
 * - Fetches a specific product by ID from the API
 * - Displays product images (hero image + gallery)
 * - Shows product title, price, category, and description
 * - Includes back navigation to return to shop
 * - Handles errors gracefully if product is not found
 * - Product images are validated and cleaned
 */
export default async function ProductPage({ params }: Props) {
  // Extract product ID from URL and convert to number
  const id = Number(params.id);

  try {
    // Fetch the product details from the API
    const product = await getProductById(id);
    // Get the first valid image to display as the main hero image
    const heroImg = getFirstImage(product.images);

    return (
      <main className="bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          {/* Back button */}
          <a
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-label="Back arrow"
            >
              <title>Back arrow</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Shop
          </a>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Images */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl bg-gray-100">
                {heroImg ? (
                  <Image
                    src={heroImg}
                    alt={product.title}
                    className="h-auto w-full object-cover"
                    width={500}
                    height={500}
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center text-sm text-gray-500">
                    No image
                  </div>
                )}
              </div>

              {product.images?.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((raw) => {
                    const url = cleanImageUrl(raw);
                    if (!url) return null;

                    return (
                      <div
                        key={url}
                        className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg"
                      >
                        <Image
                          src={url}
                          alt={product.title}
                          className="h-full w-full object-cover"
                          width={80}
                          height={80}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                {product.category?.name}
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
                {product.title}
              </h1>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  {product.price} kr
                </span>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Description
                  </h2>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <button type="button" className="mt-8 w-full rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (_e) {
    return (
      <main className="bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-label="Error icon"
            >
              <title>Error icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              Product Not Found
            </h1>
            <p className="mt-2 text-gray-600">
              The product you're looking for doesn't exist or the API is unavailable.
            </p>
            <a
              href="/"
              className="mt-6 inline-block rounded-lg bg-black px-6 py-2 text-white transition hover:bg-gray-800"
            >
              Back to Shop
            </a>
          </div>
        </div>
      </main>
    );
  }
}