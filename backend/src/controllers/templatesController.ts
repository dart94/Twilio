import { Request, Response, RequestHandler } from 'express';
import TwilioCredentialsModel from '../models/TwilioCredentials';
import { getContentTemplates, getTemplateDetails } from '../services/twilioTemplates';

export const getTemplates: RequestHandler = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      res.status(400).json({ message: 'El parámetro "name" es requerido.' });
      return; 
    }

    console.log(`📌 Buscando credencial con name: ${name}`);
    const credentials = await TwilioCredentialsModel.findByName(name as string);

    if (!credentials) {
      res.status(404).json({ message: `No se encontró una credencial con el nombre "${name}".` });
      return; // Finaliza la ejecución de la función
    }

    const { account_sid, auth_token } = credentials;
    console.log('✅ Credenciales obtenidas:', { account_sid, auth_token: '***' });

    // Obtener plantillas desde Twilio usando las credenciales dinámicas
    const templates = await getContentTemplates(account_sid, auth_token);

    const filteredTemplates = templates.map((template: any) => ({
      friendly_name: template.friendly_name,
      body: template.types?.['twilio/quick-reply']?.body || '', // Asegurar que no sea undefined
      variables: template.variables || {} // Devolver un objeto vacío si no hay variables
    }));

    res.json(filteredTemplates);
  } catch (error) {
    console.error('❌ Error obteniendo plantillas:', error);
    res.status(500).json({ error: 'Error al obtener plantillas' });
  }
};


export const getTemplateById: RequestHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const { id } = req.params;

    if (!name) {
      res.status(400).json({ message: 'El parámetro "name" es requerido.' });
      return; // Finaliza la ejecución de la función
    }

    console.log(`📌 Buscando credencial con name: ${name}`);
    const credentials = await TwilioCredentialsModel.findByName(name as string);

    if (!credentials) {
      res.status(404).json({ message: `No se encontró una credencial con el nombre "${name}".` });
      return; // Finaliza la ejecución de la función
    }

    const { account_sid, auth_token } = credentials;
    console.log('✅ Credenciales obtenidas:', { account_sid, auth_token: '***' });

    // Obtener detalles de la plantilla
    const template = await getTemplateDetails(account_sid, auth_token, id);

    res.json(template); // Envía la respuesta sin usar "return"
  } catch (error) {
    console.error('❌ Error obteniendo detalles de la plantilla:', error);
    res.status(500).json({ error: 'Error al obtener detalles de la plantilla' });
  }
};