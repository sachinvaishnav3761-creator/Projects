import { FALLBACK_IMG } from '../utils/helpers.js';

// <img> with an emoji placeholder if the photo fails to load
export default function FoodImage({ src, alt, className = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = FALLBACK_IMG;
      }}
    />
  );
}
