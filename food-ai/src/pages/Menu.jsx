import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import foods from '../data/foods.js';
import FoodCard from '../components/FoodCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import FilterSidebar, { DEFAULT_FILTERS } from '../components/FilterSidebar.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Loading from '../components/Loading.jsx';
import { finalPrice } from '../utils/helpers.js';

export default function Menu() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get('q') || '');
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, category: params.get('category') || 'All' });
  const [sort, setSort] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Short fake delay so the Loading component is visible on first visit
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  // Keep filters in sync if the user arrives from a category / hero search link
  useEffect(() => {
    setSearch(params.get('q') || '');
    setFilters((prev) => ({ ...prev, category: params.get('category') || 'All' }));
  }, [params]);

  const results = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = foods.filter(
      (f) =>
        (!term || f.name.toLowerCase().includes(term)) &&
        (filters.category === 'All' || f.category === filters.category) &&
        finalPrice(f) <= filters.maxPrice &&
        (!filters.vegOnly || f.isVeg) &&
        f.rating >= filters.minRating
    );
    if (sort === 'low') list.sort((a, b) => finalPrice(a) - finalPrice(b));
    if (sort === 'high') list.sort((a, b) => finalPrice(b) - finalPrice(a));
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, filters, sort]);

  const resetAll = () => {
    setSearch('');
    setFilters(DEFAULT_FILTERS);
    setSort('default');
  };

  return (
    <div className="container py-4">
      <h1 className="page-title mb-3">Our Menu</h1>
      <div className="row g-2 mb-4 align-items-center">
        <div className="col-12 col-md"><SearchBar value={search} onChange={setSearch} /></div>
        <div className="col-7 col-md-3">
          <select className="form-select py-2" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort foods">
            <option value="default">Sort: Recommended</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Rating: Top rated</option>
          </select>
        </div>
        <div className="col-5 d-lg-none">
          <button type="button" className="btn btn-outline-brand w-100 py-2" onClick={() => setShowFilters(!showFilters)}>
            <FaFilter className="me-2" />Filters
          </button>
        </div>
      </div>

      <div className="row g-4">
        <div className={`col-lg-3 ${showFilters ? '' : 'd-none'} d-lg-block`}>
          <div className="sticky-panel"><FilterSidebar filters={filters} setFilters={setFilters} onReset={resetAll} /></div>
        </div>
        <div className="col-lg-9">
          {loading ? (
            <Loading text="Fetching the menu..." />
          ) : results.length === 0 ? (
            <EmptyState emoji="🔍" title="No dishes found" text="Try a different search or loosen your filters." actionLabel="Reset filters" actionTo="/menu" />
          ) : (
            <>
              <p className="text-muted">{results.length} dishes found</p>
              <div className="row g-4">
                {results.map((f) => (
                  <div className="col-6 col-xl-4" key={f.id}><FoodCard food={f} /></div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
