// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BE_URL,
  timeout: 10000,
});

// Example API calls
export const fetchRooms = () => api.get('/main/room');
export const fetchWeather = () => api.get('/main/weather');
export const fetchRealtimeData = (roomName) => api.get(`/air-quality/${roomName}`);
export const fetchAirQuality = (roomName) => api.get(`/air-quality/${roomName}`);
export const fetchTemperature = (roomName) => api.get(`/temperature/${roomName}`);

export default api;
