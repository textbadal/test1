// src/App.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <h1>Tech & Terrain Learning</h1>
        </div>
        <div className="nav-links">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/about">About Us</Link>
          <Link className="nav-link" to="/courses">Courses</Link>
          <Link className="nav-link" to="/certificate-verification">Certificate Verification</Link>
          <Link className="nav-link" to="/contact">Contact Us</Link>
        </div>
      </nav>

      {/* Content Area */}
      <Outlet />
    </div>
  );
}

export default App;
