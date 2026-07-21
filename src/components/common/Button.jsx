function Button({
  children,
  type = "button",
  disabled = false,
  onClick,
  fullWidth = false,
  className = "",
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${fullWidth ? "w-full" : ""}
        bg-indigo-600
        hover:bg-indigo-700
        text-white
        py-3
        px-6
        rounded-xl
        font-semibold
        shadow-lg
        hover:shadow-xl
        transition-all
        duration-300
        hover:-translate-y-0.5
        disabled:bg-gray-400
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
