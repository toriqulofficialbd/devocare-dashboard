import  { useEffect, useState } from "react";
import { Clock, Calendar } from "lucide-react";

export default function DayTimeline({ currentDate, currentMonth, currentYear, activeDayEvents, handleMouseDown }) {
  const [now, setNow] = useState(new Date());
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const hoursTimeline = Array.from({ length: 24 }, (_, i) => {
    if (i === 0) return "12 AM";
    if (i === 12) return "12 PM";
    return i > 12 ? `${i - 12} PM` : `${i} AM`;
  });

  // প্রতি ১ ঘণ্টা = ৯৬ পিক্সেল ধরে লাইভ রেখার অফসেট পজিশন
  const topPositionOffset = (now.getHours() * 96) + (now.getMinutes() * (96 / 60));

  return (
    <div className="border border-[#D0D5DD] rounded-2xl overflow-hidden flex flex-col h-[550px] bg-white">
      {/* টপ ফিক্সড ইনফো বার */}
      <div className="p-3.5 border-b border-[#D0D5DD] bg-white text-xs font-bold text-slate-800 flex items-center gap-2 select-none shrink-0">
        <Calendar size={14} className="text-violet-500" />
        Timeline: {currentDate.getDate()} {monthNames[currentMonth]}, {currentYear}
      </div>

      {/* স্ক্রলযোগ্য ২৪ ঘণ্টার টাইম ক্যানভাস */}
      <div className="flex-1 overflow-y-auto grid grid-cols-[65px_1fr] bg-white relative">
        {/* বামপাশের ফিক্সড টাইম লেবেল */}
        <div className="border-r border-[#D0D5DD] bg-[#F9FAFB]/60 text-right pr-2 select-none z-10 relative">
          {hoursTimeline.map((hour, idx) => (
            <div key={idx} className="h-24 text-[10px] font-bold text-[#475467] pt-1.5 whitespace-nowrap tracking-tight">{hour}</div>
          ))}
          <div style={{ top: `${topPositionOffset - 10}px` }} className="absolute right-1 text-[8px] font-black text-violet-600 bg-white px-0.5 rounded-sm shadow-xs border border-violet-100 z-30">
            {now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
          </div>
        </div>

        {/* ডানপাশের ইভেন্ট গ্রিড কন্টেইনার (উচ্চতা ২৩MD৪ পিক্সেল ফিক্সড) */}
        <div className="relative bg-[#F9FAFB]/10 h-[2304px]" onMouseDown={() => handleMouseDown(currentDate.getDate())}>
          {/* গ্লোবাল লাইভ টাইম পার্পল ইন্ডিকেটর লাইন */}
          <div style={{ top: `${topPositionOffset}px` }} className="absolute left-0 right-0 h-px bg-violet-500 z-25 pointer-events-none flex items-center">
            <div className="h-2 w-2 rounded-full bg-violet-600 -ml-1 ring-4 ring-violet-500/20" />
          </div>

          {/* ব্যাকগ্রাউন্ড বর্ডার গাইডলাইনস এবং ৩০ মিনিটের ড্যাশড সেপারেটরস */}
          <div className="absolute inset-0 flex flex-col pointer-events-none z-0 divide-y divide-[#D0D5DD]">
            {hoursTimeline.map((_, idx) => (
              <div key={idx} className="h-24 w-full relative">
                <div className="absolute top-1/2 left-0 right-0 h-px border-b border-dashed border-[#EAECF0]" />
              </div>
            ))}
          </div>

          {/* ইভেন্ট কার্ড রেন্ডার স্লটস */}
          <div className="absolute inset-0 z-10 p-1">
            {activeDayEvents.map((event) => {
              const startHourVal = event.startHour !== undefined ? event.startHour : 9;
              const durationVal = event.durationHours !== undefined ? event.durationHours : 1;
              return (
                <div 
                  key={event.id} 
                  style={{ top: `${startHourVal * 96}px`, height: `${durationVal * 96}px` }}
                  onMouseDown={(e) => e.stopPropagation()} 
                  className={`absolute inset-x-2 rounded-xl border p-2.5 shadow-xs transition-all flex flex-col justify-start overflow-hidden text-left z-30 cursor-pointer hover:brightness-95 ${event.color}`}
                >
                  <span className="truncate leading-none block font-black text-[10px] mb-1">{event.title}</span>
                  <span className="text-[8px] font-semibold opacity-90 block truncate flex items-center gap-0.5"><Clock size={9} /> {event.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
