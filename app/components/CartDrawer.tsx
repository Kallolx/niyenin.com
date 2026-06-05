"use client";

import React from "react";
import { useCart } from "../CartContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    setIsCheckoutOpen,
    totalCartItems,
  } = useCart();

  return (
    <>
      {/* Cart Drawer Backdrop */}
      <div className={`drawer-backdrop ${isCartOpen ? "open" : ""}`} onClick={() => setIsCartOpen(false)} />

      {/* Cart Drawer */}
      <div className={`drawer ${isCartOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h2 className="drawer-title">Shopping Cart ({totalCartItems})</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <p>Your shopping cart is empty.</p>
              <button className="modal-btn" style={{ maxWidth: "200px" }} onClick={() => setIsCartOpen(false)}>
                Shop Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img-wrapper">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                </div>
                <div className="cart-item-details">
                  <div>
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-meta">Size: {item.size}</p>
                  </div>
                  <div className="cart-item-bottom">
                    <div className="quantity-selector">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span className="qty-val">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span className="cart-item-price">৳{item.price * item.quantity} BDT</span>
                      <button className="remove-item-btn" onClick={() => removeFromCart(item.id)} title="Delete item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span>Subtotal</span>
              <span style={{ fontWeight: 600 }}>৳{subtotal} BDT</span>
            </div>
            <div className="summary-row">
              <span>Delivery Charge</span>
              <span style={{ color: "var(--text-muted)" }}>Calculated at checkout</span>
            </div>
            <div className="summary-row total">
              <span>Estimated Total</span>
              <span>৳{subtotal} BDT</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
            >
              Proceed to Checkout
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
