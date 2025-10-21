import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";

const Registro = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.usuario,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        // Si el backend devuelve un error lo mostramos
        const errorData = await response.json();
        throw new Error(errorData.detail || 'No se pudo completar el registro.');
      }

      // Si el registro es exitoso
      alert('¡Registro exitoso! Ahora serás redirigido para iniciar sesión.');
      navigate('/login'); // Redirige al usuario a la página de login

    } catch (error) {
      console.error("Error en el registro:", error);
      alert(error.message); // Muestra el error
    }
  };

  const labelStyles = "block text-gray-700 text-sm font-bold mb-2";
  const inputStyles = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4";
  const buttonStyles = `w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#d8c7f6] hover:bg-[#bfaaf3]'}`;

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl text-black font-bold text-center mb-6">Registrate</h2>

        <label htmlFor="usuario" className={labelStyles}>Nombre de usuario</label>
        <input
          id="usuario"
          type="text"
          placeholder="Usuario"
          className={inputStyles}
          {...register("usuario", { required: "El nombre de usuario es obligatorio" })}
        />
        {errors.usuario && <p className="text-red-600 text-sm mb-2">{errors.usuario.message}</p>}

        <label htmlFor="email" className={labelStyles}>Email</label>
        <input
          id="email"
          type="email"
          placeholder="Dirección de email"
          className={inputStyles}
          {...register("email", { 
            required: "El email es obligatorio",
            pattern: { value: /^\S+@\S+$/i, message: "El formato de email no es válido" }
          })}
        />
        {errors.email && <p className="text-red-600 text-sm mb-2">{errors.email.message}</p>}

        <label htmlFor="password" className={labelStyles}>Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          className={inputStyles}
          {...register("password", { 
            required: "La contraseña es obligatoria",
            minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }
          })}
        />
        {errors.password && <p className="text-red-600 text-sm mb-2">{errors.password.message}</p>}

        <label htmlFor="confirmPassword" className={labelStyles}>Confirmar Contraseña</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Repite tu contraseña"
          className={inputStyles}
          {...register("confirmPassword", { 
            required: "Debes confirmar la contraseña",
            validate: value => value === password || "Las contraseñas no coinciden"
          })}
        />
        {errors.confirmPassword && <p className="text-red-600 text-sm mb-2">{errors.confirmPassword.message}</p>}

        <button type="submit" className={buttonStyles} disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrar'}
        </button>

        <p className="mt-4 text-center text-sm">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Iniciá sesión aquí
          </Link>
        </p>
      </form>
    </FormContainer>
  );
};

export default Registro;