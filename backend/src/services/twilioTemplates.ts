// backend/src/services/twilioTemplates.ts
import axios from 'axios';
import TwilioCredentialsModel from '../models/TwilioCredentials';

export async function getContentTemplates(credentialId: number) {
  try {
    // Obtiene las credenciales de la base de datos
    const credential = await TwilioCredentialsModel.findById(credentialId);
    
    if (!credential) {
      throw new Error('Credenciales no encontradas');
    }
    
    const { account_sid, auth_token } = credential;
    
    const response = await axios.get<{ contents: any[] }>('https://content.twilio.com/v1/Content', {
      auth: { username: account_sid, password: auth_token }
    });
    
    return response.data.contents;
  } catch (error) {
    console.error('Error al obtener las plantillas:', error);
    throw error;
  }
}

export async function getTemplateDetails(templateSid: string, credentialId: number) {
  try {
    // Obtiene las credenciales de la base de datos
    const credential = await TwilioCredentialsModel.findById(credentialId);
    
    if (!credential) {
      throw new Error('Credenciales no encontradas');
    }
    
    const { account_sid, auth_token } = credential;
    
    const response = await axios.get(`https://content.twilio.com/v1/Content/${templateSid}`, {
      auth: { username: account_sid, password: auth_token }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de la plantilla:', error);
    throw error;
  }
}