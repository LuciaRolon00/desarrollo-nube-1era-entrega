import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

// Contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Efecto para verificar el token al cargar la app
  useEffect(() => {
    if (accessToken) {
      const decodedToken = parseJwt(accessToken);
      
      if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        setUser({ email: decodedToken.email });
      } else {
        localStorage.removeItem("accessToken");
        setAccessToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  }, [accessToken]);

  const loginUser = async (email, password) => { 
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (!response.ok) {
        throw new Error("El correo electrónico o la contraseña son incorrectos.");
      }
      
      const data = await response.json();

      localStorage.setItem("accessToken", data.access);
      setAccessToken(data.access);

      navigate("/juegos");

    } catch (error) {
      console.error("Error en el login:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // ARREGLAR LOGOUT
  const logoutUser = () => { 
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setUser(null);
    navigate("/login");
  };

  const authContextValue = {
    user,
    accessToken,
    isAuthenticated: !!user,
    loading,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};