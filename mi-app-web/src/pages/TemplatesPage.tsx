import React, { useState } from 'react';
import TemplateSelector from '../components/TemplateSelector';
import TemplatePreview from '../components/TemplatePreview';
import { getTemplateDetails } from '../services/api';

const TemplatesPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templateDetails, setTemplateDetails] = useState<any>(null);

  const handleTemplateSelect = async (templateSid: string) => {
    setSelectedTemplate(templateSid);
    if (templateSid) {
      const details = await getTemplateDetails(templateSid);
      setTemplateDetails(details);
    } else {
      setTemplateDetails(null);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestión de Plantillas</h1>
      <TemplateSelector onSelect={handleTemplateSelect} />
      <TemplatePreview details={templateDetails} />
    </div>
  );
};

export default TemplatesPage;
