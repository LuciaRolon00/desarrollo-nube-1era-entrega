import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export const useFetchJuegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { accessToken } = useAuth(); 

  useEffect(() => {
    if (!accessToken) { 
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/juegos/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`, 
          },
        });

        if (!response.ok) {
          throw new Error('No se pudieron cargar los juegos. Por favor, intenta iniciar sesión de nuevo.');
        }

        const data = await response.json();
        setJuegos(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  return { juegos, error, isLoading };
};