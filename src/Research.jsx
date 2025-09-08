// src/Research.jsx
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./assets/LogoSimple.jpg"; // ✅ import logo from src-assets

export default function Research() {
  // Image modal state (pixel-accurate zoom)
  const [enlarged, setEnlarged] = useState(null); // { src, naturalWidth, naturalHeight }
  const [zoom, setZoom] = useState(1);
  const viewportRef = useRef(null);

  // PDF modal state
  const [pdfSrc, setPdfSrc] = useState(null);

  // TOC (dropdown) state
  const containerRef = useRef(null);
  const [toc, setToc] = useState([]); // [{ id, title }]
  const [filter, setFilter] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Close with ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setEnlarged(null);
        setPdfSrc(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // When a new image opens, start at Fit
  useLayoutEffect(() => {
    if (!enlarged || !viewportRef.current) return;
    const vw = viewportRef.current.clientWidth;
    const vh = viewportRef.current.clientHeight;
    const fitZ = Math.min(
      vw / enlarged.naturalWidth,
      vh / enlarged.naturalHeight,
      1
    );
    setZoom(fitZ > 0 ? +fitZ.toFixed(3) : 1);
    requestAnimationFrame(() => {
      const wrap = viewportRef.current?.firstChild;
      if (wrap) {
        viewportRef.current.scrollLeft = (wrap.scrollWidth - vw) / 2;
        viewportRef.current.scrollTop = (wrap.scrollHeight - vh) / 2;
      }
    });
  }, [enlarged]);

  // Build TOC from article h2s (assign IDs if missing)
  useEffect(() => {
    if (!containerRef.current) return;
    const headings = Array.from(
      containerRef.current.querySelectorAll("article h2")
    );

    const seen = new Set();
    const safeSlug = (text) => {
      const base =
        (text || "")
          .toLowerCase()
          .replace(/["“”]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
          .slice(0, 80) || "post";
      let s = base;
      let n = 2;
      while (seen.has(s)) {
        s = `${base}-${n++}`;
      }
      seen.add(s);
      return s;
    };

    const built = headings.map((h) => {
      if (!h.id) h.id = safeSlug(h.textContent || "post");
      return { id: h.id, title: h.textContent || h.id };
    });

    setToc(built);

    // If URL already has a hash, scroll to it (deep link support)
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setSelectedId(id);
      }
    }
  }, [location.hash]);

  // Styles
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    color: "#222",
  };

  const topNav = {
    textAlign: "left",
    marginBottom: "20px",
  };

  const homeBtn = {
    background: "#BF5700",
    color: "white",
    padding: "8px 14px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: "bold",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    gap: "15px",
  };

  const logoStyle = { width: 60, height: 60, borderRadius: 8 };

  // Sticky toolbar for dropdown + filter
  const toolbar = {
    position: "sticky",
    top: 8,
    zIndex: 10,
    background: "white",
    border: "1px solid #eee",
    borderRadius: 10,
    padding: "10px 12px",
    marginBottom: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  };

  const toolbarRow = {
    display: "grid",
    gridTemplateColumns: "1fr 2fr auto",
    gap: 10,
    alignItems: "center",
  };

  const labelStyle = { fontWeight: 600, color: "#555" };

  const selectStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none",
  };

  const goBtn = {
    background: "#BF5700",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

  const entryStyle = {
    borderBottom: "1px solid #ccc",
    paddingBottom: "20px",
    marginBottom: "20px",
    textAlign: "left",
  };

  const imgStyle = {
    maxWidth: "100%",
    height: "auto",
    marginTop: "10px",
    borderRadius: "8px",
    cursor: "zoom-in",
  };

  const actionsRow = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: 10,
    flexWrap: "wrap",
  };

  const openBtn = {
    background: "#BF5700",
    color: "white",
    border: "none",
    borderRadius: 8,
    padding: "8px 12px",
    fontWeight: 600,
    cursor: "pointer",
  };

  const linkBtn = {
    color: "#BF5700",
    fontWeight: 600,
    textDecoration: "underline",
  };

  const modalOverlay = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 16,
  };

  const viewportStyle = {
    backgroundColor: "transparent",
    width: "95vw",
    height: "90vh",
    overflow: "auto",
    display: "block",
    borderRadius: 10,
    boxShadow: "0 0 15px rgba(0,0,0,0.5)",
  };

  const controls = {
    position: "fixed",
    top: 16,
    right: 16,
    display: "flex",
    gap: 8,
    zIndex: 1001,
  };

  const btn = {
    background: "white",
    border: "none",
    borderRadius: 8,
    padding: "8px 10px",
    fontWeight: "600",
    cursor: "pointer",
  };

  const closeBtn = {
    ...btn,
    background: "#ffefe8",
    color: "#BF5700",
  };

  // Handlers
  const stopOverlayClick = (e) => e.stopPropagation();

  // Image zoom handlers
  const handleWheelZoom = (e) => {
    if (!enlarged) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => Math.max(0.05, Math.min(8, +(z + delta).toFixed(3))));
  };

  const setFit = () => {
    if (!enlarged || !viewportRef.current) return;
    const vw = viewportRef.current.clientWidth;
    const vh = viewportRef.current.clientHeight;
    const fitZ = Math.min(
      vw / enlarged.naturalWidth,
      vh / enlarged.naturalHeight,
      1
    );
    setZoom(+fitZ.toFixed(3));
  };

  const setHundred = () => setZoom(1); // 100% = pixel-perfect 1:1
  const zoomIn = () => setZoom((z) => Math.min(8, +(z + 0.25).toFixed(3)));
  const zoomOut = () => setZoom((z) => Math.max(0.05, +(z - 0.25).toFixed(3)));

  const openImage = (src) => {
    const img = new Image();
    img.onload = () => {
      setEnlarged({
        src,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      });
    };
    img.src = src;
  };

  const openPdf = (src) => setPdfSrc(src);

  // Dropdown behavior
  const filteredToc = toc.filter((t) =>
    t.title.toLowerCase().includes(filter.toLowerCase())
  );

  const jumpTo = (id) => {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setSelectedId(id);
      // Update hash (deep-link)
      navigate(`#${id}`, { replace: true });
    }
  };

  return (
    <div style={containerStyle} ref={containerRef}>
      {/* 🔝 Return to Home at the very top */}
      <div style={topNav}>
        <Link to="/" style={homeBtn}>
          ⬅ Return to Home
        </Link>
      </div>

      {/* Header with Logo + Title */}
      <header style={headerStyle}>
        <img src={logo} alt="Longhorn Cards Logo" style={logoStyle} />
        <h1 style={{ color: "#BF5700" }}>
          Longhorn Research: Economic & Multi-Asset Research
        </h1>
      </header>

      {/* 🔎 Sticky "Jump to post" toolbar */}
      <div style={toolbar} aria-label="Research post navigator">
        <div style={toolbarRow}>
          <label htmlFor="post-filter" style={labelStyle}>
            Filter posts
          </label>
          <input
            id="post-filter"
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Type to filter by title…"
            style={inputStyle}
          />
          <span />
        </div>
        <div style={{ ...toolbarRow, marginTop: 10 }}>
          <label htmlFor="post-select" style={labelStyle}>
            Jump to post
          </label>
          <select
            id="post-select"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            style={selectStyle}
          >
            <option value="">— Select a post —</option>
            {filteredToc.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
          <button style={goBtn} onClick={() => jumpTo(selectedId)}>
            Go
          </button>
        </div>
      </div>

      {/* ------------------ YOUR RESEARCH POSTS BELOW ------------------ */}
      {/* You can paste the same <article> entries you used in Blog.jsx or add new ones specific to Research. */}
      {/* Example placeholder entry: */}
      <article style={entryStyle}>
        <h2 style={{ color: "#BF5700" }}>US Real GDP (September 2025)</h2>
        <p>
          US Real GDP has been resilient but in a weakening trend, with the risk of rolling over.
        </p>
        <p>
          The MACD can be a useful indicator for showing the degree to which the trend has weakened versus
          previous time periods where economic growth had also moderated.
        </p>
        <img
          src="/Real_GDP.png"
          alt="Real_GDP"
          style={imgStyle}
          onClick={() => openImage("/Real_GDP.png")}
        />
        <div style={actionsRow}>
          <button style={openBtn} onClick={() => openPdf("/Real_GDP.pdf")}>
            View PDF
          </button>
          <a style={linkBtn} href="/Real_GDP.pdf" download>
            Download PDF
          </a>
          <a style={linkBtn} href="/Real_GDP.png" download>
            Download Image
          </a>
        </div>
      </article>

      {/* Back to Home */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link to="/" style={{ color: "#BF5700", fontWeight: "bold" }}>
          ⬅ Back to Home
        </Link>
      </div>

      {/* IMAGE MODAL */}
      {enlarged && (
        <div
          style={modalOverlay}
          onClick={() => setEnlarged(null)}
          onWheel={handleWheelZoom}
        >
          <div style={controls} onClick={stopOverlayClick}>
            <button style={btn} onClick={zoomOut}>
              −
            </button>
            <button style={btn} onClick={zoomIn}>
              +
            </button>
            <button style={btn} onClick={setFit}>
              Fit
            </button>
            <button style={btn} onClick={setHundred}>
              100%
            </button>
            <button style={closeBtn} onClick={() => setEnlarged(null)}>
              Close
            </button>
          </div>

          <div
            ref={viewportRef}
            style={{ ...viewportStyle }}
            onClick={stopOverlayClick}
            title="Scroll to zoom, drag scrollbars to pan"
          >
            <div
              style={{
                minWidth: Math.max(enlarged.naturalWidth * zoom, 1),
                minHeight: Math.max(enlarged.naturalHeight * zoom, 1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={enlarged.src}
                alt="Enlarged view"
                style={{
                  display: "block",
                  width: enlarged.naturalWidth * zoom,
                  height: enlarged.naturalHeight * zoom,
                  maxWidth: "none",
                  maxHeight: "none",
                  borderRadius: 10,
                  boxShadow: "0 0 15px rgba(0,0,0,0.5)",
                  cursor: zoom > 0.99 ? "grab" : "zoom-out",
                  imageRendering: "auto",
                }}
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}

      {/* PDF MODAL */}
      {pdfSrc && (
        <div style={modalOverlay} onClick={() => setPdfSrc(null)}>
          <div style={controls} onClick={stopOverlayClick}>
            <a style={btn} href={pdfSrc} target="_blank" rel="noreferrer">
              Open in New Tab
            </a>
            <a style={btn} href={pdfSrc} download>
              Download
            </a>
            <button style={closeBtn} onClick={() => setPdfSrc(null)}>
              Close
            </button>
          </div>

          <div
            style={{ ...viewportStyle, overflow: "hidden" }}
            onClick={stopOverlayClick}
            title="Use the viewer toolbar to zoom/search; or open in a new tab."
          >
            <embed
              src={pdfSrc}
              type="application/pdf"
              width="100%"
              height="100%"
              style={{ borderRadius: 10, display: "block" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
