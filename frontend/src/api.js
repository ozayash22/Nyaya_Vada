import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (userData) => API.post('/register', userData);
export const login = (credentials) => API.post('/login', credentials);
export const getChatHistory = (sessionId) => API.get(`/chat/${sessionId}`);
export const getSessions = () => API.get('/sessions');
export const askLegalQuestion = (question, sessionId) => 
  API.post('/ask-legal', { question, sessionId });

export default API;