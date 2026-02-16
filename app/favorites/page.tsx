"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import ProductCard from "@/components/product-card";

/**
 * FavoritesPage - Displays all items saved to the user's wishlist/favorites
 * 
 * Features:
 * - Shows all products the user has liked/saved
 * - Displays item count of saved products
 * - Allows adding saved items to cart via product cards
 * - Handles empty favorites state with a helpful message
 * - Uses the same ProductCard component as the main store for consistency
 * 
 * Uses client-side rendering ("use client") to access the Cart Context
 * added a line
 */
export default function FavoritesPage() {
  // Get the favorites array from the Cart Context
  const { favorites } = useCart();

  if (favorites.length === 0) {
    return (
      <main className="bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Saved Items
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Your wishlist is currently empty
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-16 text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Empty wishlist</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <p className="mb-8 text-lg text-gray-600">
              Start saving your favorite products
            </p>
            <Link
              href="/"
              className="inline-block rounded-lg bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Saved Items
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            You have {favorites.length} saved item{favorites.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
