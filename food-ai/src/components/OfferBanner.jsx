import { Link } from 'react-router-dom';

export default function OfferBanner({ title, text, code, to = '/menu', variant = 'green' }) {
  return (
    <div className={`offer-banner offer-${variant} d-flex flex-column align-items-start`}>
      <h3 className="fw-bold">{title}</h3>
      <p className="mb-3">{text}</p>
      {code && <span className="badge bg-white text-dark mb-3 px-3 py-2">Use code {code}</span>}
      <Link to={to} className="btn btn-light fw-bold mt-auto px-4">Order now</Link>
    </div>
  );
}
