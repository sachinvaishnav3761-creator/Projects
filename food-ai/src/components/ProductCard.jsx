import { Link } from 'react-router-dom';
import FoodImage from './FoodImage.jsx';
import Rating from './Rating.jsx';
import { finalPrice, formatINR } from '../utils/helpers.js';

// Compact horizontal card (best sellers, related products)
export default function ProductCard({ food, rank }) {
  return (
    <Link to={`/product/${food.id}`} className="mini-card">
      <FoodImage src={food.image} alt={food.name} />
      <div className="min-w-0">
        {rank && <small className="text-muted">#{rank} best seller</small>}
        <h6 className="mb-1 fw-bold">{food.name}</h6>
        <Rating value={food.rating} size={12} />
        <div className="mt-1">
          <span className="fw-bold">{formatINR(finalPrice(food))}</span>
          {food.discount > 0 && <span className="old-price ms-2">{formatINR(food.price)}</span>}
        </div>
      </div>
    </Link>
  );
}
