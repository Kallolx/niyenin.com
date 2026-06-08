"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

// Types
export interface Jersey {
  id: string;
  name: string;
  team: string;
  type: string;
  price: number;
  oldPrice?: number;
  images: string[];
  badgeClass: string;
}

export interface CartItem {
  id: string; // unique item id (jerseyId-size)
  jerseyId: string;
  name: string;
  team: string;
  type: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CompletedOrder {
  orderId: string;
  name: string;
  phone: string;
  address: string;
  itemsCount: number;
  totalAmount: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  toastMessage: string;
  showToast: boolean;
  triggerToast: (msg: string) => void;
  toggleWishlist: (jerseyId: string) => void;
  addToCart: (jersey: Jersey, size: string) => void;
  updateQuantity: (itemId: string, amount: number) => void;
  removeFromCart: (itemId: string) => void;
  subtotal: number;
  deliveryArea: string;
  setDeliveryArea: (area: string) => void;
  deliveryCharge: number;
  grandTotal: number;
  totalCartItems: number;
  orderSuccess: boolean;
  setOrderSuccess: (success: boolean) => void;
  completedOrder: CompletedOrder | null;
  placeOrder: (name: string, phone: string, address: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const JERSEYS: Jersey[] = [
  {
    id: "arg-home",
    name: "Argentina Home Jersey",
    team: "Argentina",
    type: "Home Kit",
    price: 450,
    oldPrice: 999,
    images: ["/arg/home-front.avif", "/arg/home-back.avif", "/arg/1.png"],
    badgeClass: "badge-arg",
  },
  {
    id: "arg-away",
    name: "Argentina Away Jersey",
    team: "Argentina",
    type: "Away Kit",
    price: 450,
    oldPrice: 999,
    images: ["/arg/away-front.avif", "/arg/away-back.avif", "/arg/1.png"],
    badgeClass: "badge-arg",
  },
  {
    id: "bra-home",
    name: "Brazil Home Jersey",
    team: "Brazil",
    type: "Home Kit",
    price: 450,
    oldPrice: 999,
    images: ["/bra/home-front.avif", "/bra/home-back.avif", "/bra/1.png"],
    badgeClass: "badge-bra",
  },
  {
    id: "bra-away",
    name: "Brazil Away Jersey",
    team: "Brazil",
    type: "Away Kit",
    price: 450,
    oldPrice: 999,
    images: ["/bra/away-front.avif", "/bra/away-back.avif", "/bra/1.png"],
    badgeClass: "badge-bra",
  },
];

export interface GeneralProduct {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
}

export const BEST_SELLERS: GeneralProduct[] = [
  {
    id: "bs-watch",
    name: "Haylou Smart Watch 2",
    price: 2450,
    oldPrice: 3200,
    discount: 23,
    rating: 5,
    reviews: 128,
    image: "/smartwatch.png",
    category: "electronics"
  },
  {
    id: "bs-earbuds",
    name: "boAt Airdopes 131",
    price: 1299,
    oldPrice: 1800,
    discount: 28,
    rating: 5,
    reviews: 96,
    image: "/airdopes.png",
    category: "electronics"
  },
  {
    id: "bs-powerbank",
    name: "Xiaomi Power Bank 20000mAh",
    price: 1799,
    oldPrice: 2200,
    discount: 18,
    rating: 5,
    reviews: 75,
    image: "/powerbank.png",
    category: "mobile"
  },
  {
    id: "bs-shirt",
    name: "Men's Casual Shirt",
    price: 850,
    oldPrice: 1200,
    discount: 29,
    rating: 5,
    reviews: 64,
    image: "/shirt.png",
    category: "fashion"
  },
  {
    id: "bs-cookware",
    name: "Non-Stick Cookware Set",
    price: 2150,
    oldPrice: 2800,
    discount: 23,
    rating: 5,
    reviews: 87,
    image: "/cookware.png",
    category: "home-living"
  },
  {
    id: "bs-tablets",
    name: "Finish Dishwasher Tablets",
    price: 1150,
    oldPrice: 1500,
    discount: 23,
    rating: 5,
    reviews: 43,
    image: "/dishwasher.png",
    category: "home-living"
  }
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Drawer visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Delivery options
  const [deliveryArea, setDeliveryArea] = useState("inside"); // inside | outside

  // Success state
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const toggleWishlist = (jerseyId: string) => {
    if (wishlist.includes(jerseyId)) {
      setWishlist((prev) => prev.filter((id) => id !== jerseyId));
      triggerToast("Removed from Wishlist");
    } else {
      setWishlist((prev) => [...prev, jerseyId]);
      triggerToast("Added to Wishlist ❤️");
    }
  };

  const addToCart = (jersey: Jersey, size: string) => {
    if (!size) {
      triggerToast("⚠️ Please select a size first!");
      return;
    }

    const itemId = `${jersey.id}-${size}`;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId);
      if (existingItem) {
        triggerToast(`Increased quantity of ${jersey.name} (Size ${size})`);
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        triggerToast(`Added ${jersey.name} (Size ${size}) to Cart`);
        return [
          ...prevCart,
          {
            id: itemId,
            jerseyId: jersey.id,
            name: jersey.name,
            team: jersey.team,
            type: jersey.type,
            price: jersey.price,
            image: jersey.images[0],
            size: size,
            quantity: 1,
          },
        ];
      }
    });
  };

  const updateQuantity = (itemId: string, amount: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + amount;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    triggerToast("Item removed from Cart");
  };

  // Math totals
  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const deliveryCharge = useMemo(() => {
    if (cart.length === 0) return 0;
    return deliveryArea === "inside" ? 80 : 150;
  }, [deliveryArea, cart]);

  const grandTotal = useMemo(() => {
    return subtotal + deliveryCharge;
  }, [subtotal, deliveryCharge]);

  const totalCartItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const placeOrder = (name: string, phone: string, address: string) => {
    const randomId = `NYN-${Math.floor(100000 + Math.random() * 900000)}`;
    setCompletedOrder({
      orderId: randomId,
      name,
      phone,
      address: `${address}, ${deliveryArea === "inside" ? "Dhaka City" : "Outside Dhaka"}`,
      itemsCount: totalCartItems,
      totalAmount: grandTotal,
    });

    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setOrderSuccess(true);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isAccountOpen,
        setIsAccountOpen,
        toastMessage,
        showToast,
        triggerToast,
        toggleWishlist,
        addToCart,
        updateQuantity,
        removeFromCart,
        subtotal,
        deliveryArea,
        setDeliveryArea,
        deliveryCharge,
        grandTotal,
        totalCartItems,
        orderSuccess,
        setOrderSuccess,
        completedOrder,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
