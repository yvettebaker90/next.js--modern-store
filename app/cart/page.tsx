"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { getFirstImage } from "@/lib/image";

/**
 * CartPage - Shopping cart page that displays all items added to the cart
 * 
 * Features:
 * - Displays all items in the cart with images, prices, and quantities
 * - Shows order summary with subtotal, shipping, and total price
 * - Allows removing individual items from the cart
 * - Handles empty cart state with a helpful message
 * - Provides links to continue shopping
 * 
 * Uses client-side rendering ("use client") because it interacts with React Context
 */
export default function CartPage() {
  // Get cart data and removal function from the Cart Context
  const { cart, removeFromCart } = useCart();

  // Calculate total price by summing up (price × quantity) for all items
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Show empty cart message if no items are in the cart
  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Shopping Cart
          </h1>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-16 text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-label="Empty cart"
            >
              <title>Empty shopping cart</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <p className="mb-8 text-lg text-gray-600">Your cart is empty</p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-black px-8 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Shopping Cart
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          {cart.length} item{cart.length !== 1 ? "s" : ""} in your bag
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => {
            const img = getFirstImage(item.images);
            return (
              <div
                key={item.id}
                className="group flex gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {img ? (
                    <Image
                      src={img}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">
                      No image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col">
                  <Link
                    href={`/products/${item.id}`}
                    className="font-semibold text-gray-900 hover:text-black"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-gray-500">{item.category?.name}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        {item.price} kr
                      </span>
                      <span className="text-sm text-gray-500">
                        × {item.quantity}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-lg bg-red-50 px-3 py-1 text-sm font-medium text-red-600 transition hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Summary */}
        <div className="h-fit rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm sticky top-20">
          <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

          <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium">{total.toFixed(2)} kr</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span className="font-medium">At checkout</span>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="flex justify-between">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {total.toFixed(2)} kr
              </span>
            </div>
          </div>

          <button type="button" className="mt-6 w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800">
            Checkout
          </button>

          <Link
            href="/"
            className="mt-3 block rounded-lg border border-gray-300 bg-white px-4 py-3 text-center font-semibold text-gray-900 transition hover:bg-gray-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
