import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({ label, placeholder, register, error }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register}
          className="
            w-full
            px-4
            py-3
            pr-12
            border
            border-gray-300
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            focus:border-indigo-500
          "
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-500
            hover:text-indigo-600
          "
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default PasswordInput;
