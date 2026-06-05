import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Niyenin | Premium Argentina & Brazil Jerseys",
  description: "Get the latest high-quality Argentina and Brazil home and away jerseys. Fast cash on delivery all over Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
