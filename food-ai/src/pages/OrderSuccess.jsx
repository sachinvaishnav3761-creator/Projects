import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import EmptyState from '../components/EmptyState.jsx';
import { finalPrice, formatINR } from '../utils/helpers.js';

const paymentLabels = { cod: 'Cash on Delivery', upi: 'UPI', card: 'Card' };

export default function OrderSuccess() {
  let order = null;
  try {
    order = JSON.parse(localStorage.getItem('foodai_last_order'));
  } catch {
    order = null;
  }

  if (!order) {
    return <div className="container py-4"><EmptyState emoji="📦" title="No recent order" text="Place an order and your confirmation will appear here." actionLabel="Browse menu" actionTo="/menu" /></div>;
  }

  return (
    <div className="container py-5">
      <div className="panel mx-auto p-4 p-md-5" style={{ maxWidth: 620 }}>
        <div className="text-center mb-4">
          <FaCheckCircle size={64} className="text-success mb-3" />
          <h1 className="h2 fw-bold">Order placed!</h1>
          <p className="text-muted mb-0">Thanks, {order.customer.name.split(' ')[0]}. Your food will arrive in about 30-40 minutes.</p>
        </div>
        <div className="bg-body-secondary rounded-3 p-3 mb-3 small">
          <div><strong>Order ID:</strong> {order.id}</div>
          <div><strong>Deliver to:</strong> {order.customer.address}</div>
          <div><strong>Payment:</strong> {paymentLabels[order.payment]}</div>
        </div>
        {order.lines.map((l) => (
          <div key={l.id} className="d-flex justify-content-between mb-1">
            <span>{l.name} × {l.qty}</span><span>{formatINR(finalPrice(l) * l.qty)}</span>
          </div>
        ))}
        <hr />
        <div className="d-flex justify-content-between fw-bold fs-5 mb-4"><span>Total paid</span><span>{formatINR(order.totals.total)}</span></div>
        <div className="d-grid gap-2 d-sm-flex justify-content-center">
          <Link to="/menu" className="btn btn-brand px-4">Order more</Link>
          <Link to="/" className="btn btn-outline-brand px-4">Back to home</Link>
        </div>
      </div>
    </div>
  );
}
