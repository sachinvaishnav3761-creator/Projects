import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function Rating({ value, reviews, size = 14 }) {
  const stars = [1, 2, 3, 4, 5].map((n) => {
    if (value >= n) return <FaStar key={n} size={size} />;
    if (value >= n - 0.5) return <FaStarHalfAlt key={n} size={size} />;
    return <FaRegStar key={n} size={size} />;
  });
  return (
    <span className="d-inline-flex align-items-center gap-1" style={{ color: 'var(--saffron)' }} aria-label={`${value} out of 5`}>
      {stars}
      <span className="text-body fw-bold ms-1">{value}</span>
      {reviews !== undefined && <span className="text-muted small">({reviews.toLocaleString('en-IN')})</span>}
    </span>
  );
}
