import { categories } from '../data/foods.js';

export const DEFAULT_FILTERS = { category: 'All', maxPrice: 600, vegOnly: false, minRating: 0 };

export default function FilterSidebar({ filters, setFilters, onReset }) {
  const update = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
  return (
    <aside className="panel">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Filters</h5>
        <button type="button" className="btn btn-link btn-sm p-0" onClick={onReset}>Reset</button>
      </div>

      <label className="form-label fw-bold" htmlFor="filter-category">Category</label>
      <select id="filter-category" className="form-select mb-3" value={filters.category} onChange={(e) => update('category', e.target.value)}>
        <option value="All">All categories</option>
        {categories.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
      </select>

      <label className="form-label fw-bold d-flex justify-content-between" htmlFor="filter-price">
        <span>Max price</span><span className="text-success">₹{filters.maxPrice}</span>
      </label>
      <input id="filter-price" type="range" className="form-range mb-3" min="100" max="600" step="50" value={filters.maxPrice} onChange={(e) => update('maxPrice', Number(e.target.value))} />

      <label className="form-label fw-bold" htmlFor="filter-rating">Minimum rating</label>
      <select id="filter-rating" className="form-select mb-3" value={filters.minRating} onChange={(e) => update('minRating', Number(e.target.value))}>
        <option value={0}>Any rating</option>
        <option value={4}>4.0 &amp; above</option>
        <option value={4.3}>4.3 &amp; above</option>
        <option value={4.5}>4.5 &amp; above</option>
      </select>

      <div className="form-check form-switch">
        <input id="filter-veg" className="form-check-input" type="checkbox" role="switch" checked={filters.vegOnly} onChange={(e) => update('vegOnly', e.target.checked)} />
        <label className="form-check-label fw-bold" htmlFor="filter-veg">Vegetarian only</label>
      </div>
    </aside>
  );
}
