
import { Clock } from "lucide-react";

export default function MobileWeekView({ weekDatesList, daysOfWeek, currentDate, getEventsForSpecificDate, handleMouseDown, handleMouseUp }) {
  return (
    <div className="block lg:hidden w-full bg-white">
      {/* 📅 ৭টি দিনের ফিক্সড ক্যাপসুল রো বার */}
      <div className="grid grid-cols-7 divide-x divide-[#D0D5DD] border-b border-[#D0D5DD] w-full bg-white sticky top-0 z-30">
        {weekDatesList.map((dateItem, idx) => {
          const dayNum = dateItem.getDate();
          const monthNum = dateItem.getMonth();
          const isTodayActive = dayNum === currentDate.getDate() && monthNum === currentDate.getMonth();

          return (
            <div key={idx} className="py-2.5 text-center flex items-center justify-center bg-white min-w-0 h-12">
              <div className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                isTodayActive ? "bg-violet-600 text-white shadow-md" : "text-[#475467]"
              }`}>
                <span>{daysOfWeek[dateItem.getDay()]}</span>
                <span className={isTodayActive ? "text-white font-black" : "text-[#101828] font-bold"}>{dayNum}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 👑 হরাইজন্টাল রিবন স্ট্রিপ ইভেন্ট এরিয়া (স্ক্রিনশটের হুবহু কপি) */}
      <div className="grid grid-cols-7 divide-x divide-[#D0D5DD] w-full min-h-[160px] bg-[#F9FAFB]/20">
        {weekDatesList.map((dateItem, idx) => {
          const dayEvents = getEventsForSpecificDate(dateItem);
          const currentDayNumber = dateItem.getDate();

          return (
            <div 
              key={idx} 
              className="p-1 flex flex-col gap-1 min-h-[140px] bg-white transition-colors cursor-cell hover:bg-slate-50/50"
              onClick={() => handleMouseDown(currentDayNumber)}
              onMouseUp={handleMouseUp}
            >
              {dayEvents.map((event) => (
                <div 
                  key={event.id} 
                  onClick={(e) => e.stopPropagation()}
                  className={`w-full rounded-lg border p-1 shadow-xs transition-all flex flex-col justify-center text-left cursor-pointer hover:brightness-95 ${event.color}`}
                >
                  <span className="truncate block font-black text-[8px] leading-tight">{event.title}</span>
                  <span className="text-[7px] font-semibold opacity-85 mt-0.5 block truncate flex items-center gap-0.5">
                    <Clock size={8} /> {event.time.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
