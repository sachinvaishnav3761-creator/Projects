import { formatINR, FREE_DELIVERY_ABOVE } from '../utils/helpers.js';

// Price breakdown used on Cart and Checkout
export default function OrderSummary({ totals, lines }) {
  return (
    <div className="panel">
      <h5 className="mb-3">Order Summary</h5>
      {lines && lines.map((l) => (
        <div key={l.id} className="d-flex justify-content-between small mb-2">
          <span>{l.name} × {l.qty}</span>
        </div>
      ))}
      {lines && <hr />}
      <div className="d-flex justify-content-between mb-2"><span>Subtotal</span><span>{formatINR(totals.subtotal)}</span></div>
      <div className="d-flex justify-content-between mb-2 text-success"><span>Discount</span><span>- {formatINR(totals.discount)}</span></div>
      <div className="d-flex justify-content-between mb-2">
        <span>Delivery fee</span>
        <span>{totals.delivery === 0 ? 'FREE' : formatINR(totals.delivery)}</span>
      </div>
      {totals.delivery > 0 && <p className="small text-muted">Free delivery on orders above {formatINR(FREE_DELIVERY_ABOVE)}.</p>}
      <hr />
      <div className="d-flex justify-content-between fw-bold fs-5"><span>Total</span><span>{formatINR(totals.total)}</span></div>
    </div>
  );
}
