import { CircleUserRound } from "lucide-react";

import NotificationBell from "../notifications/NotificationBell";
import GlobalSearch from "../search/GlobalSearch";

function Navbar({ title }) {
  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <h2 className="text-2xl font-semibold">{title}</h2>

        <GlobalSearch />
      </div>

      <div className="flex items-center gap-5">
        <NotificationBell />

        <div className="flex items-center gap-2">
          <CircleUserRound size={28} />

          <div className="flex flex-col leading-tight">
            <span className="font-medium">Admin</span>

            <span className="text-xs text-gray-500">
              Sales Administrator
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;