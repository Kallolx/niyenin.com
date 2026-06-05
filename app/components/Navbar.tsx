"use client";

import React from "react";
import { useCart } from "../CartContext";

export default function Navbar() {
  const {
    searchQuery,
    setSearchQuery,
    wishlist,
    totalCartItems,
    subtotal,
    setIsCartOpen,
    setIsWishlistOpen,
  } = useCart();

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Logo */}
        <a href="#" className="logo-link">
          <img src="/logo.png" alt="Niyenin Logo" className="logo-img" />
        </a>

        {/* Search Bar */}
        <div className="search-bar">
          <span className="search-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search jerseys..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Actions (Wishlist, Cart, Price Pill) */}
        <div className="nav-actions">
          {/* Wishlist */}
          <button className="icon-btn" onClick={() => setIsWishlistOpen(true)} title="Wishlist">
            <svg width="22" height="22" viewBox="0 0 24 24" fill={wishlist.length > 0 ? "var(--primary-color)" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </button>

          {/* Cart */}
          <button className="icon-btn" onClick={() => setIsCartOpen(true)} title="Shopping Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {totalCartItems > 0 && <span className="badge">{totalCartItems}</span>}
          </button>

          {/* Price Pill */}
          <div className="price-pill" onClick={() => setIsCartOpen(true)} title="View Cart Subtotal">
            {subtotal.toFixed(2)}৳
          </div>
        </div>
      </div>
    </header>
  );
}
