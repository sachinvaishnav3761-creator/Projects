import { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';

const ThemeContext = createContext(null);

const systemTheme = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export function ThemeProvider({ children }) {
  // First visit follows the device theme; after that the saved choice is used
  const [theme, setTheme] = useLocalStorage('foodai_theme', systemTheme());

  // Bootstrap 5.3 switches all its components using this attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
