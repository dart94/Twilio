import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Obtiene el token del sessionStorage
const getToken = () => sessionStorage.getItem('token');

// Configura Axios para incluir el token en cada petición
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a cada petición
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getTemplates = async (name: string) => {
  if (!name) {
    console.error('❌ Error: El parámetro "name" es requerido.');
    return [];
  }
  
  // 🔍 Verifica si el token está en sessionStorage antes de hacer la solicitud
  const token = sessionStorage.getItem('token');
  console.log("🔍 Token en sessionStorage:", token);
  
  try {
    const response = await api.get(`/api/templates`, { params: { name } });
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al obtener plantillas:', error.response?.data || error.message);
    return [];
  }
};

export const getCredentials = async () => {
  try {
    const token = sessionStorage.getItem('token');
    console.log("🔍 Token en sessionStorage (getCredentials):", token);
    
    // Utilizamos la ruta completa
    const response = await api.get(`/api/credentials`);
    console.log('✅ Respuesta de credenciales:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al obtener credenciales:', error.response?.data || error.message);
    throw error;
  }
};