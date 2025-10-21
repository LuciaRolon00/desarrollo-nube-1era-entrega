import { useState } from 'react';
import FormContainer from '../components/FormContainer';

const Contacto = () => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [motivo, setMotivo] = useState('consulta');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true); // Deshabilita el botón

    // Validaciones básicas
    if (nombre.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres');
      setIsSubmitting(false); // Habilita el botón de nuevo
      return;
    }
    if (mensaje.trim().length < 10) {
      setError('El mensaje debe tener al menos 10 caracteres');
      setIsSubmitting(false); // Habilita el botón de nuevo
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/contacto/', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, motivo, mensaje }),
      });

      if (!response.ok) {
        // Si el servidor responde con un error
        throw new Error('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
      }
      
      // Si todo sale bien
      setSuccess('¡Mensaje enviado correctamente!');
      setNombre('');
      setMotivo('consulta');
      setMensaje('');

    } catch (err) {
      // Si hay un error de red o del servidor
      setError(err.message);
    } finally {
      // Se ejecuta siempre, ya sea éxito o error
      setIsSubmitting(false); // Habilita el botón de nuevo
    }
  };

  // Estilos
  const labelStyles = "block text-gray-700 text-sm font-bold mb-2";
  const inputStyles = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4";
  const selectStyles = `${inputStyles} bg-white`;
  const textareaStyles = `${inputStyles} h-24`;
  const buttonStyles = `w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#d8c7f6] hover:bg-[#bfaaf3]'}`;

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl text-black font-bold text-center mb-6">Contactanos</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <label htmlFor="nombre" className={labelStyles}>Nombre</label>
        <input
          id="nombre"
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={inputStyles}
          required
        />

        <label htmlFor="motivo" className={labelStyles}>Motivo de contacto</label>
        <select
          id="motivo"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          className={selectStyles}
        >
          <option value="consulta">Consulta</option>
          <option value="sugerencia">Sugerencia</option>
          <option value="otro">Otro</option>
        </select>

        <label htmlFor="mensaje" className={labelStyles}>Mensaje</label>
        <textarea
          id="mensaje"
          placeholder="Escribe tu mensaje aquí..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className={textareaStyles}
          required
        />

        <button type="submit" className={buttonStyles} disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </FormContainer>
  );
};

export default Contacto;