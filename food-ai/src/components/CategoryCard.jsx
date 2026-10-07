import { Link } from 'react-router-dom';

export default function CategoryCard({ category, count }) {
  return (
    <Link to={`/menu?category=${encodeURIComponent(category.name)}`} className="cat-card">
      <span className="emoji" aria-hidden="true">{category.emoji}</span>
      <h6 className="mb-0 fw-bold">{category.name}</h6>
      {count !== undefined && <small className="opacity-75">{count} items</small>}
    </Link>
  );
}
