/**
 * cleanImageUrl - Validates and cleans image URLs from API responses
 * 
 * Problem: The Platzi API sometimes returns malformed image URLs with extra characters
 * Examples of issues:
 * - ["[\\"https://example.com/image.jpg\\"]"]  (double-encoded JSON)
 * - Extra brackets and quotes from inconsistent API formatting
 * 
 * Solution:
 * 1. Remove all brackets [], quotes ", and backslashes \
 * 2. Trim whitespace
 * 3. Validate it's a proper URL using URL constructor
 * 4. Return empty string if URL is invalid
 * 
 * Parameters:
 * - url: The potentially malformed image URL from API (or undefined)
 * 
 * Returns: String - Clean, validated URL or empty string if invalid
 */
export function cleanImageUrl(url: string | undefined): string {
  if (!url) return "";

  // Remove malformed characters that API sometimes adds: brackets [], quotes ", backslashes \
  // This regex matches [] " \ and removes all occurrences
  const cleaned = url.replace(/[\[\]\"]/g, "").trim();

  // Validate that the cleaned string is actually a proper URL
  // The URL constructor will throw an error if the string is not a valid URL
  try {
    new URL(cleaned);
    return cleaned; // URL is valid, return it
  } catch {
    return ""; // URL is invalid, return empty string as fallback
  }
}

/**
 * getFirstImage - Get the first valid image from a product's image array
 * 
 * Purpose: 
 * - Extract the first image from the images array
 * - Clean and validate it's a proper URL
 * - Used when displaying product thumbnails and cards
 * 
 * Parameters:
 * - images: Array of image URLs from product (or undefined)
 * 
 * Returns: String - First clean/validated image URL, or empty string if no valid images
 * 
 * Logic:
 * 1. Check if images array exists and has items
 * 2. Get the first image from array (index 0)
 * 3. Clean and validate it with cleanImageUrl
 * 4. Return result (which may be empty string if validation fails)
 */
export function getFirstImage(images: string[] | undefined): string {
  if (!images || images.length === 0) return "";
  return cleanImageUrl(images[0]);
}