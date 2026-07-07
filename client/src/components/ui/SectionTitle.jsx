function SectionTitle({ title, description }) {
  return (
    <div className="mb-5">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>

      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
}

export default SectionTitle;