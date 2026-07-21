const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>

      <h2 className="mt-6 text-2xl font-bold text-gray-800">{message}</h2>

      <p className="mt-2 text-gray-500">Please wait...</p>
    </div>
  );
};

export default Loader;
