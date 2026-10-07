import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import CartItem from '../components/CartItem.jsx';
import EmptyState from '../components/EmptyState.jsx';
import OrderSummary from '../components/OrderSummary.jsx';

export default function Cart() {
  const { lines, totals, clearCart } = useCart();

  if (lines.length === 0) {
    return <div className="container py-4"><EmptyState emoji="🛒" title="Your cart is empty" text="Add a few dishes and they will show up here." actionLabel="Browse menu" actionTo="/menu" /></div>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="page-title mb-0">Your Cart</h1>
        <button type="button" className="btn btn-link text-danger" onClick={clearCart}>Clear cart</button>
      </div>
      <div className="row g-4">
        <div className="col-lg-8 d-grid gap-3 align-content-start">
          {lines.map((line) => <CartItem key={line.id} line={line} />)}
        </div>
        <div className="col-lg-4">
          <div className="sticky-panel">
            <OrderSummary totals={totals} />
            <Link to="/checkout" className="btn btn-brand btn-lg w-100 mt-3">Proceed to Checkout</Link>
            <Link to="/menu" className="btn btn-link w-100 mt-1">Continue shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
