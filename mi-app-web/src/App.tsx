import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import TemplateList from './components/TemplateList';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

// Componente de rutas que usa el contexto de autenticación
function AppRoutes() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <p>Cargando...</p>;
  }
  
  return (
    <Routes>
      {/* Ruta raíz que redirecciona según estado de autenticación */}
      <Route path="/" element={user ? <Navigate to="/templatelist" /> : <Navigate to="/login" />} />
      <Route path="/login" element={user ? <Navigate to="/templatelist" /> : <Login />} />
      <Route
        path="/templatelist"
        element={
          <ProtectedRoute>
            <TemplateList />
          </ProtectedRoute>
        }
      />
      {/* Ruta para manejar rutas no encontradas */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;