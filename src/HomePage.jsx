// src/HomePage.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Authenticator,
  useAuthenticator,
  View
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// --- Burnt-orange theme for Amplify Authenticator ---
const customTheme = {
  name: "BurntOrangeTheme",
  tokens: {
    colors: {
      brand: {
        10: "#FFF8F3",
        80: "#E66A00",
        90: "#D45F00",
        100: "#BF5700",
      },
    },
    space: { small: "0.5rem", medium: "1rem", large: "1.5rem" },
    radii: { small: "8px", medium: "10px", large: "14px" },
  },
};

// Robust asset resolution for the logo: src/assets or public/src-assets
let logoUrl;
try {
  logoUrl = new URL("./assets/LogoSimple.jpg?url", import.meta.url).href; // src/assets
} catch {
  logoUrl = "/src-assets/LogoSimple.jpg"; // public/src-assets
}

// Robust asset resolution for the profile image
let profileUrl;
try {
  profileUrl = new URL("./assets/Profile.jpeg?url", import.meta.url).href; // src/assets
} catch {
  profileUrl = "/src-assets/Profile.jpeg"; // public/src-assets
}

export default function HomePage() {
  const burntOrange = "#BF5700";
  const lightHighlight = "#FFF8F3";

  // Auth + modal state
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const [authOpen, setAuthOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);
  const modalRef = useRef(null);

  // Intercept protected nav
  const handleProtectedNav = (e, path) => {
    e.preventDefault();
    if (authStatus === "authenticated") {
      window.location.href = path; // or use react-router navigate
    } else {
      setPendingPath(path);
      setAuthOpen(true);
    }
  };

  // After sign-in
  const onAuthSuccess = () => {
    const target = pendingPath || "/";
    setAuthOpen(false);
    setPendingPath(null);
    window.location.href = target;
  };

  // Esc-to-close, body scroll lock, and robust outside-click
  useEffect(() => {
    if (!authOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") setAuthOpen(false);
    };
    const onDocPointerDown = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setAuthOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocPointerDown, true);
    document.addEventListener("touchstart", onDocPointerDown, true);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocPointerDown, true);
      document.removeEventListener("touchstart", onDocPointerDown, true);
      document.body.style.overflow = prevOverflow;
    };
  }, [authOpen]);

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
      {/* Navigation Menu (protected) */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "28px",
          marginBottom: "12px",
          flexWrap: "wrap",
        }}
      >
        {["Research"].map((item) => {
          const path = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <a
              key={item}
              href={path}
              onClick={(e) => handleProtectedNav(e, path)}
              style={{
                textDecoration: "none",
                color: burntOrange,
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
              aria-label={`${item} (sign-in required)`}
              title="Sign-in required"
            >
              {item}
            </a>
          );
        })}
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
          and technical signals. Apple is rounding out a cup-with-handle base 
          but lagging on a relative basis versus the S&amp;P 500 and overbought over the shorter term.
          Nonetheless the price action is very bullish with supportive volume.
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

        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <img
            src={profileUrl}
            alt="Kyle Smith Profile"
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              objectFit: "cover",
              border: `3px solid ${burntOrange}`,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              flexShrink: 0,
            }}
          />

          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, margin: 0, flex: 1 }}>
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
        </div>
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
          Services &amp; Research
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

      {/* ---------- AUTH MODAL (only shows when needed) ---------- */}
      {authOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Sign in"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 10000,
          }}
        >
          <div
            ref={modalRef}
            style={{
              position: "relative",
              background: "#fff",
              borderRadius: "12px",
              width: "min(520px, 95vw)",
              maxHeight: "90vh",
              overflow: "auto",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              border: `3px solid ${burntOrange}`,
            }}
          >
            {/* Close (X) button */}
            <button
              onClick={() => setAuthOpen(false)}
              aria-label="Close sign-in modal"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                border: "none",
                background: "transparent",
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: burntOrange,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ×
            </button>

            <View
              padding="1rem"
              backgroundColor="#FFF8F3"
              style={{ borderBottom: `1px solid ${burntOrange}33` }}
            >
              <h3 style={{ margin: 0, color: burntOrange }}>Sign in to continue</h3>
            </View>

            <div style={{ padding: "1rem" }}>
              <Authenticator
                hideSignUp={false}
                loginMechanisms={["email"]}
                socialProviders={[]}
                theme={customTheme}
              >
                {() => (
                  <View>
                    <p style={{ margin: "0.5rem 0 1rem 0" }}>
                      You’re signed in. Continue to your page.
                    </p>
                    <button
                      onClick={onAuthSuccess}
                      style={{
                        background: burntOrange,
                        border: "none",
                        color: "#fff",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Go
                    </button>
                  </View>
                )}
              </Authenticator>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
