function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="
          w-full
          border
          border-gray-300
          rounded-lg
          px-4
          py-2
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          outline-none
        "
      />
    </div>
  );
}

export default Input;