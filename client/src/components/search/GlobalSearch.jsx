import { useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import useLeads from "../../hooks/useLeads";

function GlobalSearch() {
  const [query, setQuery] = useState("");
  const { leads } = useLeads();

  const search = query.toLowerCase().trim();

  const results =
    search.length > 0
      ? leads
          .filter((lead) =>
            [
              lead.name,
              lead.company,
              lead.email,
              lead.phone,
              lead.status,
              lead.source,
            ]
              .filter(Boolean)
              .some((field) => field.toLowerCase().includes(search))
          )
          .slice(0, 6)
      : [];

  return (
    <div className="relative w-80">
      <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-gray-50">
        <Search size={18} className="text-gray-400" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search leads..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      {results.length > 0 && (
        <div className="absolute top-12 left-0 w-full bg-white border border-gray-100 rounded-xl shadow-lg z-50 p-2">
          {results.map((lead) => (
            <Link
              key={lead._id || lead.id}
              to={`/leads/${lead._id || lead.id}`}
              onClick={() => setQuery("")}
              className="block px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <p className="font-medium text-sm">{lead.name}</p>
              <p className="text-xs text-gray-500">
                {lead.company || lead.email}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default GlobalSearch;