// src/Economy.jsx
import React from "react";
import { Link } from "react-router-dom";

// --- Robust asset resolution for the logo: src/assets or public/src-assets ---
let logoUrl;
try {
  logoUrl = new URL("./assets/LogoSimple.jpg?url", import.meta.url).href; // src/assets
} catch {
  logoUrl = "/src-assets/LogoSimple.jpg"; // public/src-assets
}

export default function Economy() {
  const burntOrange = "#BF5700";

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        textAlign: "center",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      {/* Back to Home button */}
      <div style={{ marginBottom: "20px", textAlign: "left" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            backgroundColor: burntOrange,
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          ← Back to Home
        </Link>
      </div>

      {/* Title with Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <img
          src={logoUrl}
          alt="Logo"
          style={{ height: "60px", width: "60px", objectFit: "contain" }}
        />
        <h1 style={{ color: burntOrange, margin: 0 }}>Economic & Multi-Asset Research</h1>
      </div>

      {/* Real GDP Image (from public folder) */}
      <div style={{ marginBottom: "40px" }}>
        <img
          src="/Real_GDP.png"
          alt="Real GDP Chart"
          style={{
            maxWidth: "90%",
            height: "auto",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      {/* Placeholder for content */}
      <p style={{ fontSize: "18px", color: "#444" }}>
        Welcome to the Economic & Multi-Asset Research page. Insights and analysis will appear here.
      </p>
    </div>
  );
}
