import type { Category, Product } from "@/types/product";

// Base URL for Platzi Fake Store API
const BASE_URL = "https://api.escuelajs.co/api/v1";

/**
 * safeFetch - Generic wrapper for API calls with error handling
 * 
 * Purpose: Centralized error handling for all API requests
 * 
 * Generic Type T: The expected response data type (Product, Category, etc.)
 * 
 * Features:
 * - cache: "no-store" ensures fresh data on every request (important for dev/testing)
 * - HTTP status checking - throws error if response is not successful (200-299)
 * - Automatically parses JSON response
 * - Proper error messages with status code and URL for debugging
 * 
 * Error handling: Throws Error if HTTP status is not OK (2xx range)
 */
async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    // cache: "no-store" ensures fresh data is fetched every time (no caching)
    // This is important for development and testing - you'll see updated data immediately
    cache: "no-store",
  });

  // Check if HTTP response was successful (200-299 range)
  if (!res.ok) {
    throw new Error(`API error ${res.status} for ${url}`);
  }

  // Parse JSON response and return as type T
  return res.json() as Promise<T>;
}

/**
 * getProducts - Fetch all products or products filtered by category
 * 
 * Parameters:
 * - categoryId (optional): If provided, returns only products in that category
 * 
 * Returns: Promise<Product[]> - Array of product objects
 * 
 * Endpoints:
 * - No category: GET /api/v1/products
 * - With category: GET /api/v1/products/?categoryId={id}
 */
export async function getProducts(categoryId?: number): Promise<Product[]> {
  // Build URL - add categoryId query parameter if provided
  const url = categoryId
    ? `${BASE_URL}/products/?categoryId=${categoryId}`
    : `${BASE_URL}/products`;

  return safeFetch<Product[]>(url);
}

/**
 * getProductById - Fetch a single product by its ID
 * 
 * Parameters:
 * - id: The product ID to fetch
 * 
 * Returns: Promise<Product> - Single product object with full details including images and description
 * 
 * Endpoint: GET /api/v1/products/{id}
 */
export async function getProductById(id: number): Promise<Product> {
  return safeFetch<Product>(`${BASE_URL}/products/${id}`);
}

/**
 * getCategories - Fetch all available product categories
 * 
 * Returns: Promise<Category[]> - Array of category objects
 * 
 * Used for: Building category filter buttons, filtering products by category
 * 
 * Endpoint: GET /api/v1/categories
 */
export async function getCategories(): Promise<Category[]> {
  return safeFetch<Category[]>(`${BASE_URL}/categories`);
}