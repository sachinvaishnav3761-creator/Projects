import { useState } from 'react';
import foods from '../data/foods.js';
import FoodCard from '../components/FoodCard.jsx';
import Loading from '../components/Loading.jsx';
import { recommendFoods } from '../utils/helpers.js';

const cravings = ['Healthy', 'Spicy', 'Sweet', 'High Protein', 'Vegetarian', 'Fast Food'];
const budgets = [
  { label: '₹100-200', range: [100, 200] },
  { label: '₹200-500', range: [200, 500] },
  { label: '₹500-1000', range: [500, 1000] },
];
const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

function ChipGroup({ title, options, value, onChange }) {
  return (
    <div className="mb-4">
      <h5 className="mb-3">{title}</h5>
      <div className="d-flex flex-wrap gap-2">
        {options.map((opt) => (
          <button key={opt} type="button" className={`chip ${value === opt ? 'active' : ''}`} onClick={() => onChange(opt)} aria-pressed={value === opt}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AIRecommendation() {
  const [craving, setCraving] = useState('');
  const [budget, setBudget] = useState('');
  const [meal, setMeal] = useState('');
  const [results, setResults] = useState(null);
  const [thinking, setThinking] = useState(false);

  const ready = craving && budget && meal;

  const handleSubmit = () => {
    setThinking(true);
    setResults(null);
    // Small delay so it feels like the assistant is "thinking"
    setTimeout(() => {
      const range = budgets.find((b) => b.label === budget).range;
      setResults(recommendFoods(foods, { craving, budget: range, meal }));
      setThinking(false);
    }, 700);
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="page-title">🤖 FoodAI Assistant</h1>
        <p className="text-muted mb-0">Answer three quick questions and get dishes picked for you.</p>
      </div>

      <div className="panel mx-auto p-4" style={{ maxWidth: 760 }}>
        <ChipGroup title="What are you craving today?" options={cravings} value={craving} onChange={setCraving} />
        <ChipGroup title="What is your budget?" options={budgets.map((b) => b.label)} value={budget} onChange={setBudget} />
        <ChipGroup title="Which meal is it for?" options={meals} value={meal} onChange={setMeal} />
        <button type="button" className="btn btn-brand btn-lg w-100" disabled={!ready || thinking} onClick={handleSubmit}>
          Get Recommendations
        </button>
        {!ready && <p className="small text-muted text-center mt-2 mb-0">Choose one option in each question to continue.</p>}
      </div>

      {thinking && <Loading text="FoodAI is picking dishes for you..." />}

      {results && (
        <section className="mt-5">
          <h2 className="section-title mb-1">AI Recommended For You</h2>
          <p className="text-muted mb-4">{craving} · {budget} · {meal}</p>
          <div className="row g-4">
            {results.map((f) => (
              <div className="col-6 col-lg-4" key={f.id}><FoodCard food={f} badge={`${f.matchPercent}% match`} /></div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
