// Price after discount
export const finalPrice = (food) => Math.round(food.price * (1 - food.discount / 100));
export const formatINR = (amount) => `₹${Math.round(amount).toLocaleString('en-IN')}`;

export const FREE_DELIVERY_ABOVE = 500;
export const DELIVERY_FEE = 40;

// Cart totals: lines = [{...food, qty}]
export function calcTotals(lines) {
  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const discount = lines.reduce((sum, l) => sum + (l.price - finalPrice(l)) * l.qty, 0);
  const afterDiscount = subtotal - discount;
  const delivery = lines.length === 0 || afterDiscount >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
  return { subtotal, discount, delivery, total: afterDiscount + delivery };
}

export const FALLBACK_IMG =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450'%3E%3Crect width='100%25' height='100%25' fill='%23e6f2ec'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='72'%3E%F0%9F%8D%BD%3C/text%3E%3C/svg%3E";

const CRAVING_TAG = { Healthy: 'h', Spicy: 's', Sweet: 'w', 'High Protein': 'p', 'Fast Food': 'f' };
const MEAL_KEY = { Breakfast: 'b', Lunch: 'l', Dinner: 'd', Snack: 'k' };

/**
 * Frontend-only "AI" recommender: scores every food against the user's
 * craving, vegetarian preference, budget, meal type and rating.
 * Returns 3-6 best matches, each with a matchPercent.
 */
export function recommendFoods(foods, { craving, budget, meal }) {
  const [min, max] = budget;
  const tag = CRAVING_TAG[craving];
  const mealKey = MEAL_KEY[meal];

  const scored = foods
    .filter((food) => craving !== 'Vegetarian' || food.isVeg) // vegetarian preference
    .map((food) => {
      const price = finalPrice(food);
      let score = food.rating + (food.isPopular ? 0.5 : 0); // rating + popularity
      if (craving === 'Vegetarian' || (tag && food.tags.includes(tag))) score += 4; // craving match
      if (craving === 'Fast Food' && ['Burgers', 'Pizza'].includes(food.category)) score += 2;
      if (craving === 'Healthy' && food.category === 'Healthy') score += 2;
      if (price >= min && price <= max) score += 3; // budget match
      else if (price >= min * 0.8 && price <= max * 1.2) score += 1;
      else score -= 3;
      if (mealKey && food.meals.includes(mealKey)) score += 2; // meal match
      return { ...food, score, matchPercent: Math.max(40, Math.min(99, Math.round((score / 15) * 100))) };
    })
    .sort((a, b) => b.score - a.score);

  const strong = scored.filter((food) => food.score >= 8);
  return strong.length >= 3 ? strong.slice(0, 6) : scored.slice(0, 3);
}
