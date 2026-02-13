import Link from "next/link";
import type { Category } from "@/types/product";

// Type definition for CategoryNav props
type Props = {
  categories: Category[]; // Array of available product categories
  activeCategoryId?: number; // ID of currently active/selected category (optional)
};

/**
 * CategoryNav - Category filter navigation component
 * 
 * Purpose: Horizontal scrollable button navigation for filtering products by category
 * 
 * Features:
 * - "All" button that links to homepage without category filter
 * - Dynamically generated category buttons from categories array
 * - Active category button is highlighted with black background and white text
 * - Inactive buttons have white background with gray border
 * - Smooth hover animations on all buttons
 * - Links to homepage with category query parameter (/?category={id})
 */
export default function CategoryNav({ categories, activeCategoryId }: Props) {
  return (
    <nav className="flex flex-wrap gap-2">
      {/* "All Categories" button - highlights when no category is selected */}
      <Link
        href="/"
        className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ${
          activeCategoryId
            ? "border-gray-300 bg-white text-gray-900 hover:border-gray-400" // Inactive style
            : "border-black bg-black text-white hover:bg-gray-800" // Active style
        }`}
      >
        All
      </Link>

      {/* Category buttons - maps through each category from the categories array */}
      {categories.map((cat) => {
        // Check if this is the currently active category
        const isActive = cat.id === activeCategoryId;
        return (
          <Link
            key={cat.id}
            href={`/?category=${cat.id}`}
            // Toggle styling based on active state
            className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ${
              isActive
                ? "border-black bg-black text-white hover:bg-gray-800" // Active: dark background
                : "border-gray-300 bg-white text-gray-900 hover:border-gray-400" // Inactive: light background
            }`}
          >
            {cat.name}
          </Link>
        );
      })}
    </nav>
  );
}