function EmptyState({ message }) {
  return (
    <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center">
      <h3 className="text-lg font-semibold text-gray-700">
        No Data Found
      </h3>

      <p className="text-gray-500 mt-2">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;