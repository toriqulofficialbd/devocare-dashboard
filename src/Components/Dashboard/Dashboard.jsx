import React, { useState } from "react";
import { Calendar as CalendarIcon, Mail, Menu, X, Plus, ChevronLeft, ChevronRight, Grid, LayoutDashboard } from "lucide-react";
import CalendarView from "./CalendarView";
import GmailView from "./GmailView";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("calendar");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#FCFCFD] text-[#101828] font-sans antialiased selection:bg-violet-100">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[#EAECF0] bg-white p-5 transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between pb-6">
          <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-black">U</div>
            <span>Untitled UI</span>
          </div>
          <button className="lg:hidden p-1.5 hover:bg-slate-50 rounded-lg" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          <button 
            onClick={() => { setActiveTab("calendar"); setIsSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${activeTab === "calendar" ? "bg-violet-50 text-violet-700" : "text-[#344054] hover:bg-slate-50"}`}
          >
            <CalendarIcon className={`h-5 w-5 ${activeTab === "calendar" ? "text-violet-700" : "text-slate-500"}`} />
            Calendar
          </button>
          <button 
            onClick={() => { setActiveTab("gmail"); setIsSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${activeTab === "gmail" ? "bg-violet-50 text-violet-700" : "text-[#344054] hover:bg-slate-50"}`}
          >
            <Mail className={`h-5 w-5 ${activeTab === "gmail" ? "text-violet-700" : "text-slate-500"}`} />
            Gmail Inbox
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-[#EAECF0] bg-white px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 hover:bg-slate-50 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-6 w-6 text-slate-600" />
            </button>
            <h1 className="text-lg font-semibold capitalize text-[#101828] hidden sm:block">
              {activeTab} Management
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 transition-colors hidden sm:block">
              Get PRO
            </button>
            <img src="https://unsplash.com" alt="Avatar" className="h-9 w-9 rounded-full object-cover border border-slate-200" />
          </div>
        </header>

        {/* Dynamic View Component */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {activeTab === "calendar" ? <CalendarView /> : <GmailView />}
        </main>
      </div>
    </div>
  );
}
