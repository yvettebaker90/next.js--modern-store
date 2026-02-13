import "./globals.css";
import Navbar from "@/components/navbar";
import { CartProvider } from "@/lib/cart-context";

export const metadata = {
  title: "The Modern Store",
  description: "Next.js shop using Platzi Fake Store API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className="bg-white text-gray-900">
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}