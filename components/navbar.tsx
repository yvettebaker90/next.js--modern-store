"use client"; // This component uses client-side features like state and context

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Navbar - Sticky navigation bar with logo, search, favorites, and cart
 * 
 * Features:
 * - Fixed position navbar (sticky top-0) for always-visible navigation
 * - Store logo that links back to homepage
 * - Search bar with form submission (desktop view)
 * - Mobile search button that focuses the search input
 * - Favorites link with red badge showing count of saved items
 * - Cart link with red badge showing total number of items in cart
 * - Responsive design: search bar hidden on mobile, navigation links hidden on small screens
 */
export default function Navbar() {
  // Get cart items and favorites list from Cart Context
  const { cart, favorites } = useCart();
  // Local state for search input field
  const [searchQuery, setSearchQuery] = useState("");
  // Router for navigating to search results page
  const router = useRouter();
  
  // Calculate total items in cart (sum of all quantities)
  // Example: If cart has 2 of product A and 1 of product B, cartCount = 3
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  // Calculate number of favorite items
  const favCount = favorites.length;

  /**
   * Handle search form submission
   * - Validates that search query is at least 2 characters
   * - Navigates to /search page with encoded query parameter
   * - Clears search input after navigation
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo - Links back to homepage with gradient text effect */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-gray-900"
          >
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Modern Store
            </span>
          </Link>

          {/* Navigation Links - Hidden on small screens (md:flex shows on medium+ screens) */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              Home
            </Link>
            <a
              href="#products"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              Products
            </a>
            <a
              href="#categories"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              Categories
            </a>
          </div>

          {/* Search Bar - Hidden on mobile, visible on medium+ screens */}
          <form
            onSubmit={handleSearch}
            className="hidden flex-1 max-w-xs md:block"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm placeholder-gray-500 transition focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              {/* Search icon inside input field */}
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </form>

          {/* Right side icons - Mobile search, favorites, and cart buttons */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Button - Only shows on mobile, focuses the search input */}
            <button
              type="button"
              onClick={() => {
                const searchInput = document.querySelector(
                  'input[placeholder="Search products..."]'
                ) as HTMLInputElement;
                searchInput?.focus();
              }}
              className="rounded-lg bg-gray-100 p-2 transition hover:bg-gray-200 md:hidden"
              title="Search"
              aria-label="Search"
            >
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Favorites/Wishlist Button - Shows heart icon with red badge */}
            {/* Badge displays count of items saved to favorites */}
            <Link
              href="/favorites"
              className="relative rounded-lg bg-gray-100 p-2 transition hover:bg-gray-200"
              title="Saved items"
            >
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
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
              {/* Red badge showing count of favorites - only displays if count > 0 */}
              {favCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {favCount}
                </span>
              )}
            </Link>

            {/* Cart Button - Black button with red badge */}
            {/* Badge displays total quantity of items in cart */}
            <Link href="/cart" className="relative rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800">
              Cart
              {/* Red badge showing total items in cart - only displays if count > 0 */}
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
