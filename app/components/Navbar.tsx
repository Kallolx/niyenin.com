"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../CartContext";

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    path: "/#electronics",
    icon: "/icons/electronics.svg",
  },
  {
    id: "fashion",
    name: "Fashion",
    path: "/#fashion",
    icon: "/icons/fashion.svg",
  },
  {
    id: "home-living",
    name: "Home & Living",
    path: "/#home-living",
    icon: "/icons/home.svg",
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    path: "/#beauty",
    icon: "/icons/beauty.svg",
  },
  {
    id: "mobile",
    name: "Mobile & Accessories",
    path: "/#mobile",
    icon: "/icons/mobile.svg",
  },
  {
    id: "appliances",
    name: "Appliances",
    path: "/#appliances",
    icon: "/icons/appliance.svg",
  },
  {
    id: "toys",
    name: "Toys, Kids & Baby",
    path: "/#toys",
    icon: "/icons/toys.svg",
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    path: "/#sports",
    icon: "/icons/sports.svg",
  },
  {
    id: "books",
    name: "Books & Stationery",
    path: "/#books",
    icon: "/icons/books.svg",
  },
  {
    id: "automotive",
    name: "Automotive",
    path: "/#automotive",
    icon: "/icons/automotive.svg",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const {
    searchQuery,
    setSearchQuery,
    wishlist,
    totalCartItems,
    subtotal,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAccountOpen,
  } = useCart();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activeTab, setActiveTab] = useState(() => {
    if (pathname === "/jersey") return "jersey";
    return "home";
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Sync active tab on pathname changes
  useEffect(() => {
    if (pathname === "/jersey") {
      setActiveTab("jersey");
    } else {
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (hash === "#best-sellers-section") setActiveTab("best-sellers");
      else if (hash === "#new-arrivals") setActiveTab("new-arrivals");
      else if (hash === "#deals") setActiveTab("deals");
      else if (hash === "#top-brands") setActiveTab("top-brands");
      else if (hash === "#track-order") setActiveTab("track-order");
      else if (hash === "#customer-support") setActiveTab("customer-support");
      else setActiveTab("home");
    }
  }, [pathname]);

  // Recalculate underline position when active tab changes
  useEffect(() => {
    if (containerRef.current) {
      const timer = setTimeout(() => {
        const activeEl = containerRef.current?.querySelector(
          ".sub-nav-link.active",
        ) as HTMLElement;
        if (activeEl) {
          setUnderlineStyle({
            left: activeEl.offsetLeft,
            width: activeEl.clientWidth,
            opacity: 1,
          });
        } else {
          setUnderlineStyle((prev) => ({ ...prev, opacity: 0 }));
        }
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  // Scroll restoration on path change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (!hash) {
        window.scrollTo(0, 0);
      } else {
        const timer = setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  const handleNavLinkClick = (href: string, tabName: string) => {
    setActiveTab(tabName);
    setIsMobileMenuOpen(false);
    
    if (typeof window !== "undefined") {
      if (href === "/") {
        if (pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else if (href.startsWith("/#") || href.startsWith("#")) {
        const hash = href.substring(href.indexOf("#") + 1);
        if (pathname === "/") {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);

    // If we have a products section or search results, smooth scroll to it
    const element =
      document.getElementById("products-container") ||
      document.getElementById("best-sellers-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchChange = (val: string) => {
    setLocalSearch(val);
    // Realtime search for quick filtering
    setSearchQuery(val);
  };

  return (
    <>
      <header className="navbar-wrapper">
        {/* Main Desktop Header */}
        <div className="navbar-main">
          <div className="container navbar-container">
            {/* Logo */}
            <Link href="/" className="logo-link">
              <img src="/logo.png" alt="Niyenin Logo" className="logo-img" />
            </Link>

            {/* Search Bar - Desktop */}
            <form
              onSubmit={handleSearchSubmit}
              className="search-bar-container"
            >
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="search-input-field"
                value={localSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <button type="submit" className="search-submit-btn">
                Search
              </button>
            </form>

            {/* Actions (Account, Wishlist, Cart, Price Pill) */}
            <div className="nav-actions">
              {/* Account */}
              <button
                className="icon-btn"
                onClick={() => setIsAccountOpen(true)}
                title="My Account"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>

              {/* Wishlist */}
              <button
                className="icon-btn"
                onClick={() => setIsWishlistOpen(true)}
                title="Wishlist"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill={wishlist.length > 0 ? "var(--error-color)" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                {wishlist.length > 0 && (
                  <span className="badge">{wishlist.length}</span>
                )}
              </button>

              {/* Cart */}
              <button
                className="icon-btn"
                onClick={() => setIsCartOpen(true)}
                title="Shopping Cart"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {totalCartItems > 0 && (
                  <span className="badge">{totalCartItems}</span>
                )}
              </button>

              {/* Price Pill */}
              <div
                className="price-pill"
                onClick={() => setIsCartOpen(true)}
                title="View Cart Subtotal"
              >
                ৳{subtotal.toFixed(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Header Navigation Tabs Bar (Desktop Only) */}
        <div className="navbar-sub">
          <div className="container navbar-sub-container">
            {/* All Categories Dropdown/Button */}
            <div className="categories-menu-trigger">
              <div className="categories-trigger-btn">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <span>All Categories</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    marginLeft: "auto",
                    transition: "transform var(--transition-fast)",
                  }}
                  className="chevron-icon"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {/* Hover Dropdown for pages OTHER than Home page */}
              {pathname !== "/" && (
                <div className="categories-dropdown-menu">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={cat.path}
                      className="category-menu-item"
                    >
                      <img
                        src={cat.icon}
                        alt=""
                        className="category-menu-item-icon"
                      />
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav
              className="sub-nav-links"
              ref={containerRef}
              style={{ position: "relative" }}
            >
              <Link
                href="/"
                className={`sub-nav-link ${activeTab === "home" ? "active" : ""}`}
                onClick={() => handleNavLinkClick("/", "home")}
              >
                Home
              </Link>
              <Link
                href="/jersey"
                className={`sub-nav-link ${activeTab === "jersey" ? "active" : ""}`}
                style={{ color: "var(--accent-hover)", fontWeight: 700 }}
                onClick={() => handleNavLinkClick("/jersey", "jersey")}
              >
                Jersey Store
              </Link>
              <Link
                href="/#best-sellers-section"
                className={`sub-nav-link ${activeTab === "best-sellers" ? "active" : ""}`}
                onClick={() => handleNavLinkClick("/#best-sellers-section", "best-sellers")}
              >
                Best Sellers
              </Link>
              <Link
                href="/#new-arrivals"
                className={`sub-nav-link ${activeTab === "new-arrivals" ? "active" : ""}`}
                onClick={() => handleNavLinkClick("/#new-arrivals", "new-arrivals")}
              >
                New Arrivals
              </Link>
              <Link
                href="/#deals"
                className={`sub-nav-link ${activeTab === "deals" ? "active" : ""}`}
                onClick={() => handleNavLinkClick("/#deals", "deals")}
              >
                Deals
              </Link>
              <Link
                href="/#top-brands"
                className={`sub-nav-link ${activeTab === "top-brands" ? "active" : ""}`}
                onClick={() => handleNavLinkClick("/#top-brands", "top-brands")}
              >
                Top Brands
              </Link>
              <Link
                href="/#track-order"
                className={`sub-nav-link ${activeTab === "track-order" ? "active" : ""}`}
                onClick={() => handleNavLinkClick("/#track-order", "track-order")}
              >
                Track Order
              </Link>
              <Link
                href="/#customer-support"
                className={`sub-nav-link ${activeTab === "customer-support" ? "active" : ""}`}
                onClick={() => handleNavLinkClick("/#customer-support", "customer-support")}
              >
                Customer Support
              </Link>

              {/* Sliding animated underline bar */}
              <div
                className="sub-nav-underline-bar"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: underlineStyle.left,
                  width: underlineStyle.width,
                  opacity: underlineStyle.opacity,
                  height: "2.5px",
                  backgroundColor: "#1a73e8",
                  borderRadius: "10px",
                  transition:
                    "left 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), width 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.2s ease",
                  pointerEvents: "none",
                }}
              />
            </nav>
          </div>
        </div>

        {/* Mobile Header Layout */}
        <div className="navbar-mobile">
          <div className="mobile-header-top">
            <div className="mobile-header-left">
              <button
                className="mobile-menu-toggle-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>

              <Link href="/" className="logo-link">
                <img src="/logo.png" alt="Niyenin Logo" className="logo-img" />
              </Link>
            </div>

            <div className="mobile-header-actions">
              <button
                className="mobile-action-btn"
                onClick={() => setIsAccountOpen(true)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
              <button
                className="mobile-action-btn"
                onClick={() => setIsWishlistOpen(true)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={wishlist.length > 0 ? "var(--error-color)" : "none"}
                  stroke={
                    wishlist.length > 0 ? "var(--error-color)" : "currentColor"
                  }
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                {wishlist.length > 0 && (
                  <span className="mobile-badge-count">{wishlist.length}</span>
                )}
              </button>
              <button
                className="mobile-action-btn"
                onClick={() => setIsCartOpen(true)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {totalCartItems > 0 && (
                  <span className="mobile-badge-count">{totalCartItems}</span>
                )}
              </button>
            </div>
          </div>

          <div className="mobile-search-bar-row">
            <form onSubmit={handleSearchSubmit} className="mobile-search-form">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="mobile-search-input"
                value={localSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="mobile-search-icon"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Drawer/Sidebar for menu items */}
      <div
        className={`drawer-backdrop ${isMobileMenuOpen ? "open" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div className={`drawer-mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <div className="mobile-menu-logo-container">
            <img
              src="/logo.png"
              alt="Niyenin Logo"
              className="mobile-menu-logo"
            />
          </div>
          <button
            className="close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="mobile-menu-body">
          <div className="mobile-menu-section">
            <h4 className="section-title-sm">Shop Sections</h4>
            <div className="mobile-menu-list">
              <div className="mobile-menu-item">
                <Link
                  href="/"
                  className="mobile-menu-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="mobile-menu-left">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="mobile-menu-icon-svg"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span>Home Page</span>
                  </div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Link>
              </div>

              <div className="mobile-menu-item">
                <Link
                  href="/jersey"
                  className="mobile-menu-link jersey-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="mobile-menu-left">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="mobile-menu-icon-svg"
                      style={{ color: "var(--accent-hover)" }}
                    >
                      <path d="M20.38 3.46L16 2a4 4 0 0 0-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l1.5 9a2 2 0 0 0 2 1.67H7v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4h1.22a2 2 0 0 0 2-1.67l1.5-9a2 2 0 0 0-1.34-2.23z"></path>
                    </svg>
                    <span
                      style={{ color: "var(--accent-hover)", fontWeight: 700 }}
                    >
                      Jersey Store
                    </span>
                  </div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="chevron-right"
                    style={{ color: "var(--accent-hover)" }}
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Link>
              </div>

              <div className="mobile-menu-item">
                <Link
                  href="/#best-sellers-section"
                  className="mobile-menu-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="mobile-menu-left">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="mobile-menu-icon-svg"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>Best Sellers</span>
                  </div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Link>
              </div>

              <div className="mobile-menu-item">
                <Link
                  href="/#new-arrivals"
                  className="mobile-menu-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="mobile-menu-left">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="mobile-menu-icon-svg"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>New Arrivals</span>
                  </div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Link>
              </div>

              <div className="mobile-menu-item">
                <Link
                  href="/#deals"
                  className="mobile-menu-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="mobile-menu-left">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="mobile-menu-icon-svg"
                    >
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                      <line x1="7" y1="7" x2="7.01" y2="7"></line>
                    </svg>
                    <span>Hot Deals</span>
                  </div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="mobile-menu-section">
            <h4 className="section-title-sm">All Categories</h4>
            <div className="mobile-menu-list">
              {categories.map((cat) => (
                <div key={cat.id} className="mobile-menu-item">
                  <Link
                    href={cat.path}
                    className="mobile-menu-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="mobile-menu-left">
                      <img src={cat.icon} alt="" className="mobile-menu-icon" />
                      <span>{cat.name}</span>
                    </div>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="chevron-right"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mobile-menu-section">
            <h4 className="section-title-sm">Information</h4>
            <div className="mobile-menu-list">
              <div className="mobile-menu-item">
                <Link
                  href="/#track-order"
                  className="mobile-menu-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="mobile-menu-left">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="mobile-menu-icon-svg"
                    >
                      <rect x="1" y="3" width="15" height="13"></rect>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                    <span>Track My Order</span>
                  </div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Link>
              </div>

              <div className="mobile-menu-item">
                <Link
                  href="/#customer-support"
                  className="mobile-menu-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="mobile-menu-left">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="mobile-menu-icon-svg"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>Customer Support</span>
                  </div>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="mobile-bottom-nav">
        <Link
          href="/"
          className={`bottom-nav-item ${pathname === "/" ? "active" : ""}`}
          onClick={() => handleNavLinkClick("/", "home")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Home</span>
        </Link>
        <button
          className="bottom-nav-item"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>Categories</span>
        </button>
        <Link
          href="/#deals"
          className="bottom-nav-item"
          onClick={() => handleNavLinkClick("/#deals", "deals")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
            <line x1="7" y1="7" x2="7.01" y2="7"></line>
          </svg>
          <span>Deals</span>
        </Link>
        <Link
          href="/#track-order"
          className="bottom-nav-item"
          onClick={() => handleNavLinkClick("/#track-order", "track-order")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span>Orders</span>
        </Link>
        <button
          className="bottom-nav-item"
          onClick={() => setIsAccountOpen(true)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Account</span>
        </button>
      </div>
    </>
  );
}
