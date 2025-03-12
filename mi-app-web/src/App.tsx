import React from 'react';
import TemplateList from './components/TemplateList';

const App: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1>Gestión de Plantillas de WhatsApp</h1>
      <TemplateList />
    </div>
  );
};

export default App;
