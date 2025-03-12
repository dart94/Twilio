import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getTemplates = async (name: string) => {
  if (!name) {
    console.error('❌ Error: El parámetro "name" es requerido.');
    return []; // Devolver array vacío si `name` está vacío o `undefined`
  }

  try {
    const response = await axios.get(`${API_URL}/templates`, {
      params: { name }
    });
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al obtener plantillas:', error.response?.data || error.message);
    return [];
  }
};
