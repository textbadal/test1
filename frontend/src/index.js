import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App'; // Import App component
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Courses from './pages/Courses';
import CertificateVerification from './pages/CertificateVerification';
import ContactUs from './pages/ContactUs';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="courses" element={<Courses />} />
        <Route path="certificate-verification" element={<CertificateVerification />} />
        <Route path="contact" element={<ContactUs />} />
      </Route>
    </Routes>
  </Router>
);
