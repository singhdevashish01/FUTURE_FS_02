import { Bell, CircleUserRound } from "lucide-react";

function Navbar({ title }) {
  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-6">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>

      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer" size={22} />

        <div className="flex items-center gap-2">
          <CircleUserRound size={28} />
          <span className="font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;