import { FaUtensils } from 'react-icons/fa';

// Shared layout for Login and Register
export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="container py-5">
      <div className="panel mx-auto p-4 p-md-5" style={{ maxWidth: 460 }}>
        <div className="text-center mb-4">
          <span className="logo-mark mx-auto mb-3"><FaUtensils /></span>
          <h1 className="h3 fw-bold">{title}</h1>
          <p className="text-muted mb-0">{subtitle}</p>
        </div>
        {children}
        <p className="text-center mt-4 mb-0">{footer}</p>
      </div>
    </div>
  );
}
