import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMagic } from 'react-icons/fa';
import SearchBar from './SearchBar.jsx';
import FoodImage from './FoodImage.jsx';
import foods from '../data/foods.js';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const goSearch = (q) => navigate(`/menu${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`);

  return (
    <section className="hero py-5">
      <div className="container py-lg-4">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h1 className="mb-3">Discover Your Perfect Meal with AI</h1>
            <p className="lead text-muted mb-4">Pick a craving, set a budget, and FoodAI finds dishes you will actually enjoy. Fresh food, delivered fast.</p>
            <SearchBar value={query} onChange={setQuery} onSubmit={goSearch} large />
            <div className="d-flex flex-wrap gap-2 mt-4">
              <Link to="/ai-recommendation" className="btn btn-brand px-4 py-2"><FaMagic className="me-2" />Ask FoodAI</Link>
              <Link to="/menu" className="btn btn-outline-brand px-4 py-2">Browse menu</Link>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-center position-relative">
            <FoodImage src={foods[14].image} alt="Chicken biryani" className="hero-img" />
            <div className="hero-float d-none d-sm-block">
              <div className="small text-muted">AI pick for you</div>
              <div className="fw-bold">{foods[14].name}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
