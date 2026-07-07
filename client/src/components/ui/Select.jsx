function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
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
          bg-white
        "
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;