// Componente de los forms para darles estilo
const FormContainer = ({ children }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;