import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import EmptyState from '../components/EmptyState.jsx';
import OrderSummary from '../components/OrderSummary.jsx';

const emailRegex = /^\S+@\S+\.\S+$/;

function validate(form) {
  const errors = {};
  if (form.fullName.trim().length < 3) errors.fullName = 'Enter your full name.';
  if (!emailRegex.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!/^[6-9]\d{9}$/.test(form.phone)) errors.phone = 'Enter a valid 10-digit mobile number.';
  if (form.address.trim().length < 10) errors.address = 'Enter your full address (at least 10 characters).';
  if (form.city.trim().length < 2) errors.city = 'Enter your city.';
  if (!/^\d{6}$/.test(form.pincode)) errors.pincode = 'Enter a 6-digit pincode.';
  if (form.payment === 'upi' && !/^[\w.-]+@[\w]+$/.test(form.upiId)) errors.upiId = 'Enter a valid UPI ID, e.g. name@bank.';
  if (form.payment === 'card') {
    if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) errors.cardNumber = 'Enter a 16-digit card number.';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) errors.expiry = 'Use MM/YY format.';
    if (!/^\d{3}$/.test(form.cvv)) errors.cvv = 'Enter a 3-digit CVV.';
  }
  return errors;
}

export default function Checkout() {
  const { lines, totals, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: user?.name || '', email: user?.email || '', phone: '', address: '', city: '', pincode: '',
    payment: 'cod', upiId: '', cardNumber: '', expiry: '', cvv: '',
  });
  const [errors, setErrors] = useState({});

  if (lines.length === 0) {
    return <div className="container py-4"><EmptyState emoji="🛒" title="Nothing to check out" text="Your cart is empty. Add some dishes first." actionLabel="Browse menu" actionTo="/menu" /></div>;
  }

  const setField = (name) => (e) => setForm((prev) => ({ ...prev, [name]: e.target.value }));

  // Reusable input with its validation message
  const field = (name, label, props = {}) => (
    <div className={props.col || 'col-12'}>
      <label className="form-label fw-bold" htmlFor={name}>{label}</label>
      {props.as === 'textarea' ? (
        <textarea id={name} rows={3} className={`form-control ${errors[name] ? 'is-invalid' : ''}`} value={form[name]} onChange={setField(name)} />
      ) : (
        <input id={name} type={props.type || 'text'} placeholder={props.placeholder} maxLength={props.maxLength} className={`form-control ${errors[name] ? 'is-invalid' : ''}`} value={form[name]} onChange={setField(name)} />
      )}
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const order = {
      id: `FAI${Date.now().toString().slice(-8)}`,
      placedAt: new Date().toISOString(),
      lines, totals,
      customer: { name: form.fullName, phone: form.phone, address: `${form.address}, ${form.city} - ${form.pincode}` },
      payment: form.payment,
    };
    localStorage.setItem('foodai_last_order', JSON.stringify(order));
    clearCart();
    navigate('/order-success');
  };

  return (
    <div className="container py-4">
      <h1 className="page-title mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-4">
          <div className="col-lg-8 d-grid gap-4 align-content-start">
            <section className="panel">
              <h5 className="mb-3">Delivery details</h5>
              <div className="row g-3">
                {field('fullName', 'Full name', { col: 'col-md-6' })}
                {field('email', 'Email', { type: 'email', col: 'col-md-6' })}
                {field('phone', 'Phone number', { type: 'tel', maxLength: 10, placeholder: '10-digit mobile number', col: 'col-md-6' })}
                {field('city', 'City', { col: 'col-md-6' })}
                {field('address', 'Address', { as: 'textarea' })}
                {field('pincode', 'Pincode', { maxLength: 6, col: 'col-md-6' })}
              </div>
            </section>

            <section className="panel">
              <h5 className="mb-3">Payment method</h5>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {[['cod', 'Cash on Delivery'], ['upi', 'UPI'], ['card', 'Credit / Debit Card']].map(([value, label]) => (
                  <button key={value} type="button" className={`chip ${form.payment === value ? 'active' : ''}`} onClick={() => setForm((p) => ({ ...p, payment: value }))} aria-pressed={form.payment === value}>{label}</button>
                ))}
              </div>
              {form.payment === 'cod' && <p className="text-muted mb-0">Pay in cash when your order arrives.</p>}
              {form.payment === 'upi' && <div className="row">{field('upiId', 'UPI ID', { placeholder: 'name@bank' })}</div>}
              {form.payment === 'card' && (
                <div className="row g-3">
                  {field('cardNumber', 'Card number', { placeholder: '1234 5678 9012 3456', maxLength: 19 })}
                  {field('expiry', 'Expiry', { placeholder: 'MM/YY', maxLength: 5, col: 'col-6' })}
                  {field('cvv', 'CVV', { type: 'password', maxLength: 3, col: 'col-6' })}
                </div>
              )}
              <p className="small text-muted mt-3 mb-0">Demo only: no payment is processed and card details are never saved.</p>
            </section>
          </div>

          <div className="col-lg-4">
            <div className="sticky-panel">
              <OrderSummary totals={totals} lines={lines} />
              <button type="submit" className="btn btn-brand btn-lg w-100 mt-3">Place Order</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
