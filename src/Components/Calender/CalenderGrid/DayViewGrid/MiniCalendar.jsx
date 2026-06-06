
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";

export default function MiniCalendar({ events, currentMonth, currentYear, currentDate, setCurrentDate, activeDayEvents }) {
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const daysInMonthCount = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const blankSlots = Array.from({ length: firstDayIndex }, (_, i) => i);
  const totalDaysArray = Array.from({ length: daysInMonthCount }, (_, i) => i + 1);

  return (
    <div className="border border-[#D0D5DD] bg-[#FCFCFD]/50 rounded-2xl p-4 flex flex-col gap-4 select-none h-[550px]">
     
      <div className="flex items-center justify-between shrink-0">
        <span className="text-xs font-black text-slate-800 uppercase tracking-wider">{monthNames[currentMonth]} {currentYear}</span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))} className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><ChevronLeft size={16} /></button>
          <button type="button" onClick={() => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))} className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"><ChevronRight size={16} /></button>
        </div>
      </div>

      
      <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1.5 shrink-0">
        {daysOfWeek.map((day, idx) => ( <div key={idx}>{day}</div> ))}
      </div>

    
      <div className="grid grid-cols-7 gap-y-1.5 text-center text-xs font-bold shrink-0">
        {blankSlots.map((_, idx) => ( <div key={`blank-${idx}`} /> ))}
        {totalDaysArray.map((day) => {
          const isSelectedDay = day === currentDate.getDate();
          const hasAnyEvent = events.some(e => day === e.startDay && e.month === currentMonth && e.year === currentYear);

          return (
            <div 
              key={day}
              onClick={() => setCurrentDate(new Date(currentYear, currentMonth, day))}
              className={`h-7 w-7 flex items-center justify-center rounded-full cursor-pointer mx-auto relative text-[11px] transition-all ${
                isSelectedDay ? "bg-violet-600 text-white font-black shadow-md shadow-violet-600/30" : "text-slate-700 hover:bg-violet-50 hover:text-violet-600"
              }`}
            >
              {day}
              {hasAnyEvent && !isSelectedDay && ( <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-violet-400" /> )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-[#D0D5DD] my-0.5 shrink-0" />

     
      <div className="flex-1 flex flex-col overflow-hidden">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block shrink-0">Product Demo Agenda</span>
        <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">
          {activeDayEvents.length === 0 ? (
            <p className="text-[11px] text-slate-400 italic py-6 text-center bg-white rounded-xl border border-dashed border-slate-200">No care duties assigned.</p>
          ) : (
            activeDayEvents.map(event => (
              <div key={event.id} className={`p-2.5 rounded-xl border bg-white shadow-xs flex flex-col gap-1 border-l-4 ${event.color.includes("orange") ? "border-l-orange-500" : event.color.includes("violet") ? "border-l-violet-500" : "border-l-blue-500"}`}>
                <div className="text-xs font-black text-slate-800 truncate">{event.title}</div>
                <span className="text-[9px] text-slate-500 font-medium flex items-center gap-1 mt-0.5"><Clock size={10} /> {event.time}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
