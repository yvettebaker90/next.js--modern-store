## Modern Store – Next.js E-commerce Demo

A small e-commerce storefront built with Next.js (App Router), TypeScript (strict mode) and Tailwind CSS.
The project focuses on clean structure, defensive data handling, and clear separation between server and client components.

## Tech Stack

 - Next.js 16 (App Router)
 - React 19
 - TypeScript (strict)
 - Tailwind CSS v4
 - Context API (Cart + Favorites)
 - Platzi Fake Store API (external REST API)

## Features
**🛒 Product Listing**
 - Fetches products and categories from external API
 - Defensive filtering of malformed data
 - Clean data transformation before rendering

**🔎 Category Filtering (URL-driven)**
 - Uses searchParams (?category=) for filtering
 - Shareable and bookmarkable filtered views
 - Server-side filtering logic

**📄 Pagination**
 - Custom pagination logic
 - Configurable itemsPerPage
 - Calculated offset slicing for performance

**❤️ Cart & Favorites**
 - Global state using React Context
 - Custom hook (useCart)
 - Add/remove logic without prop drilling

**🖼 Image Sanitization**

 - Handles malformed or broken image URLs
 - Prevents broken UI rendering

**Architectural Decisions**
 - Server Components for data fetching and filtering logic
 - Client Components only where interactivity is required (cart, favorites, UI interactions)
 - safeFetch() wrapper for consistent error handling
 - Strict TypeScript for predictable data structures
 - Defensive programming when consuming external API data

## 📂 Project Structure
```txt
app/
  page.tsx        # Main storefront page (filtering + pagination)
  layout.tsx      # Root layout
components/
  product-card.tsx
  navbar.tsx
lib/
  api.ts          # Fetch wrapper
  cart-context.tsx
  image.ts        # Image validation logic
```

## 🔮 Possible Improvements
 - Improve accessibility (ARIA attributes + keyboard nav)
 - Replace DOM query usage with React refs
 - Add loading skeletons
 - Add tests (e.g. Vitest or Playwright)
 - Improve README with screenshots

## 🛠 Setup
npm install
npm run dev

Then open:

http://localhost:3000

## 🎯 Purpose

This project was built to demonstrate:
 - Understanding of modern Next.js architecture
 - Clean TypeScript usage
 - State management without overengineering
 - Defensive frontend practices when consuming third-party APIs
 - Clear separation between data logic and UI components
