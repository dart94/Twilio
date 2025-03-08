import React from 'react';

interface TemplateDetails {
  friendly_name: string;
  body: string;
  variables?: Record<string, string>;
}

interface Props {
  details: TemplateDetails | null;
}

const TemplatePreview: React.FC<Props> = ({ details }) => {
  if (!details) {
    return <p>Selecciona una plantilla para ver los detalles.</p>;
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginTop: '15px' }}>
      <h3>{details.friendly_name}</h3>
      <p><strong>Cuerpo:</strong> {details.body}</p>
      {details.variables && (
        <div>
          <h4>Variables:</h4>
          <ul>
            {Object.entries(details.variables).map(([key, value]) => (
              <li key={key}><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TemplatePreview;
