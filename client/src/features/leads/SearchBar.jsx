function SearchBar({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, onAddLead }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
      <input
        type="text"
        placeholder="Search by name, email, or source..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
        </select>

        <button
        onClick={onAddLead}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
>
        + Add Lead
        </button>
      </div>
    </div>
  );
}

export default SearchBar;