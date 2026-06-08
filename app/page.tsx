"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCart, BEST_SELLERS, JERSEYS } from "./CartContext";

export default function HomePage() {
  const { searchQuery, toggleWishlist, wishlist } = useCart();
  
  const slides = [
    {
      id: "general",
      title: "Everything You Need,",
      accentTitle: "All in One Place",
      subtitle: "Explore a wide range of products across multiple categories.",
      buttonText: "Shop Now",
      image: "/hero-banner2.avif",
      link: "#best-sellers-section",
      isJersey: false
    },
    {
      id: "jersey",
      title: "Premium Player Edition",
      accentTitle: "Football Jerseys",
      subtitle: "Get the latest high-quality Argentina and Brazil kits. 100% Thai quality, fast cash on delivery.",
      buttonText: "Shop Jersey Collection",
      image: "/hero-banner.avif",
      link: "/jersey",
      isJersey: true
    },
    {
      id: "seasonal",
      title: "Seasonal Sale,",
      accentTitle: "Up to 50% Off",
      subtitle: "Don't miss out on our exclusive seasonal discounts. Limited time offers on top brands.",
      buttonText: "Grab the Deals",
      image: "/hero-banner3.avif",
      link: "#best-sellers-section",
      isJersey: false
    }
  ];

  // Embla Carousel Setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  };

  // Categories list
  const categories = [
    { id: "electronics", name: "Electronics", path: "/#electronics", icon: "/icons/electronics.svg" },
    { id: "fashion", name: "Fashion", path: "/#fashion", icon: "/icons/fashion.svg" },
    { id: "home-living", name: "Home & Living", path: "/#home-living", icon: "/icons/home.svg" },
    { id: "beauty", name: "Beauty & Personal Care", path: "/#beauty", icon: "/icons/beauty.svg" },
    { id: "mobile", name: "Mobile & Accessories", path: "/#mobile", icon: "/icons/mobile.svg" },
    { id: "appliances", name: "Appliances", path: "/#appliances", icon: "/icons/appliance.svg" },
    { id: "toys", name: "Toys, Kids & Baby", path: "/#toys", icon: "/icons/toys.svg" },
    { id: "sports", name: "Sports & Outdoors", path: "/#sports", icon: "/icons/sports.svg" },
    { id: "books", name: "Books & Stationery", path: "/#books", icon: "/icons/books.svg" },
    { id: "automotive", name: "Automotive", path: "/#automotive", icon: "/icons/automotive.svg" }
  ];

  // Shop categories with custom PNG images
  const shopCategories = [
    { id: "electronics", name: "Electronics", path: "/#electronics", image: "/categories/electronics.png" },
    { id: "fashion", name: "Fashion", path: "/#fashion", image: "/categories/fashion.png" },
    { id: "home-living", name: "Home & Living", path: "/#home-living", image: "/categories/home.png" },
    { id: "beauty", name: "Beauty & Personal Care", path: "/#beauty", image: "/categories/beauty.png" },
    { id: "mobile", name: "Mobile & Accessories", path: "/#mobile", image: "/categories/mobile.png" },
    { id: "appliances", name: "Appliances", path: "/#appliances", image: "/categories/appliance.png" },
    { id: "toys", name: "Toys, Kids & Baby", path: "/#toys", image: "/categories/toys.png" },
    { id: "sports", name: "Sports & Outdoors", path: "/#sports", image: "/categories/sports.png" }
  ];

  // Best Sellers Products Data (includes both general best sellers and jersey kits)
  const bestSellers = useMemo(() => {
    const jerseyProducts = JERSEYS.map((j) => ({
      id: j.id,
      name: j.name,
      price: j.price,
      oldPrice: j.oldPrice,
      discount: j.oldPrice ? Math.round(((j.oldPrice - j.price) / j.oldPrice) * 100) : undefined,
      rating: 5,
      reviews: 120,
      image: j.images[0],
      category: "sports"
    }));
    return [...BEST_SELLERS, ...jerseyProducts];
  }, []);

  // Filter products based on navbar search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return bestSellers;
    return bestSellers.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, bestSellers]);

  return (
    <div className="homepage-root flex-grow">
      
      {/* Top Banner & Sidebar Layout Block */}
      <section className="hero-grid-section container">
        <div className="hero-grid-layout">
          
          {/* Left Sidebar Categories (Desktop Only) */}
          <aside className="categories-sidebar-desktop">
            <ul className="sidebar-categories-list">
              {categories.map((cat) => (
                <li key={cat.id} className="sidebar-cat-item">
                  <Link href={cat.path} className="sidebar-cat-link">
                    <div className="sidebar-cat-left">
                      <img src={cat.icon} alt="" className="sidebar-cat-icon" />
                      <span>{cat.name}</span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="chevron-right">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="sidebar-footer">
              <Link href="/#all-categories" className="view-all-cats-link">
                View All Categories
              </Link>
            </div>
          </aside>

          {/* Right Hero Slider Wrapper */}
          <div className="hero-slider-wrapper" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div className="hero-slider-container embla" ref={emblaRef}>
              <div className="embla__container">
                {slides.map((slide) => {
                  const isLinkRoute = slide.isJersey;
                  
                  return (
                    <div key={slide.id} className="embla__slide">
                      {isLinkRoute ? (
                        <Link href={slide.link} className="slide-banner-link">
                          <img src={slide.image} alt="Hero Banner" className="slide-banner-img" />
                        </Link>
                      ) : (
                        <a href={slide.link} className="slide-banner-link">
                          <img src={slide.image} alt="Hero Banner" className="slide-banner-img" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Slider Dots Indicator (Outside/Below Slider) */}
            <div className="slider-indicator-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`slider-indicator-dot ${index === selectedIndex ? "active" : ""}`}
                  title={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Feature Badges Section */}
      <section className="features-grid-row-wrapper container">
        <div className="features-grid-row">
          
          <div className="feature-row-item">
            <img src="/features-icons/wide.png" alt="Wide Range" className="feature-row-image" />
            <div className="feature-row-text">
              <h4>Wide Range</h4>
              <p>Millions of Products</p>
            </div>
          </div>

          <div className="feature-row-item">
            <img src="/features-icons/price.png" alt="Best Prices" className="feature-row-image" />
            <div className="feature-row-text">
              <h4>Best Prices</h4>
              <p>Unbeatable Deals</p>
            </div>
          </div>

          <div className="feature-row-item">
            <img src="/features-icons/fast-delivery.png" alt="Fast Delivery" className="feature-row-image" />
            <div className="feature-row-text">
              <h4>Fast Delivery</h4>
              <p>Across Bangladesh</p>
            </div>
          </div>

          <div className="feature-row-item">
            <img src="/features-icons/payment.png" alt="Secure Payment" className="feature-row-image" />
            <div className="feature-row-text">
              <h4>Secure Payment</h4>
              <p>100% Safe & Secure</p>
            </div>
          </div>

          <div className="feature-row-item desktop-only">
            <img src="/features-icons/return.png" alt="Easy Returns" className="feature-row-image" />
            <div className="feature-row-text">
              <h4>Easy Returns</h4>
              <p>Hassle-free Returns</p>
            </div>
          </div>

        </div>
      </section>

      {/* Shop By Category Section */}
      <section className="shop-by-category-section container" id="all-categories">
        <div className="section-header-row">
          <h2 className="homepage-section-title">Shop by Category</h2>
          <Link href="/#all-categories" className="homepage-view-all-link">View All</Link>
        </div>
        
        <div className="category-cards-grid">
          {shopCategories.map((cat) => (
            <Link key={cat.id} href={cat.path} className="category-card-item">
              <div className="category-card-image-wrapper">
                <img src={cat.image} alt={cat.name} className="category-card-img" />
              </div>
              <span className="category-card-title">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="best-sellers-grid-section container" id="best-sellers-section">
        <div className="section-header-row">
          <h2 className="homepage-section-title">Best Sellers</h2>
          <Link href="/#best-sellers-section" className="homepage-view-all-link">View All</Link>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="homepage-products-grid" id="products-container">
            {filteredProducts.map((product) => {
              const isFavorite = wishlist.includes(product.id);
              
              return (
                <div key={product.id} className="clean-product-card">
                  {/* Heart Favorite Icon */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="card-favorite-toggle-btn"
                    style={{ color: isFavorite ? "var(--error-color)" : "#ccc" }}
                    title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>

                  {/* Product Image Wrapper */}
                  <div className="clean-card-image-wrapper">
                    <img src={product.image} alt={product.name} className="clean-card-image" />
                  </div>

                  {/* Product Information - NO Buttons */}
                  <div className="clean-card-info">
                    <h3 className="clean-product-title">{product.name}</h3>
                    
                    {/* Price and Discount Row */}
                    <div className="clean-card-price-row">
                      <span className="clean-price-current">৳{product.price.toLocaleString()}</span>
                      {product.oldPrice && (
                        <>
                          <span className="clean-price-old">৳{product.oldPrice.toLocaleString()}</span>
                          <span className="clean-discount-tag">{product.discount}% off</span>
                        </>
                      )}
                    </div>

                    {/* Ratings Star Row */}
                    <div className="clean-card-rating-row">
                      <div className="stars-wrapper">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            width="14" height="14"
                            viewBox="0 0 24 24"
                            fill={i < product.rating ? "#ffc107" : "none"}
                            stroke="#ffc107"
                            strokeWidth="2"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        ))}
                      </div>
                      <span className="reviews-count-text">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="homepage-no-results">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <p>No products found matching your search.</p>
          </div>
        )}
      </section>

    </div>
  );
}
