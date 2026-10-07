import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = 'Enter a valid email address.';
    if (form.password.length < 6) found.password = 'Password must be at least 6 characters.';
    if (Object.keys(found).length === 0) {
      const result = login(form);
      if (result.ok) return navigate('/');
      found.form = result.error;
    }
    setErrors(found);
  };

  return (
    <AuthCard title="Welcome back" subtitle="Log in to continue ordering." footer={<>New to FoodAI? <Link to="/register" className="fw-bold">Create an account</Link></>}>
      <form onSubmit={handleSubmit} noValidate>
        {errors.form && <div className="alert alert-danger py-2">{errors.form}</div>}
        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="email">Email</label>
          <input id="email" type="email" className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-4">
          <label className="form-label fw-bold" htmlFor="password">Password</label>
          <input id="password" type="password" className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <button type="submit" className="btn btn-brand btn-lg w-100">Log in</button>
      </form>
    </AuthCard>
  );
}
