"use client";

import React from "react";
import { useCart, JERSEYS, BEST_SELLERS } from "../CartContext";
import CartDrawer from "./CartDrawer";
import CheckoutDrawer from "./CheckoutDrawer";
import OrderSuccessModal from "./OrderSuccessModal";

export default function GlobalDrawers() {
  const {
    wishlist,
    toggleWishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    isAccountOpen,
    setIsAccountOpen,
    showToast,
    toastMessage,
  } = useCart();

  // Combine Jerseys and Best Sellers for the Wishlist view
  const allProducts = React.useMemo(() => {
    const items: { id: string; name: string; price: number; image: string; isJersey: boolean }[] = [];
    
    // Add jerseys
    JERSEYS.forEach((j) => {
      items.push({
        id: j.id,
        name: j.name,
        price: j.price,
        image: j.images[0],
        isJersey: true,
      });
    });
    
    // Add best sellers
    BEST_SELLERS.forEach((b) => {
      items.push({
        id: b.id,
        name: b.name,
        price: b.price,
        image: b.image,
        isJersey: false,
      });
    });
    
    return items;
  }, []);

  const wishlistedItems = allProducts.filter((item) => wishlist.includes(item.id));

  return (
    <>
      {/* Existing global e-commerce drawers */}
      <CartDrawer />
      <CheckoutDrawer />
      <OrderSuccessModal />

      {/* Wishlist Drawer Backdrop */}
      <div className={`drawer-backdrop ${isWishlistOpen ? "open" : ""}`} onClick={() => setIsWishlistOpen(false)} />

      {/* Wishlist Drawer */}
      <div className={`drawer ${isWishlistOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h2 className="drawer-title">My Wishlist ({wishlist.length})</h2>
          <button className="close-btn" onClick={() => setIsWishlistOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="drawer-body">
          {wishlistedItems.length === 0 ? (
            <div className="cart-empty">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <p>Your wishlist is empty.</p>
            </div>
          ) : (
            wishlistedItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img-wrapper">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                </div>
                <div className="cart-item-details" style={{ justifyContent: "center" }}>
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-meta">৳{item.price} BDT</p>
                  <div style={{ marginTop: 8, display: "flex", gap: 12 }}>
                    {item.isJersey ? (
                      <a
                        href="/jersey"
                        className="add-to-cart-btn"
                        style={{ padding: "6px 12px", fontSize: 12, textDecoration: "none" }}
                        onClick={() => setIsWishlistOpen(false)}
                      >
                        View Kit
                      </a>
                    ) : (
                      <a
                        href="/#best-sellers-section"
                        className="add-to-cart-btn"
                        style={{ padding: "6px 12px", fontSize: 12, textDecoration: "none" }}
                        onClick={() => {
                          setIsWishlistOpen(false);
                          setTimeout(() => {
                            const el = document.getElementById("best-sellers-section");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }}
                      >
                        View Product
                      </a>
                    )}
                    <button
                      className="remove-item-btn"
                      onClick={() => toggleWishlist(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Account Drawer Backdrop */}
      <div className={`drawer-backdrop ${isAccountOpen ? "open" : ""}`} onClick={() => setIsAccountOpen(false)} />

      {/* Account Drawer */}
      <div className={`drawer ${isAccountOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h2 className="drawer-title">My Account</h2>
          <button className="close-btn" onClick={() => setIsAccountOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="drawer-body" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 16 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Guest Customer</h3>
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 4 }}>Logged in as Guest</p>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", width: "100%", paddingTop: 16, marginTop: 16 }}>
            <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
              Account dashboard and order tracking histories will be available soon! Thank you for shopping at Niyenin.
            </p>
          </div>
          <button className="modal-btn" onClick={() => setIsAccountOpen(false)}>Close</button>
        </div>
      </div>

      {/* Toast Notification */}
      <div className={`toast ${showToast ? "show" : ""}`}>
        {toastMessage}
      </div>
    </>
  );
}
