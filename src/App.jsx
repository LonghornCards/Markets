// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./HomePage";
import Research from "./Research"; // renamed from Economy.jsx
import TexanInvestor from "./TexanInvestor"; // ✅ new page

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/research" element={<Research />} />
          <Route path="/texaninvestor" element={<TexanInvestor />} /> {/* ✅ new route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
