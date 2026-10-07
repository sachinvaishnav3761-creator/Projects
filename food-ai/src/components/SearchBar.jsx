import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Search for burgers, biryani, dosa...', large = false }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };
  return (
    <form onSubmit={handleSubmit} className={`input-group ${large ? 'input-group-lg' : ''} shadow-sm`} role="search">
      <span className="input-group-text bg-body border-0"><FaSearch className="text-muted" /></span>
      <input
        type="search"
        className="form-control border-0"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search food"
      />
      {onSubmit && <button type="submit" className="btn btn-brand px-4">Search</button>}
    </form>
  );
}
