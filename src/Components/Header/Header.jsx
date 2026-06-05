import { Link } from "react-router-dom"; 
import { Menu } from "lucide-react";
import GlobalSearch from "../Header/GlobalSearch";
import StatusBadge from "../Header/StatusBadge";
import NotificationPanel from "../Header/NotificationPanel";
import AdminProfileDropdown from "../Header/AdminProfileDropdown";

export default function Header({ setIsSidebarOpen, currentPath }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#EAECF0] bg-white px-4 lg:px-6 shrink-0 w-full">
      
      {/* Left Navigation: Minimalist Dynamic Breadcrumb Links */}
      {/* 💡 whitespace-nowrap এবং shrink-0 নিশ্চিত করবে এটি কখনোই সার্চের নিচে নামবে না */}
      <div className="flex items-center gap-3 shrink-0 whitespace-nowrap mr-4">
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
      {/* 💡 flex-1 এবং w-full সার্চবারকে মাঝখানের ফাঁকা জায়গায় লিমিটেড রাখবে */}
      <div className="flex items-center justify-end gap-3 md:gap-4 lg:gap-5 flex-1 min-w-0">
        
        {/* 💡 এই wrapper-টি ১০২৪ পিক্সেল স্ক্রিনে সার্চবারকে অতিরিক্ত বড় হতে দেবে না */}
        <div className="w-full max-w-[240px] md:max-w-xs lg:max-w-sm xl:max-w-md min-w-[150px]">
          <GlobalSearch />
        </div>
        
        <div className="flex items-center gap-1.5 shrink-0">
          <StatusBadge />
          <NotificationPanel />
        </div>
        
        <div className="shrink-0">
          <AdminProfileDropdown />
        </div>
      </div>

    </header>
  );
}
