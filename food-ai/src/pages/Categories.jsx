import CategoryCard from '../components/CategoryCard.jsx';
import foods, { categories } from '../data/foods.js';

export default function Categories() {
  return (
    <div className="container py-4">
      <h1 className="page-title">Food Categories</h1>
      <p className="text-muted mb-4">Pick a category to see every dish in it.</p>
      <div className="row g-3 g-md-4">
        {categories.map((c) => (
          <div className="col-6 col-md-4 col-lg-3" key={c.name}>
            <CategoryCard category={c} count={foods.filter((f) => f.category === c.name).length} />
          </div>
        ))}
      </div>
    </div>
  );
}
