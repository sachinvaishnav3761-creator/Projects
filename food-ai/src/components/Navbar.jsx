import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUtensils, FaHeart, FaShoppingCart, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/categories', label: 'Categories' },
  { to: '/ai-recommendation', label: 'AI Recommendation' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const close = () => setOpen(false);

  const handleLogout = () => {
    logout();
    close();
    navigate('/');
  };

  return (
    <nav className="site-nav py-2">
      <div className="container d-flex align-items-center justify-content-between flex-wrap">
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none" onClick={close}>
          <span className="logo-mark"><FaUtensils /></span>
          <span className="brand-font fs-4 fw-bold text-body">Food<span style={{ color: 'var(--green)' }}>AI</span></span>
        </Link>

        <div className="d-flex align-items-center gap-1 order-lg-3">
          <ThemeToggle />
          <Link to="/wishlist" className="icon-btn" aria-label="Wishlist" onClick={close}>
            <FaHeart />{wishCount > 0 && <span className="count">{wishCount}</span>}
          </Link>
          <Link to="/cart" className="icon-btn" aria-label="Cart" onClick={close}>
            <FaShoppingCart />{cartCount > 0 && <span className="count">{cartCount}</span>}
          </Link>
          <button type="button" className="btn icon-btn d-lg-none" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className={`${open ? 'd-block' : 'd-none'} d-lg-flex align-items-lg-center flex-grow-1 order-lg-2 w-100 w-lg-auto mt-3 mt-lg-0`}>
          <ul className="navbar-nav flex-lg-row mx-lg-auto gap-lg-1">
            {links.map((l) => (
              <li className="nav-item" key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className="nav-link" onClick={close}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0 me-lg-3 pb-2 pb-lg-0">
            {user ? (
              <>
                <span className="fw-bold small d-flex align-items-center gap-1"><FaUser /> {user.name.split(' ')[0]}</span>
                <button type="button" className="btn btn-outline-brand btn-sm px-3" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-brand btn-sm px-3" onClick={close}>Login</Link>
                <Link to="/register" className="btn btn-brand btn-sm px-3" onClick={close}>Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
