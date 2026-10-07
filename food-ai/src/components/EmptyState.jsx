import { Link } from 'react-router-dom';

export default function EmptyState({ emoji = '🍽️', title, text, actionLabel, actionTo }) {
  return (
    <div className="text-center py-5 px-3">
      <div style={{ fontSize: '4rem' }}>{emoji}</div>
      <h3 className="mt-2">{title}</h3>
      {text && <p className="text-muted mx-auto" style={{ maxWidth: 420 }}>{text}</p>}
      {actionLabel && (
        <Link to={actionTo} className="btn btn-brand px-4 py-2 mt-2">{actionLabel}</Link>
      )}
    </div>
  );
}
