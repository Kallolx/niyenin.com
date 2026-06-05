"use client";

import React, { useState } from "react";
import { Jersey, useCart } from "../CartContext";

interface ProductCardProps {
  jersey: Jersey;
}

export default function ProductCard({ jersey }: ProductCardProps) {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 0 = front, 1 = back
  const [selectedSize, setSelectedSize] = useState("");

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const isFavorite = wishlist.includes(jersey.id);

  return (
    <div className="product-card" id={jersey.id}>
      {/* Favorite Heart Badge */}
      <button
        onClick={() => toggleWishlist(jersey.id)}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          border: "none",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 4,
          boxShadow: "var(--shadow-sm)",
          color: isFavorite ? "var(--error-color)" : "var(--primary-color)",
          transition: "color var(--transition-fast)"
        }}
        title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>

      {/* Team Badge */}
      <span className={`team-badge ${jersey.badgeClass}`}>
        {jersey.team}
      </span>

      {/* Main Image Area */}
      <div className="card-media">
        <a href="#" className="card-img-link" onClick={(e) => { e.preventDefault(); setCurrentImageIndex((prev) => (prev + 1) % jersey.images.length); }}>
          {jersey.images.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`${jersey.name} View ${index + 1}`}
              className={`card-img ${currentImageIndex === index ? "active" : ""}`}
            />
          ))}
        </a>
      </div>

      {/* Card Body */}
      <div className="card-details">
        {/* Clickable Image Thumbnails */}
        <div className="card-thumbnails">
          {jersey.images.map((imgUrl, index) => (
            <button
              key={index}
              className={`thumbnail-btn ${currentImageIndex === index ? "active" : ""}`}
              onClick={() => setCurrentImageIndex(index)}
              title={`View ${index + 1}`}
            >
              <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="thumbnail-img" />
            </button>
          ))}
        </div>

        <h3 className="product-name">{jersey.name}</h3>
        <p className="product-type">{jersey.type}</p>

        <div className="price-row">
          <span className="price">৳{jersey.price} BDT</span>
          {jersey.oldPrice && (
            <span className="old-price">৳{jersey.oldPrice} BDT</span>
          )}
        </div>

        {/* Size Selection */}
        <div className="size-section">
          <h4 className="size-title">Select Size:</h4>
          <div className="sizes-grid">
            {sizes.map((size) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add To Cart Button */}
        <button
          className="add-to-cart-btn"
          onClick={() => {
            addToCart(jersey, selectedSize);
            if (selectedSize) {
              setSelectedSize("");
            }
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
