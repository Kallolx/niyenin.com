"use client";

import React, { useState } from "react";
import { useCart } from "../CartContext";

export default function CheckoutDrawer() {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    deliveryArea,
    setDeliveryArea,
    deliveryCharge,
    grandTotal,
    placeOrder,
    triggerToast,
  } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      triggerToast("⚠️ Please fill in all delivery fields!");
      return;
    }
    placeOrder(fullName, phone, address);
    
    // Reset inputs
    setFullName("");
    setPhone("");
    setAddress("");
  };

  return (
    <>
      {/* Checkout Drawer Backdrop */}
      <div className={`drawer-backdrop ${isCheckoutOpen ? "open" : ""}`} onClick={() => setIsCheckoutOpen(false)} />

      {/* Checkout Drawer */}
      <div className={`drawer ${isCheckoutOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h2 className="drawer-title">Checkout</h2>
          <button className="close-btn" onClick={() => setIsCheckoutOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          {/* Order Summary */}
          <div style={{ marginBottom: 24, borderBottom: "1px solid var(--border-color)", paddingBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: "var(--primary-color)" }}>Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: "var(--text-muted)" }}>
                  {item.name} ({item.size}) x{item.quantity}
                </span>
                <span style={{ fontWeight: 600 }}>৳{item.price * item.quantity} BDT</span>
              </div>
            ))}
          </div>

          {/* Delivery Form */}
          <form id="checkout-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="fullname">Full Name *</label>
              <input
                type="text"
                id="fullname"
                className="form-input"
                placeholder="Enter your full name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                className="form-input"
                placeholder="01XXXXXXXXX"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="address">Delivery Address *</label>
              <textarea
                id="address"
                className="form-textarea"
                placeholder="House no, road no, flat no, area details..."
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="delivery-area">Delivery Area *</label>
              <select
                id="delivery-area"
                className="form-select"
                value={deliveryArea}
                onChange={(e) => setDeliveryArea(e.target.value)}
              >
                <option value="inside">Inside Dhaka (৳80)</option>
                <option value="outside">Outside Dhaka (৳150)</option>
              </select>
            </div>

            {/* Cash on Delivery Only */}
            <div className="form-group">
              <label className="form-label">Payment Method</label>
              <div className="payment-method-box">
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  className="payment-radio"
                  defaultChecked
                  disabled
                />
                <div className="payment-text">
                  <span className="payment-title">Cash on Delivery (COD)</span>
                  <span className="payment-desc">Pay cash when you receive the package.</span>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="drawer-footer">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>৳{subtotal} BDT</span>
          </div>
          <div className="summary-row">
            <span>Delivery Charge</span>
            <span>৳{deliveryCharge} BDT</span>
          </div>
          <div className="summary-row total">
            <span>Grand Total</span>
            <span>৳{grandTotal} BDT</span>
          </div>
          <button
            type="submit"
            form="checkout-form"
            className="checkout-btn"
          >
            Place Order (COD)
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
