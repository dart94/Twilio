import axios from 'axios';


const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || '';

export async function getContentTemplates() {
  try {
    const response = await axios.get('https://content.twilio.com/v1/Content', {
      auth: { username: accountSid, password: authToken }
    });
    return response.data.contents;
  } catch (error) {
    console.error('Error al obtener las plantillas:', error);
    throw error;
  }
}

export async function getTemplateDetails(templateSid: string) {
  try {
    const response = await axios.get(`https://content.twilio.com/v1/Content/${templateSid}`, {
      auth: { username: accountSid, password: authToken }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de la plantilla:', error);
    throw error;
  }
}
