import axios from 'axios';

// Base URL del backend
const API_URL = 'http://localhost:3000/api'; // Asegúrate de que tu backend esté corriendo

export const getTemplates = async () => {
  try {
    const response = await axios.get(`${API_URL}/templates`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener plantillas:', error);
    return [];
  }
};

export const getTemplateDetails = async (templateSid: string) => {
  try {
    const response = await axios.get(`${API_URL}/templates/${templateSid}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de la plantilla:', error);
    return null;
  }
};
