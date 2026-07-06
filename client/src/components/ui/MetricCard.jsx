function MetricCard({ title, value, subtitle, icon, accent = "blue" }) {
  const accentClasses = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    slate: "bg-slate-100 text-slate-700",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between mb-5">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            accentClasses[accent]
          }`}
        >
          {icon}
        </div>
      </div>

      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>

      {subtitle && (
        <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
      )}
    </div>
  );
}

export default MetricCard;