import { Link } from 'react-router-dom';
import { FaUtensils, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="site-footer pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="logo-mark"><FaUtensils /></span>
              <span className="brand-font fs-4 fw-bold text-white">FoodAI</span>
            </div>
            <p className="small">Tell our assistant what you are craving and get meals picked for your taste, budget and time of day.</p>
            <div className="d-flex gap-3 fs-5">
              <a href="#!" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#!" aria-label="Instagram"><FaInstagram /></a>
              <a href="#!" aria-label="Twitter"><FaTwitter /></a>
            </div>
          </div>
          <div className="col-6 col-lg-2 offset-lg-1">
            <h6 className="text-white">Explore</h6>
            <ul className="list-unstyled small d-grid gap-2">
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/ai-recommendation">AI Recommendation</Link></li>
            </ul>
          </div>
          <div className="col-6 col-lg-2">
            <h6 className="text-white">Account</h6>
            <ul className="list-unstyled small d-grid gap-2">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
          <div className="col-lg-3">
            <h6 className="text-white">Contact</h6>
            <p className="small mb-1">hello@foodai.example</p>
            <p className="small">Open daily, 9 AM to 11 PM</p>
          </div>
        </div>
        <hr className="border-secondary mt-4" />
        <p className="small text-center mb-0">© {new Date().getFullYear()} FoodAI. Demo project, no real orders are placed.</p>
      </div>
    </footer>
  );
}
