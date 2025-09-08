// src/HomePage.jsx
import React from "react";

// Robust asset resolution for the logo: src/assets or public/src-assets
let logoUrl;
try {
  logoUrl = new URL("./assets/LogoSimple.jpg?url", import.meta.url).href; // src/assets
} catch {
  logoUrl = "/src-assets/LogoSimple.jpg"; // public/src-assets
}

export default function HomePage() {
  const burntOrange = "#BF5700";
  const lightHighlight = "#FFF8F3";

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        textAlign: "center",
        color: "#222",
        backgroundColor: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* Navigation Menu */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "28px",
          marginBottom: "12px",
          flexWrap: "wrap",
        }}
      >
        {["Economy", "Stocks", "Bonds", "Other"].map((item) => (
          <a
            key={item}
            href={`/${item.toLowerCase()}`}
            style={{
              textDecoration: "none",
              color: burntOrange,
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Header: logo + title */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          margin: "10px 0 28px 0",
          flexWrap: "wrap",
        }}
      >
        <img
          src={logoUrl}
          alt="Longhorn Research Logo"
          style={{ width: "80px", height: "80px", objectFit: "contain" }}
        />
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: burntOrange,
            margin: 0,
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Longhorn Research
        </h1>
      </header>

      {/* Tagline */}
      <p
        style={{
          fontSize: "1.1rem",
          maxWidth: "780px",
          margin: "0 auto 28px auto",
          lineHeight: "1.6",
        }}
      >
        Economic and market research across global markets delivered through clear{" "}
        <strong>commentaries</strong> and rigorous{" "}
        <strong>technical analysis</strong>.
      </p>

      {/* Chart of the Day */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto 28px auto",
          padding: "28px 22px",
          textAlign: "center",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 3px 8px rgba(0,0,0,0.06)",
          border: `3px solid ${burntOrange}`,
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            margin: "0 0 20px 0",
            color: burntOrange,
          }}
        >
          Chart of the Day
        </h2>
        <img
          src="/AAPL.png"
          alt="Chart of the Day - AAPL"
          style={{
            width: "100%",
            maxWidth: "800px",
            height: "auto",
            borderRadius: "6px",
            marginBottom: "18px",
            border: "1px solid #ddd",
          }}
        />
        <p
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.6,
            maxWidth: "750px",
            margin: "0 auto",
          }}
        >
          Today’s chart features Apple Inc. (AAPL), showcasing key price action
          and technical signals. This daily highlight is designed to provide
          timely context and insights for traders and long-term investors.
        </p>
      </section>

      {/* About */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto 28px auto",
          padding: "28px 22px",
          textAlign: "left",
          backgroundColor: lightHighlight,
          borderRadius: "10px",
          boxShadow: "0px 3px 8px rgba(0,0,0,0.06)",
          border: `1px solid ${burntOrange}22`,
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            margin: "0 0 12px 0",
            textAlign: "center",
            color: burntOrange,
          }}
        >
          About Us
        </h2>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, margin: 0 }}>
          <strong>Longhorn Research LLC</strong> provides independent economic
          and market research focused on clarity, discipline, and practical
          application. Led by <strong>Kyle Smith</strong>, a financial professional
          with over 20 years of experience at firms including{" "}
          <strong>BlackRock</strong>,{" "}
          <strong>Dimensional Fund Advisors</strong>, and{" "}
          <strong>Bank of America</strong>, our mission is to translate data and
          market structure into objective, actionable insights. We combine
          macroeconomic perspectives with technical depth to inform better
          portfolio and business decisions.
        </p>
      </section>

      {/* Services */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto 32px auto",
          padding: "28px 22px",
          textAlign: "left",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 3px 8px rgba(0,0,0,0.06)",
          border: `3px solid ${burntOrange}`,
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            margin: "0 0 12px 0",
            textAlign: "center",
            color: burntOrange,
          }}
        >
          Services & Research
        </h2>
        <ul
          style={{
            margin: "10px 0 0 18px",
            padding: 0,
            lineHeight: 1.8,
            fontSize: "1.05rem",
          }}
        >
          <li>
            <strong>Market Commentaries:</strong> timely perspectives on macro
            trends, policy, liquidity, sector dynamics, and cross-asset flows.
          </li>
          <li>
            <strong>Technical Analysis:</strong> trend, momentum, and breadth
            studies; relative strength and risk signals.
          </li>
          <li>
            <strong>Economic Research:</strong> cycle and inflation frameworks,
            growth/credit conditions, and scenario analysis.
          </li>
          <li>
            <strong>Custom Research:</strong> tailored notes, dashboards, and
            chart packs designed for investors, advisors, and businesses.
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: `2px solid ${burntOrange}`,
          marginTop: "16px",
          paddingTop: "12px",
          paddingBottom: "8px",
          color: "#444",
          fontSize: "0.95rem",
        }}
      >
        © {new Date().getFullYear()} Longhorn Research LLC
      </footer>
    </div>
  );
}
