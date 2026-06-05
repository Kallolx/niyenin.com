"use client";

import React, { useMemo } from "react";
import { useCart, JERSEYS } from "./CartContext";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import CheckoutDrawer from "./components/CheckoutDrawer";
import OrderSuccessModal from "./components/OrderSuccessModal";

export default function Home() {
  const {
    searchQuery,
    wishlist,
    toggleWishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    isAccountOpen,
    setIsAccountOpen,
    showToast,
    toastMessage,
  } = useCart();

  // Filter jerseys based on search
  const filteredJerseys = useMemo(() => {
    return JERSEYS.filter(
      (jersey) =>
        jersey.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        jersey.team.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-placeholder">
          <img src="/hero-banner.png" alt="Niyenin Sports Cover" className="hero-banner-img" />
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container flex-grow">
        
        {/* Products Grid */}
        <section className="products-section">
          <h1 className="section-title">Jersey Collection</h1>
          
          {filteredJerseys.length > 0 ? (
            <div className="products-grid">
              {filteredJerseys.map((jersey) => (
                <ProductCard key={jersey.id} jersey={jersey} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: 12 }}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <p>No jerseys found matching your search.</p>
            </div>
          )}
        </section>
      </main>

      {/* Why Buy From Us Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <h3 className="feature-title">Fast Delivery</h3>
              <p className="feature-description">
                Super fast delivery across Bangladesh. Cash on delivery standard.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                  <line x1="12" y1="22" x2="12" y2="15.5"></line>
                  <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
                  <polyline points="2 15.5 12 8.5 22 15.5"></polyline>
                  <line x1="12" y1="2" x2="12" y2="8.5"></line>
                </svg>
              </div>
              <h3 className="feature-title">Premium Quality</h3>
              <p className="feature-description">
                100% premium Thai player edition quality fabrics, stitching, and logos.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                </svg>
              </div>
              <h3 className="feature-title">Easy Exchange</h3>
              <p className="feature-description">
                Hassle-free size replacement policy if the jersey doesn&apos;t fit.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Drawers and Modals */}
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
          {wishlist.length === 0 ? (
            <div className="cart-empty">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <p>Your wishlist is empty.</p>
            </div>
          ) : (
            JERSEYS.filter(j => wishlist.includes(j.id)).map(jersey => (
              <div key={jersey.id} className="cart-item">
                <div className="cart-item-img-wrapper">
                  <img src={jersey.images[0]} alt={jersey.name} className="cart-item-img" />
                </div>
                <div className="cart-item-details" style={{ justifyContent: "center" }}>
                  <h4 className="cart-item-name">{jersey.name}</h4>
                  <p className="cart-item-meta">৳{jersey.price} BDT</p>
                  <div style={{ marginTop: 8, display: "flex", gap: 12 }}>
                    <button
                      className="add-to-cart-btn"
                      style={{ padding: "6px 12px", fontSize: 12 }}
                      onClick={() => {
                        setIsWishlistOpen(false);
                        const element = document.getElementById(jersey.id);
                        if (element) element.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      View Kit
                    </button>
                    <button
                      className="remove-item-btn"
                      onClick={() => toggleWishlist(jersey.id)}
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
