import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button type="button" className="btn icon-btn" onClick={toggleTheme} aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'} title={isDark ? 'Light theme' : 'Dark theme'}>
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
