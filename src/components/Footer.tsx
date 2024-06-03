import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div>
          <h2 className="section-title">About Us</h2>
          <p>
            We specialize in delivering top-tier, branded apparel designed to
            elevate your style and enhance your satisfaction. Our curated
            selection prioritizes quality materials and cutting-edge design,
            ensuring each garment exceeds expectations and leaves you feeling
            confident and content.
          </p>
        </div>
        <div>
          <h2 className="section-title">Quick Links</h2>
          <ul className="link-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>{" "}
              {/* Add the 'to' prop with a valid path */}
            </li>
            <li>
              <Link to="/search">Categories</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="section-title">Follow Us</h2>
          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
        <div>
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-info">
            <p>Mumbai, India</p>
            <p>Mumbai 10001</p>
            <p>Email: info@ecommerce.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
      </div>
      <p className="footer-note">© 2024 Shresha. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
