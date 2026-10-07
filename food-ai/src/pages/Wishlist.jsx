import { useWishlist } from '../context/WishlistContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import FoodCard from '../components/FoodCard.jsx';
import EmptyState from '../components/EmptyState.jsx';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return <div className="container py-4"><EmptyState emoji="💚" title="Your wishlist is empty" text="Tap the heart on any dish to save it for later." actionLabel="Explore menu" actionTo="/menu" /></div>;
  }

  const moveToCart = (id) => {
    addToCart(id);
    removeFromWishlist(id);
  };

  return (
    <div className="container py-4">
      <h1 className="page-title mb-4">Your Wishlist <small className="text-muted fs-6">({items.length} items)</small></h1>
      <div className="row g-4">
        {items.map((food) => (
          <div className="col-6 col-md-4 col-lg-3" key={food.id}>
            <div className="d-flex flex-column h-100 gap-2">
              <div className="flex-grow-1"><FoodCard food={food} /></div>
              <button type="button" className="btn btn-outline-brand" onClick={() => moveToCart(food.id)}>Move to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
