import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function WishlistButton({ id, className = '' }) {
  const { isWished, toggleWishlist } = useWishlist();
  const active = isWished(id);
  return (
    <button
      type="button"
      className={`wish-btn ${active ? 'active' : ''} ${className}`}
      onClick={() => toggleWishlist(id)}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={active}
    >
      {active ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}
