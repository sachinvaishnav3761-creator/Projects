import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const input = (key, label, type = 'text') => (
    <div className="mb-3">
      <label className="form-label fw-bold" htmlFor={key}>{label}</label>
      <input id={key} type={type} className={`form-control form-control-lg ${errors[key] ? 'is-invalid' : ''}`} value={form[key]} onChange={set(key)} />
      {errors[key] && <div className="invalid-feedback">{errors[key]}</div>}
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = {};
    if (form.name.trim().length < 3) found.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = 'Enter a valid email address.';
    if (form.password.length < 6) found.password = 'Password must be at least 6 characters.';
    if (form.confirm !== form.password) found.confirm = 'Passwords do not match.';
    if (Object.keys(found).length === 0) {
      const result = register(form);
      if (result.ok) return navigate('/');
      found.form = result.error;
    }
    setErrors(found);
  };

  return (
    <AuthCard title="Create your account" subtitle="Save your cart and checkout faster." footer={<>Already registered? <Link to="/login" className="fw-bold">Log in</Link></>}>
      <form onSubmit={handleSubmit} noValidate>
        {errors.form && <div className="alert alert-danger py-2">{errors.form}</div>}
        {input('name', 'Full name')}
        {input('email', 'Email', 'email')}
        {input('password', 'Password', 'password')}
        {input('confirm', 'Confirm password', 'password')}
        <button type="submit" className="btn btn-brand btn-lg w-100 mt-2">Create account</button>
      </form>
    </AuthCard>
  );
}
