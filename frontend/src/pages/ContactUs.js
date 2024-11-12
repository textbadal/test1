// src/pages/ContactUs.js
import React from 'react';

const ContactUs = () => {
  return (
    <div className="container">
      <h1>Contact Us</h1>
      <p>If you have any questions or need further assistance, please reach out to us!</p>
      <form>
        <label>Name</label>
        <input type="text" placeholder="Your Name" />
        
        <label>Email</label>
        <input type="email" placeholder="Your Email" />

        <label>Message</label>
        <textarea placeholder="Your Message"></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
