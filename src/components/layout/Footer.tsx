import React from "react"

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          
          <h1> Bloom & Grow</h1>
          <p>Your one-stop shop for all things plants!</p>
        </div>
        <div className="footer-links">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h2>Contact Us</h2>
          <p>Email: bloomandgrow@gmail.com</p>
          <p>Phone: +966 56 670 4640</p>
          <p>Address: 123 Plant Street, Green City, PG 12345</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Bloom & Grow. All rights reserved.</p>
      </div>
    </footer>
  )
}
export default Footer
