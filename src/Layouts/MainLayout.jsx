import  { useState } from "react";
import { Outlet, useNavigation, Link, useLocation } from "react-router-dom";
import { Calendar as CalendarIcon, Mail, Menu, X, Settings, Search, Bell, Globe } from "lucide-react";
import Loader from "../Loader/Loader";

const MainLayout = () => {
  const navigation = useNavigation(); 
  const location = useLocation(); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="relative flex h-screen w-screen bg-[#FCFCFD] text-[#101828] font-sans antialiased overflow-hidden">
      
      {/* ⏳ গ্লোবাল লোডার (পেজ পরিবর্তনের ট্র্যানজিশন) */}
      {navigation.state === "loading" && (
        <div className="fixed  flex items-center justify-center bg-white/60 backdrop-blur-xs transition-all">
          <Loader />
        </div>
      )}

      {/* 📱 মোবাইল স্ক্রিন ব্লার ওভারলে */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-slate-900/20 backdrop-blur-xs lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 🗂️ মডার্ন সাইডবার (DevoCare) */}
      <aside className={`fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-[#EAECF0] bg-white p-5 transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* ব্র্যান্ড লোগো এবং নাম */}
        <div className="flex items-center justify-between pb-6 border-b border-[#EAECF0] mb-4">
          <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-black shadow-sm">D</div>
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">DevoCare</span>
          </div>
          <button className="lg:hidden p-1.5 hover:bg-slate-50 rounded-lg text-slate-500" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* রাউটিং লিঙ্কস */}
        <nav className="flex-1 space-y-1">
          <Link 
            to="/" 
            onClick={() => setIsSidebarOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${isActive("/") ? "bg-violet-50 text-violet-700 shadow-xs" : "text-[#344054] hover:bg-slate-50"}`}
          >
            <CalendarIcon className={`h-5 w-5 ${isActive("/") ? "text-violet-700" : "text-slate-500"}`} />
            Calendar & Schedule
          </Link>

          <Link 
            to="/gmail" 
            onClick={() => setIsSidebarOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${isActive("/gmail") ? "bg-violet-50 text-violet-700 shadow-xs" : "text-[#344054] hover:bg-slate-50"}`}
          >
            <Mail className={`h-5 w-5 ${isActive("/gmail") ? "text-violet-700" : "text-slate-500"}`} />
            Gmail Inbox
          </Link>
        </nav>

        {/* সাইডবার ফুটনোট */}
        <div className="pt-4 border-t border-[#EAECF0] text-[11px] font-medium text-slate-400 flex items-center gap-2">
          <Settings className="h-3.5 w-3.5" />
          <span>v1.0.0 • 2026 Edition</span>
        </div>
      </aside>

      {/* 💻 মেইন অ্যাপ্লিকেশন এরিয়া */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* ⚡ ইনটিগ্রেটেড হেডার */}
        <header className="flex h-16 items-center justify-between border-b border-[#EAECF0] bg-white px-4 lg:px-8 shrink-0">
          
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 hover:bg-slate-50 rounded-lg text-slate-600" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:block">
              DevoCare / <span className="text-slate-800 font-bold normal-case text-sm tracking-normal">{location.pathname === "/" ? "Care Schedule" : "Gmail Inbox"}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-5">
            {/* সার্চবার */}
            <div className="relative hidden md:block w-48 lg:w-64">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search duties or children..."
                className="w-full bg-[#F9FAFB] rounded-lg border border-[#D0D5DD] pl-9 pr-4 py-1.5 text-xs text-[#101828] focus:border-violet-500 focus:outline-hidden focus:ring-4 focus:ring-violet-500/10 transition-all"
              />
            </div>

            {/* ল্যাঙ্গুয়েজ এবং নোটিফিকেশন */}
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-lg transition-colors" title="Toggle Language">
                <Globe className="h-4.5 w-4.5" />
              </button>
              <button className="p-2 hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-lg transition-colors relative">
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
              </button>
            </div>

            {/* প্রোফাইল সেকশন */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-[#EAECF0]">
              <img
                src="https://unsplash.com"
                alt="Admin"
                className="h-8 w-8 rounded-full object-cover border border-[#EAECF0] shadow-xs"
              />
              {/* ✅ সঠিক কোড: প্রথমে hidden (মোবাইলে লুকানো), তারপর lg:flex (বড় স্ক্রিনে ফ্লেক্স হবে) */}
<div className="hidden lg:flex flex-col text-left">
  <span className="text-xs font-bold text-[#101828] block leading-none">Amina Rahman</span>
  <span className="text-[10px] font-medium text-slate-400 block mt-1">Super Admin</span>
</div>

            </div>
          </div>
        </header>

        {/* 🧩 ডাইনামিক ভিউ কন্টেইনার */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[#FCFCFD]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
