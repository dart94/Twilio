import axios from 'axios';

export async function getContentTemplates(accountSid: string, authToken: string) {
  try {
    const response = await axios.get<{ contents: any[] }>('https://content.twilio.com/v1/Content', {
      auth: { username: accountSid, password: authToken }
    });
    return response.data.contents;
  } catch (error) {
    console.error('❌ Error al obtener las plantillas:', error);
    throw error;
  }
}

export async function getTemplateDetails(accountSid: string, authToken: string, templateSid: string) {
  try {
    const response = await axios.get(`https://content.twilio.com/v1/Content/${templateSid}`, {
      auth: { username: accountSid, password: authToken }
    });
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener detalles de la plantilla:', error);
    throw error;
  }
}
