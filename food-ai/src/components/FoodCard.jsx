import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useCart } from '../context/CartContext.jsx';
import WishlistButton from './WishlistButton.jsx';
import FoodImage from './FoodImage.jsx';
import { finalPrice, formatINR } from '../utils/helpers.js';

export default function FoodCard({ food, badge }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(food.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="card food-card h-100">
      <div className="position-relative img-wrap">
        <Link to={`/product/${food.id}`}>
          <FoodImage src={food.image} alt={food.name} className="food-img" />
        </Link>
        <WishlistButton id={food.id} className="position-absolute top-0 end-0 m-2" />
        <span className="rating-pill position-absolute bottom-0 start-0 m-2"><FaStar size={12} /> {food.rating}</span>
        {badge && <span className="match-pill position-absolute top-0 start-0 m-2">{badge}</span>}
      </div>
      <div className="card-body d-flex flex-column p-3">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <h5 className="h6 mb-1 fw-bold"><Link to={`/product/${food.id}`} className="text-decoration-none text-body">{food.name}</Link></h5>
          <span className={`veg-dot ${food.isVeg ? '' : 'non'} mt-1`} title={food.isVeg ? 'Vegetarian' : 'Non-vegetarian'} />
        </div>
        <small className="text-muted mb-1">{food.category}</small>
        <p className="small text-muted line-clamp-2 mb-2">{food.description}</p>
        <div className="mt-auto">
          <div className="d-flex align-items-baseline gap-2 flex-wrap mb-2">
            <span className="price">{formatINR(finalPrice(food))}</span>
            {food.discount > 0 && (
              <>
                <span className="old-price">{formatINR(food.price)}</span>
                <span className="off-tag">{food.discount}% OFF</span>
              </>
            )}
          </div>
          <button type="button" className="btn btn-brand w-100 py-2" onClick={handleAdd}>
            {added ? <><FaCheck className="me-2" />Added</> : <><FaShoppingCart className="me-2" />Add to Cart</>}
          </button>
        </div>
      </div>
    </div>
  );
}
