import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm } from "react-hook-form";
import FormContainer from '../components/FormContainer';

export default function Login() {
  const { loginUser } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = (data) => {
    loginUser(data.loginField, data.password);
  };

  // Estilos
  const labelStyles = "block text-gray-700 text-sm font-bold mb-2";
  const inputStyles = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4";
  const buttonStyles = `w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#d8c7f6] hover:bg-[#bfaaf3]'}`;

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl text-black font-bold text-center mb-6">Inicia Sesión</h2>

        <label htmlFor="LoginField" className={labelStyles}>
          Email / Usuario
        </label>
        <input
          id="LoginField"
          type="text"
          placeholder="Tu email o usuario"
          {...register("loginField", { 
            required: "El email es obligatorio", 
          })}
          className={inputStyles}
        />
        {errors.loginField && <p className="text-red-600 text-sm mb-2">{errors.loginField.message}</p>}

        <label htmlFor="password" className={labelStyles}>
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="Tu contraseña"
          {...register("password", { 
            required: "La contraseña es obligatoria",
            minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }
          })}
          className={inputStyles}
        />
        {errors.password && <p className="text-red-600 text-sm mb-2">{errors.password.message}</p>}

        <button type="submit" className={buttonStyles} disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Iniciar Sesión"}
        </button>

        <p className="mt-4 text-center text-sm">
          ¿Todavía no tenés cuenta?
          <Link to="/registro" className="text-blue-600 hover:underline ml-1">
            Registrate aquí
          </Link>
        </p>
      </form>
    </FormContainer>
  );
};