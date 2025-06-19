import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const navigate = useNavigate();

  const login = async (email, password) => {
  try {
    console.log("Attempting login...");
    const res = await axios.post('http://localhost:5000/api/login', { email, password });
    console.log("Login API response:", res.data);

    const { token, user } = res.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
    console.log("Login successful", user);
    navigate('/');
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Login failed");
  }
};


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    if (token && !user) {
      axios.get('http://localhost:5000/api/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(resp => {
        setUser(resp.data);
        localStorage.setItem('user', JSON.stringify(resp.data));
      })
      .catch(logout);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
