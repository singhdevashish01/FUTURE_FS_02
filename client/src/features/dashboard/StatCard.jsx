function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition hover:shadow-lg">
      <div
        className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}
      >
        <span className="text-white text-xl font-bold">
          {title.charAt(0)}
        </span>
      </div>

      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;