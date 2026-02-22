const FormError = ({ errorMsg }) => {
  return (
    <div className="bg-red-200 border-2 border-red-800 text-red-800 py-2 px-4 font-semibold text-center rounded-lg wrap-break-word">
      {errorMsg}
    </div>
  );
};

export default FormError;
