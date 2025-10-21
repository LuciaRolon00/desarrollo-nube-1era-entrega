const BASE_URL = "http://127.0.0.1:8000/api";

export const fetchProtectedData = async (endpoint, options = {}) => {
  const accessToken = localStorage.getItem("accessToken");

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  } else {
    return Promise.reject(new Error("No hay token de autenticación."));
  }

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}/`, { ...options, headers });

    if (response.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      throw new Error("Sesión expirada. Por favor, inicia sesión de nuevo.");
    }

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en fetch a ${endpoint}:`, error);
    return Promise.reject(error);
  }
};

export const fetchPublicData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}/`, options);

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en fetch a ${endpoint}:`, error);
    return Promise.reject(error);
  }
};