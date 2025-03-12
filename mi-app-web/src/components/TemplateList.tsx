import React, { useState } from 'react';
import { getTemplates } from '../services/api';

interface Template {
  sid: string;
  friendly_name: string;
  body: string;
  variables: Record<string, string>;
}

const TemplateList: React.FC = () => {
  const [name, setName] = useState('');
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTemplates = async () => {
    if (!name.trim()) {
      setError('El campo "name" es obligatorio.');
      return;
    }

    setLoading(true);
    setError('');
    
    const data = await getTemplates(name.trim()) as Template[]; // Eliminamos espacios en blanco

    if (data.length === 0) {
      setError('No se encontraron plantillas.');
    }

    setTemplates(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Buscar Plantillas de WhatsApp</h2>
      <input
        type="text"
        placeholder="Ingrese el nombre de la credencial..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc'
        }}
      />
      <button
        onClick={fetchTemplates}
        disabled={!name.trim()} // Deshabilitar botón si `name` está vacío
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: name.trim() ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: name.trim() ? 'pointer' : 'not-allowed'
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
