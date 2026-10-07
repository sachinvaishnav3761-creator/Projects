import { FaMinus, FaPlus } from 'react-icons/fa';

export default function QuantityControl({ value, onChange, min = 1, max = 20 }) {
  return (
    <div className="qty-control">
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity"><FaMinus size={11} /></button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity"><FaPlus size={11} /></button>
    </div>
  );
}
