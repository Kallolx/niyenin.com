"use client";

import React, { useMemo } from "react";
import { useCart, JERSEYS } from "../CartContext";
import ProductCard from "../components/ProductCard";

export default function JerseyPage() {
  const { searchQuery } = useCart();

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
          <img src="/hero-banner.avif" alt="Niyenin Sports Cover" className="hero-banner-img" />
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
    </>
  );
}
