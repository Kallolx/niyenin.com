"use client";

import React from "react";
import { useCart } from "../CartContext";

export default function OrderSuccessModal() {
  const { orderSuccess, setOrderSuccess, completedOrder } = useCart();

  if (!orderSuccess || !completedOrder) return null;

  return (
    <div className={`modal-overlay ${orderSuccess ? "open" : ""}`}>
      <div className="modal">
        <div className="success-icon-wrapper">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 className="modal-title">Order Placed!</h2>
        <p className="modal-desc">
          Your order has been received successfully. We will call you soon to confirm the details.
        </p>

        <div className="modal-details">
          <div className="modal-detail-row">
            <span className="modal-detail-label">Order ID:</span>
            <span className="modal-detail-val">{completedOrder.orderId}</span>
          </div>
          <div className="modal-detail-row">
            <span className="modal-detail-label">Customer Name:</span>
            <span className="modal-detail-val">{completedOrder.name}</span>
          </div>
          <div className="modal-detail-row">
            <span className="modal-detail-label">Phone:</span>
            <span className="modal-detail-val">{completedOrder.phone}</span>
          </div>
          <div className="modal-detail-row">
            <span className="modal-detail-label">Delivery Address:</span>
            <span className="modal-detail-val" style={{ textAlign: "right" }}>{completedOrder.address}</span>
          </div>
          <div className="modal-detail-row" style={{ borderTop: "1px dashed var(--border-color)", marginTop: 8, paddingTop: 8 }}>
            <span className="modal-detail-label">Total Amount:</span>
            <span className="modal-detail-val" style={{ color: "var(--primary-color)", fontSize: 15 }}>
              ৳{completedOrder.totalAmount} BDT (COD)
            </span>
          </div>
        </div>

        <button className="modal-btn" onClick={() => setOrderSuccess(false)}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
