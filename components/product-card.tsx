"use client"; // This component uses client-side features like state and context

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { getFirstImage } from "@/lib/image";
import { useCart } from "@/lib/cart-context";

// Type definition for ProductCard props
type Props = {
  product: Product; // The product object to display
};

/**
 * ProductCard - Reusable product card component displayed in product grids
 * 
 * Features:
 * - Shows product image, title, category, and price
 * - Clickable card that links to the product detail page
 * - "Save" heart button to add/remove from favorites
 * - "Add to Cart" button to add product to shopping cart
 * - Smooth hover animations and transitions
 * - Click handlers prevent navigation when clicking buttons
 */
export default function ProductCard({ product }: Props) {
  // Get the first valid product image for display
  const img = getFirstImage(product.images);
  // Get cart functions from Cart Context (add to cart, toggle favorite, check if favorited)
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  // Check if this product is currently in the user's favorites
  const favorited = isFavorite(product.id);

  // Handle "Add to Cart" button click
  // Prevents the card link from navigating to product detail page
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event from bubbling up
    addToCart(product);
  };

  // Handle "Save to Favorites" button click
  // Prevents the card link from navigating to product detail page
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event from bubbling up
    toggleFavorite(product);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col rounded-xl border border-gray-200 bg-white transition duration-300 hover:border-gray-300 hover:shadow-lg"
    >
      {/* Product Image Section */}
      <div className="relative aspect-square w-full overflow-hidden rounded-t-xl bg-gray-100">
        {img ? (
          <Image
            src={img}
            alt={product.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
            width={300}
            height={300}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
            No image
          </div>
        )}

        {/* Favorite/Save Button - appears on top-right of image */}
        {/* Heart fills with red color when product is in favorites */}
        <button
          type="button"
          onClick={handleToggleFavorite}
          className="absolute right-3 top-3 rounded-full bg-white p-2.5 shadow-md transition duration-200 hover:shadow-lg hover:scale-110"
          title={favorited ? "Remove from favorites" : "Add to favorites"}
          aria-label="Save product"
        >
          <svg
            className={`h-5 w-5 ${favorited ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"}`}
            fill={favorited ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Product Information Section */}
      <div className="flex flex-1 flex-col px-4 py-4">
        {/* Category name at the top - small gray text */}
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {product.category?.name}
        </p>
        
        {/* Product title - limited to 2 lines */}
        <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-black">
          {product.title}
        </h3>

        {/* Price and Add to Cart Button - pushed to bottom using mt-auto */}
        <div className="mt-auto pt-4">
          {/* Product price in Swedish Kronor (kr) */}
          <div className="mb-3 flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              {product.price} kr
            </span>
          </div>

          {/* Add to Cart Button - full width with black background */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}