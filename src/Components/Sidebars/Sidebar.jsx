
import { Link } from "react-router-dom";
import { Calendar as CalendarIcon, Mail, X, Settings } from "lucide-react";

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, currentPath }) {
  const isActive = (path) => currentPath === path;

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-[#EAECF0] bg-white p-5 transition-transform duration-300 lg:static lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Workspace Brand Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#EAECF0] mb-4">
        <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-black shadow-sm">D</div>
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">DevoCare</span>
        </div>
        <button 
          className="lg:hidden p-1.5 hover:bg-slate-50 rounded-lg text-slate-500" 
          onClick={() => setIsSidebarOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

     
      <nav className="flex-1 space-y-1">
        <Link 
          to="/" 
          onClick={() => setIsSidebarOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
            isActive("/") ? "bg-violet-50 text-violet-700 shadow-xs" : "text-[#344054] hover:bg-slate-50"
          }`}
        >
          <CalendarIcon className={`h-5 w-5 ${isActive("/") ? "text-violet-700" : "text-slate-500"}`} />
          Calendar & Schedule
        </Link>
        <Link 
          to="/gmail" 
          onClick={() => setIsSidebarOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
            isActive("/gmail") ? "bg-violet-50 text-violet-700 shadow-xs" : "text-[#344054] hover:bg-slate-50"
          }`}
        >
          <Mail className={`h-5 w-5 ${isActive("/gmail") ? "text-violet-700" : "text-slate-500"}`} />
          Gmail Inbox
        </Link>
      </nav>

     
      <div className="pt-4 border-t border-[#EAECF0] text-[11px] font-medium text-slate-400 flex items-center gap-2">
        <Settings className="h-3.5 w-3.5" />
        <span>v1.0.0 • 2026 Edition</span>
      </div>
    </aside>
  );
}
