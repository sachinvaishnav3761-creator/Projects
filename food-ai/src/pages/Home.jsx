import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaQuoteLeft } from 'react-icons/fa';
import HeroSection from '../components/HeroSection.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import FoodCard from '../components/FoodCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import OfferBanner from '../components/OfferBanner.jsx';
import Rating from '../components/Rating.jsx';
import foods, { categories } from '../data/foods.js';
import { recommendFoods } from '../utils/helpers.js';

const reviews = [
  { name: 'Aarav Mehta', city: 'Ahmedabad', rating: 5, text: 'The AI suggestions were spot on. I asked for something spicy under ₹300 and loved the result.' },
  { name: 'Riya Shah', city: 'Surat', rating: 4.5, text: 'Delivery was quick and the biryani was still hot. The menu filters make ordering easy.' },
  { name: 'Kabir Nair', city: 'Mumbai', rating: 5, text: 'Great healthy options. The quinoa bowl is now my weekday lunch.' },
];

function SectionHead({ title, to, linkText = 'View all' }) {
  return (
    <div className="d-flex justify-content-between align-items-end mb-4">
      <h2 className="section-title mb-0">{title}</h2>
      {to && <Link to={to} className="fw-bold text-decoration-none">{linkText}</Link>}
    </div>
  );
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const popular = foods.filter((f) => f.isPopular).slice(0, 8);
  const bestSellers = [...foods].sort((a, b) => b.reviews - a.reviews).slice(0, 6);
  const aiPicks = recommendFoods(foods, { craving: 'Healthy', budget: [100, 500], meal: 'Lunch' }).slice(0, 4);
  const offers = foods.filter((f) => f.discount >= 20).slice(0, 4);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (/^\S+@\S+\.\S+$/.test(email)) setSubscribed(true);
  };

  return (
    <>
      <HeroSection />

      <section className="section">
        <div className="container">
          <SectionHead title="Browse Categories" to="/categories" />
          <div className="row g-3">
            {categories.map((c) => (
              <div className="col-6 col-md-4 col-lg-3 col-xl-2" key={c.name}><CategoryCard category={c} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <SectionHead title="Popular Foods" to="/menu" />
          <div className="row g-4">
            {popular.map((f) => (
              <div className="col-6 col-lg-3" key={f.id}><FoodCard food={f} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <SectionHead title="Best Sellers" to="/menu" />
          <div className="row g-3">
            {bestSellers.map((f, i) => (
              <div className="col-md-6 col-lg-4" key={f.id}><ProductCard food={f} rank={i + 1} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <SectionHead title="🤖 AI Recommended Foods" to="/ai-recommendation" linkText="Get your own picks" />
          <div className="row g-4">
            {aiPicks.map((f) => (
              <div className="col-6 col-lg-3" key={f.id}><FoodCard food={f} badge={`${f.matchPercent}% match`} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <SectionHead title="Special Offers" />
          <div className="row g-4 mb-4">
            <div className="col-md-6"><OfferBanner title="Flat 20% off your first order" text="Fresh meals from our top-rated kitchens." code="FOODAI20" /></div>
            <div className="col-md-6"><OfferBanner variant="saffron" title="Free delivery above ₹500" text="Add a drink or dessert and skip the delivery fee." to="/menu?category=Desserts" /></div>
          </div>
          <div className="row g-4">
            {offers.map((f) => (
              <div className="col-6 col-lg-3" key={f.id}><FoodCard food={f} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <h2 className="section-title mb-4">What Customers Say</h2>
          <div className="row g-4">
            {reviews.map((r) => (
              <div className="col-md-4" key={r.name}>
                <div className="panel h-100">
                  <FaQuoteLeft className="mb-2" style={{ color: 'var(--saffron)' }} />
                  <p>{r.text}</p>
                  <Rating value={r.rating} />
                  <div className="fw-bold mt-2">{r.name}</div>
                  <small className="text-muted">{r.city}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="newsletter p-4 p-md-5 text-center">
          <h2 className="fw-bold">Get weekly deals in your inbox</h2>
          <p className="opacity-75">New dishes, offers and AI picks. No spam.</p>
          {subscribed ? (
            <p className="fw-bold text-warning mb-0">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleSubscribe} className="d-flex flex-column flex-sm-row gap-2 mx-auto" style={{ maxWidth: 480 }}>
              <input type="email" className="form-control form-control-lg" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Email address" />
              <button type="submit" className="btn btn-warning btn-lg fw-bold">Subscribe</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
