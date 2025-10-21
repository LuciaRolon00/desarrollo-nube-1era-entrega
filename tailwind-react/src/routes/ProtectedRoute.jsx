import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); 

  if (loading) {
    return <p className="text-center text-white text-xl p-8">Cargando...</p>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}