
import { Link } from "react-router-dom"; 
import { Menu } from "lucide-react";
import GlobalSearch from "../Header/GlobalSearch";
import StatusBadge from "../Header/StatusBadge";
import NotificationPanel from "../Header/NotificationPanel";
import AdminProfileDropdown from "../Header/AdminProfileDropdown";

export default function Header({ setIsSidebarOpen, currentPath }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#EAECF0] bg-white px-4 lg:px-8 shrink-0">
      
      {/* Left Navigation: Minimalist Dynamic Breadcrumb Links */}
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-all" 
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* 👑 Trendy Solution: Clean clickable route context map path tracker */}
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:flex items-center gap-1.5 select-none">
          <Link to="/" className="hover:text-slate-600 transition-colors">DevoCare</Link>
          <span className="text-slate-300 font-normal">/</span>
          <span className="text-slate-700 font-bold normal-case text-sm tracking-normal">
            {/* 👑 ১০০% ফিক্সড ইউআরএল লজিক: এখন রাউটিং পাথ অনুযায়ী হেডারের লেখা লাইভ পরিবর্তিত হবে */}
            {currentPath === "/settings" 
              ? "Admin Settings" 
              : currentPath === "/gmail" 
                ? "Inbox" 
                : "Overview"
            }
          </span>
        </div>
      </div>
      
      {/* Right Navigation: Search Filters, Live Badges & System Overlays */}
      <div className="flex items-center gap-4 sm:gap-5">
        <GlobalSearch />
        <div className="flex items-center gap-1.5">
          <StatusBadge />
          <NotificationPanel />
        </div>
        <AdminProfileDropdown />
      </div>

    </header>
  );
}
