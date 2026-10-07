import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';

const AuthContext = createContext(null);

/*
 * DEMO ONLY: there is no backend, so registered users live in localStorage.
 * Never store plain-text passwords like this in a real application.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('foodai_user', null);
  const [users, setUsers] = useLocalStorage('foodai_users', []);

  const register = ({ name, email, password }) => {
    if (users.some((u) => u.email === email.toLowerCase())) {
      return { ok: false, error: 'An account with this email already exists. Please log in.' };
    }
    setUsers([...users, { name, email: email.toLowerCase(), password }]);
    setUser({ name, email: email.toLowerCase() });
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const found = users.find((u) => u.email === email.toLowerCase());
    if (!found) return { ok: false, error: 'No account found for this email. Please register first.' };
    if (found.password !== password) return { ok: false, error: 'Incorrect password. Try again.' };
    setUser({ name: found.name, email: found.email });
    return { ok: true };
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
