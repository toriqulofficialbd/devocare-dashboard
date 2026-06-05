
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";

export default function CalendarHeader({
  currentDate, monthNames, shortMonthNames, month, year, daysInMonthCount,
  viewMode, setViewMode, handlePrevMonth, handleNextMonth, handleToday, handleAddEventClick, searchTerm, setSearchTerm
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-5 pb-5 border-b border-slate-200 bg-white p-4 rounded-2xl shadow-xs">

      {/* Dynamic left side date banner box */}
      <div className="flex items-center gap-4">
        {/* ✅ This block dynamically updates to match the current selected day value directly */}
        <div className="flex flex-col items-center justify-center border border-violet-100 rounded-xl bg-violet-50 p-2 min-w-[64px]">
          <span className="text-[10px] font-bold text-violet-700 uppercase">{shortMonthNames[month]}</span>
          <span className="text-xl font-bold">{currentDate.getDate()}</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg md:text-xl whitespace-nowrap font-semibold">{monthNames[month]} {year}</h2>
            <span className="px-2 py-1 text-xs  bg-slate-100 rounded-full font-medium md:whitespace-nowrap">
              Week {Math.ceil(currentDate.getDate() / 7)}
            </span>
          </div>
          <p className="text-xs text-slate-500">{shortMonthNames[month]} 1, {year} – {shortMonthNames[month]} {daysInMonthCount}, {year}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search child or staff..."
            value={searchTerm} // 👈 Controlled input binding
            onChange={(e) => setSearchTerm(e.target.value)} // 👈 Instant state mutator trigger
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-violet-500 lg:w-40 w-48 transition-all"
          />
        </div>

        <div className="inline-flex border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
          <button onClick={handlePrevMonth} className="p-2 border-r border-slate-100 hover:bg-slate-50"><ChevronLeft size={16} /></button>
          <button onClick={handleToday} className="px-4 text-sm font-semibold hover:bg-slate-50">Today</button>
          <button onClick={handleNextMonth} className="p-2 border-l border-slate-100 hover:bg-slate-50"><ChevronRight size={16} /></button>
        </div>

        <select value={viewMode} onChange={(e) => setViewMode(e.target.value)} className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white font-medium text-slate-700 cursor-pointer">
          <option>Month view</option>
          <option>Week view</option>
          <option>Day view</option>
        </select>

        <button onClick={handleAddEventClick} className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-violet-700 transition-colors">
          <Plus size={16} /> Add event
        </button>
      </div>
    </div>
  );
}
