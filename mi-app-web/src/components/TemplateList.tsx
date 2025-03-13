import React, { useState, useEffect } from 'react';
import { getTemplates, getCredentials } from '../services/api';

interface Template {
  sid: string;
  friendly_name: string;
  body: string;
  variables: Record<string, string>;
}

interface Credential {
  name: string;
}

const TemplateList: React.FC = () => {
  const [selectedCredential, setSelectedCredential] = useState('');
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        setLoading(true); // Mostrar loading mientras carga
        const data = await getCredentials() as Credential[];
        setCredentials(data);
        setLoading(false);
      } catch (err) {
        console.error('Error cargando credenciales:', err);
        setError('Error al cargar credenciales. Verifica tu conexión o inicia sesión nuevamente.');
        setLoading(false);
      }
    };
  
    fetchCredentials();
  }, []);


  const fetchTemplates = async () => {
    if (!selectedCredential) {
      setError('Seleccione una credencial.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await getTemplates(selectedCredential) as Template[];

      if (data.length === 0) {
        setError('No se encontraron plantillas.');
      }

      setTemplates(data);
    } catch (err) {
      setError('Error al obtener plantillas.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Buscar Plantillas de WhatsApp</h2>

      <select
        value={selectedCredential}
        onChange={(e) => setSelectedCredential(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc'
        }}
      >
        <option value="">Seleccione una credencial</option>
        {credentials.map((cred) => (
          <option key={cred.name} value={cred.name}>
            {cred.name}
          </option>
        ))}
      </select>

      <button
        onClick={fetchTemplates}
        disabled={!selectedCredential}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: selectedCredential ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: selectedCredential ? 'pointer' : 'not-allowed'
        }}
      >
        Buscar Plantillas
      </button>

      {loading && <p>🔄 Cargando...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      <ul style={{ listStyle: 'none', padding: '0' }}>
        {templates.map((template) => (
          <li key={template.sid} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            <h3>{template.friendly_name}</h3>
            <p><strong>Mensaje:</strong> {template.body}</p>
            <p><strong>Variables:</strong> {Object.entries(template.variables).map(([key, value]) => (
              <span key={key}>{`{{${key}}} = ${value} `}</span>
            ))}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateList;
