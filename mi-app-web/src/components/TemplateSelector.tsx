import React, { useState, useEffect } from 'react';
import { getTemplates } from '../services/api';

interface Template {
  sid: string;
  friendly_name: string;
}

interface Props {
  onSelect: (templateSid: string) => void;
}

const TemplateSelector: React.FC<Props> = ({ onSelect }) => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const data = await getTemplates() as Template[];
      setTemplates(data);
    };
    fetchTemplates();
  }, []);

  return (
    <div>
      <h2>Selecciona una plantilla</h2>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">-- Selecciona una --</option>
        {templates.map((template) => (
          <option key={template.sid} value={template.sid}>
            {template.friendly_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TemplateSelector;
