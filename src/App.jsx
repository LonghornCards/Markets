// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./HomePage";
import Research from "./Research";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/research" element={<Research />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
