import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import QuantityControl from './QuantityControl.jsx';
import FoodImage from './FoodImage.jsx';
import { useCart } from '../context/CartContext.jsx';
import { finalPrice, formatINR } from '../utils/helpers.js';

export default function CartItem({ line }) {
  const { updateQty, removeFromCart } = useCart();
  return (
    <div className="panel d-flex gap-3 align-items-center flex-wrap">
      <FoodImage src={line.image} alt={line.name} className="cart-thumb" />
      <div className="flex-grow-1" style={{ minWidth: 150 }}>
        <Link to={`/product/${line.id}`} className="fw-bold text-body text-decoration-none">{line.name}</Link>
        <div className="small text-muted">{line.category}</div>
        <div className="mt-1">
          <span className="fw-bold">{formatINR(finalPrice(line))}</span>
          {line.discount > 0 && <span className="old-price ms-2">{formatINR(line.price)}</span>}
        </div>
      </div>
      <QuantityControl value={line.qty} onChange={(q) => updateQty(line.id, q)} />
      <div className="fw-bold text-end" style={{ minWidth: 80 }}>{formatINR(finalPrice(line) * line.qty)}</div>
      <button type="button" className="btn btn-link text-danger p-1" onClick={() => removeFromCart(line.id)} aria-label={`Remove ${line.name}`}>
        <FaTrash />
      </button>
    </div>
  );
}
