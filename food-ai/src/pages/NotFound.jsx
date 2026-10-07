import EmptyState from '../components/EmptyState.jsx';

export default function NotFound() {
  return (
    <div className="container py-5">
      <EmptyState emoji="🍳" title="404 - Page not found" text="This page is off the menu. Let's get you back to something tasty." actionLabel="Go to home" actionTo="/" />
    </div>
  );
}
