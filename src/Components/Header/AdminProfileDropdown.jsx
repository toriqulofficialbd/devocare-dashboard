import  { useState } from "react";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 👈 নেভিগেশনের জন্য ইম্পোর্ট করুন
import { useApp } from "../../Context/AppContext";

export default function AdminProfileDropdown() {
  const { user, logout } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // 👈 নেভিগেট ফাংশন ডিক্লেয়ারেশন

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 pl-2 border-l border-[#EAECF0] cursor-pointer group select-none"
      >
        <img src={user?.avatar} alt="Admin" className="h-8 w-8 rounded-full object-cover border border-[#EAECF0] shadow-xs" />
        <div className="hidden lg:flex flex-col text-left">
          <span className="text-xs font-bold text-[#101828] block leading-none">{user?.name}</span>
          <span className="text-[10px] font-medium text-slate-400 block mt-1">{user?.role}</span>
        </div>
        <ChevronDown size={12} className={`text-slate-400 hidden lg:block transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-11 w-44 bg-white border border-[#EAECF0] rounded-xl shadow-xl z-[100] p-1 space-y-0.5 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* 👑 ট্রেন্ডি ফিক্স: ক্লিক করলে ইউআরএল বারে /settings নিয়ে যাবে */}
            <button 
              onClick={() => { navigate("/settings"); setIsOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-lg flex items-center gap-2 transition-colors"
            >
              <User size={14} className="text-slate-400" /> My Profile
            </button>
            <button 
              onClick={() => { navigate("/settings"); setIsOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Settings size={14} className="text-slate-400" /> Settings
            </button>
            <div className="border-t border-[#EAECF0] my-1" />
            <button 
              onClick={() => { logout(); setIsOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors"
            >
              <LogOut size={14} className="text-red-400" /> Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
