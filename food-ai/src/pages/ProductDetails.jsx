import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaClock, FaShoppingCart, FaBolt } from 'react-icons/fa';
import foods from '../data/foods.js';
import { useCart } from '../context/CartContext.jsx';
import Rating from '../components/Rating.jsx';
import QuantityControl from '../components/QuantityControl.jsx';
import WishlistButton from '../components/WishlistButton.jsx';
import FoodImage from '../components/FoodImage.jsx';
import ProductCard from '../components/ProductCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { finalPrice, formatINR } from '../utils/helpers.js';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const food = foods.find((f) => f.id === Number(id));

  // Invalid product id
  if (!food) {
    return <EmptyState emoji="😕" title="Dish not found" text="This item does not exist or was removed from the menu." actionLabel="Back to menu" actionTo="/menu" />;
  }

  const related = [
    ...foods.filter((f) => f.category === food.category && f.id !== food.id),
    ...foods.filter((f) => f.category !== food.category),
  ].slice(0, 4);

  const handleAdd = () => {
    addToCart(food.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  const handleBuyNow = () => {
    addToCart(food.id, qty);
    navigate('/checkout');
  };

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/menu?category=${encodeURIComponent(food.category)}`}>{food.category}</Link></li>
          <li className="breadcrumb-item active">{food.name}</li>
        </ol>
      </nav>

      <div className="row g-4 g-lg-5">
        <div className="col-lg-6">
          <div className="position-relative">
            <FoodImage src={food.image} alt={food.name} className="w-100 rounded-4 shadow-sm" />
            <WishlistButton id={food.id} className="position-absolute top-0 end-0 m-3" />
          </div>
        </div>

        <div className="col-lg-6">
          <span className="badge bg-success-subtle text-success-emphasis mb-2">{food.category}</span>
          <h1 className="page-title mb-2">{food.name}</h1>
          <div className="d-flex align-items-center gap-3 flex-wrap mb-3">
            <Rating value={food.rating} reviews={food.reviews} size={16} />
            <span className="d-flex align-items-center gap-2 small">
              <span className={`veg-dot ${food.isVeg ? '' : 'non'}`} />{food.isVeg ? 'Vegetarian' : 'Non-vegetarian'}
            </span>
          </div>

          <div className="d-flex align-items-baseline gap-3 flex-wrap mb-3">
            <span className="display-6 fw-bold">{formatINR(finalPrice(food))}</span>
            {food.discount > 0 && (
              <>
                <span className="old-price fs-5">{formatINR(food.price)}</span>
                <span className="off-tag fs-6">{food.discount}% OFF</span>
              </>
            )}
          </div>

          <p className="text-muted">{food.description}</p>
          <p className="d-flex align-items-center gap-2"><FaClock className="text-success" /> Preparation time: <strong>{food.preparationTime}</strong></p>

          <h6 className="mt-4">Ingredients</h6>
          <div className="d-flex flex-wrap gap-2 mb-4">
            {food.ingredients.map((item) => <span key={item} className="badge rounded-pill bg-body-secondary text-body border fw-normal px-3 py-2">{item}</span>)}
          </div>

          <div className="d-flex align-items-center gap-3 flex-wrap">
            <QuantityControl value={qty} onChange={setQty} />
            <button type="button" className="btn btn-brand px-4 py-2" onClick={handleAdd}>
              <FaShoppingCart className="me-2" />{added ? 'Added to cart' : 'Add to Cart'}
            </button>
            <button type="button" className="btn btn-outline-brand px-4 py-2" onClick={handleBuyNow}>
              <FaBolt className="me-2" />Buy Now
            </button>
          </div>
        </div>
      </div>

      <section className="mt-5">
        <h2 className="section-title mb-4">You may also like</h2>
        <div className="row g-3">
          {related.map((f) => <div className="col-md-6 col-xl-3" key={f.id}><ProductCard food={f} /></div>)}
        </div>
      </section>
    </div>
  );
}
