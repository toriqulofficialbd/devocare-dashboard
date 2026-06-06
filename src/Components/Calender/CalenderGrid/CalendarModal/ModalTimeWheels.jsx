

export default function ModalTimeWheels({ startHour, setStartHour, startPeriod, setStartPeriod, endHour, setEndHour, endPeriod, setEndPeriod, hourOptions }) {
  return (
    <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3 animate-in slide-in-from-top-2 duration-150">
     
      <div className="flex flex-col gap-1">
        <label className="block text-xs font-semibold text-slate-700">Start Time</label>
        <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
          <select value={startHour} onChange={(e) => setStartHour(e.target.value)} className="flex-1 bg-white rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold text-slate-800 outline-none cursor-pointer">
            {hourOptions.map((h, i) => <option key={i} value={h}>{h}</option>)}
          </select>
          <div className="flex bg-slate-200 rounded-lg p-0.5 shrink-0 select-none">
            <button type="button" onClick={() => setStartPeriod("AM")} className={`px-2 py-0.5 text-[10px] font-black rounded-md transition-all ${startPeriod === "AM" ? "bg-white text-violet-600 shadow-xs" : "text-slate-500"}`}>AM</button>
            <button type="button" onClick={() => setStartPeriod("PM")} className={`px-2 py-0.5 text-[10px] font-black rounded-md transition-all ${startPeriod === "PM" ? "bg-white text-violet-600 shadow-xs" : "text-slate-500"}`}>PM</button>
          </div>
        </div>
      </div>

      
      <div className="flex flex-col gap-1">
        <label className="block text-xs font-semibold text-slate-700">End Time</label>
        <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
          <select value={endHour} onChange={(e) => setEndHour(e.target.value)} className="flex-1 bg-white rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold text-slate-800 outline-none cursor-pointer">
            {hourOptions.map((h, i) => <option key={i} value={h}>{h}</option>)}
          </select>
          <div className="flex bg-slate-200 rounded-lg p-0.5 shrink-0 select-none">
            <button type="button" onClick={() => setEndPeriod("AM")} className={`px-2 py-0.5 text-[10px] font-black rounded-md transition-all ${endPeriod === "AM" ? "bg-white text-violet-600 shadow-xs" : "text-slate-500"}`}>AM</button>
            <button type="button" onClick={() => setEndPeriod("PM")} className={`px-2 py-0.5 text-[10px] font-black rounded-md transition-all ${endPeriod === "PM" ? "bg-white text-violet-600 shadow-xs" : "text-slate-500"}`}>PM</button>
          </div>
        </div>
      </div>
    </div>
  );
}
