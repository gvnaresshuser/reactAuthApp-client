function Input({ label, type, placeholder, register, error }) {
  return (
    <div className="mb-6">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="
          w-full
          px-4
          py-1
          border
          border-gray-300
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
        "
      />

      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default Input;
