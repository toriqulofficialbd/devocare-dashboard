
import { Clock } from "lucide-react";

export default function PCWeekView({ 
  weekDatesList, daysOfWeek, hoursTimeline, currentDate, topPositionOffset, formattedLiveTime, getEventsForSpecificDate, handleMouseDown 
}) {
  return (
    <div className="hidden lg:flex flex-col w-full">
      {/* 📅 ল্যাপটপের টপ হেডার বার */}
      <div className="grid grid-cols-[80px_1fr] border-b border-[#D0D5DD] bg-white shrink-0 sticky top-0 z-30">
        <div className="border-r border-[#D0D5DD] bg-[#F9FAFB]/50" />
        <div className="grid grid-cols-7 divide-x divide-[#D0D5DD] w-full">
          {weekDatesList.map((dateItem, idx) => {
            const dayNum = dateItem.getDate();
            const monthNum = dateItem.getMonth();
            const isTodayActive = dayNum === currentDate.getDate() && monthNum === currentDate.getMonth();

            return (
              <div key={idx} className="py-3 text-center flex items-center justify-center bg-white min-w-0 h-14">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  isTodayActive ? "bg-violet-600 text-white shadow-md shadow-violet-600/20" : "text-[#475467]"
                }`}>
                  <span className={isTodayActive ? "text-white" : "text-[#475467] font-semibold"}>{daysOfWeek[dateItem.getDay()]}</span>
                  <span className={isTodayActive ? "text-white font-black" : "text-[#101828] font-bold"}>{dayNum}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ⏰ ল্যাপটপের ২৪ ঘণ্টার স্ক্রলযোগ্য মেইন গ্রিড বডি */}
      <div className="h-[600px] overflow-y-auto grid grid-cols-[80px_1fr] bg-white relative">
        <div className="border-r border-[#D0D5DD] bg-[#F9FAFB]/60 text-right pr-3 select-none z-10 relative">
          {hoursTimeline.map((hour, idx) => (
            <div key={idx} className="h-16 text-[10px] font-bold text-[#475467] pt-1.5 whitespace-nowrap tracking-tight">{hour}</div>
          ))}
          <div style={{ top: `${topPositionOffset - 10}px` }} className="absolute right-2 text-[10px] font-black text-violet-600 bg-white px-1 rounded-sm shadow-xs border border-violet-100 z-30">
            {formattedLiveTime}
          </div>
        </div>

        <div className="grid grid-cols-7 relative divide-x divide-[#D0D5DD] h-[1536px] bg-[#F9FAFB]/10">
          {/* লাইভ পার্পল ইন্ডিকেটর লাইন */}
          <div style={{ top: `${topPositionOffset}px` }} className="absolute left-0 right-0 h-px bg-violet-500 z-25 pointer-events-none flex items-center">
            <div className="h-2 w-2 rounded-full bg-violet-600 -ml-1 ring-4 ring-violet-500/20" />
          </div>

          {/* ব্যাকগ্রাউন্ড বর্ডার গাইডলাইনস */}
          <div className="absolute inset-0 flex flex-col pointer-events-none z-0 divide-y divide-[#D0D5DD]">
            {hoursTimeline.map((_, idx) => (
              <div key={idx} className="h-16 w-full relative">
                <div className="absolute top-1/2 left-0 right-0 h-px border-b border-dashed border-[#EAECF0]" />
              </div>
            ))}
          </div>

          {/* ইভেন্ট ব্যানার কার্ড রেন্ডার স্লটস */}
          {weekDatesList.map((dateItem, idx) => {
            const dayEvents = getEventsForSpecificDate(dateItem);
            return (
              <div key={idx} className="h-full relative p-0.5 cursor-cell min-w-0 z-10" onMouseDown={() => handleMouseDown(dateItem.getDate())}>
                {dayEvents.map((event) => {
                  const startHourVal = event.startHour !== undefined ? event.startHour : 9;
                  const durationVal = event.durationHours !== undefined ? event.durationHours : 1;
                  return (
                    <div 
                      key={event.id} 
                      style={{ top: `${startHourVal * 64}px`, height: `${durationVal * 64}px` }}
                      onMouseDown={(e) => e.stopPropagation()} 
                      className={`absolute inset-x-1.5 rounded-xl border p-2 shadow-xs transition-all flex flex-col justify-start overflow-hidden text-left z-30 cursor-pointer hover:brightness-95 ${event.color}`}
                    >
                      <span className="truncate leading-none block font-black text-[10px] mb-1">{event.title}</span>
                      <span className="text-[8px] font-semibold opacity-90 block truncate flex items-center gap-0.5"><Clock size={9} /> {event.time}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
