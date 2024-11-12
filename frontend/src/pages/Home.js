// src/pages/Home.js
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Our E-Learning Platform</h1>
        <p>Empowering you to learn new skills anytime, anywhere.</p>
        <button className="cta-button">Explore Courses</button>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>Why Choose Us?</h2>
        <p>Our platform provides a comprehensive range of courses designed to help you achieve your learning goals.</p>
      </section>

      {/* Courses Section */}
      <section className="courses">
        <h2>Popular Courses</h2>
        <div className="course-list">
          <div className="course-item">
            <h3>Web Development</h3>
            <p>Learn how to build modern websites and web applications.</p>
          </div>
          <div className="course-item">
            <h3>Data Science</h3>
            <p>Master data analysis, machine learning, and AI techniques.</p>
          </div>
          <div className="course-item">
            <h3>Digital Marketing</h3>
            <p>Boost your marketing skills with SEO, social media, and analytics.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="call-to-action">
        <h2>Start Learning Today</h2>
        <p>Join thousands of learners around the world and upgrade your skills.</p>
        <button className="cta-button">Sign Up Now</button>
      </section>
    </div>
  );
};

export default Home;
