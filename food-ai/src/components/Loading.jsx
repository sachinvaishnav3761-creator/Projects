export default function Loading({ text = 'Loading...' }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5" role="status">
      <div className="spinner-border text-success" />
      <p className="text-muted mt-3 mb-0">{text}</p>
    </div>
  );
}
