import  { useEffect, useState, useRef } from "react";
import { Clock } from "lucide-react";

export default function WeekViewGrid({ events, currentMonth, currentYear, currentDate, handleMouseDown, handleMouseUp, setWeekDragHours }) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [now, setNow] = useState(new Date());
  
  // ড্র্যাগিং ট্র্যাকিং এবং লাইভ প্রিভিউ ওভারলে স্টেট
  const [isDraggingHour, setIsDraggingHour] = useState(false);
  const [startHourDrag, setStartHourDrag] = useState(9);
  const [currentLiveHour, setCurrentLiveHour] = useState(10);
  const gridRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const hoursTimeline = Array.from({ length: 24 }, (_, i) => {
    if (i === 0) return "12 AM";
    if (i === 12) return "12 PM";
    return i > 12 ? `${i - 12} PM` : `${i} AM`;
  });

  const getWeekDates = () => {
    const weekDates = [];
    const baseDate = new Date(currentYear, currentMonth, currentDate.getDate());
    const dayOfWeekIndex = baseDate.getDay();
    const sundayDate = new Date(baseDate);
    sundayDate.setDate(baseDate.getDate() - dayOfWeekIndex);

    for (let i = 0; i < 7; i++) {
      const clone = new Date(sundayDate);
      clone.setDate(sundayDate.getDate() + i);
      weekDates.push(clone);
    }
    return weekDates;
  };

  const fullWeekDatesList = getWeekDates();

  // 👑 👑 ১. মোবাইল রেস্পনসিভ সিঙ্ক: ল্যাপটপে ৭ কলাম, কিন্তু মোবাইলে ৩টি কলাম চমৎকার চওড়া লুকে দেখাবে
  const isMobile = window.innerWidth < 640;
  const weekDatesList = isMobile 
    ? fullWeekDatesList.filter(d => Math.abs(d.getDate() - currentDate.getDate()) <= 1).slice(0, 3)
    : fullWeekDatesList;

  const getEventsForSpecificDate = (dateObj) => {
    return events.filter(e => 
      dateObj.getDate() === e.startDay && 
      dateObj.getMonth() === e.month && 
      dateObj.getFullYear() === e.year
    );
  };

  const calculateHourFromY = (e) => {
    if (!gridRef.current) return 9;
    const rect = gridRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const exactHour = Math.floor(relativeY / 64); 
    return Math.max(0, Math.min(23, exactHour));
  };

  const handleGridMouseDown = (e, dayNum) => {
    const clickedHour = calculateHourFromY(e);
    setIsDraggingHour(true);
    setStartHourDrag(clickedHour);
    setCurrentLiveHour(clickedHour);
    setWeekDragHours({ start: clickedHour, end: clickedHour + 1 });
    handleMouseDown(dayNum); 
  };

  const handleGridMouseMove = (e) => {
    if (!isDraggingHour) return;
    const currentHourDrag = calculateHourFromY(e);
    setCurrentLiveHour(currentHourDrag); // লাইভ প্রিভিউ শ্যাডো আপডেট করবে
    
    setWeekDragHours({
      start: Math.min(startHourDrag, currentHourDrag),
      end: Math.max(startHourDrag, currentHourDrag) + 1
    });
  };

  const handleGridMouseUp = () => {
    if (isDraggingHour) {
      setIsDraggingHour(false);
      handleMouseUp(); 
    }
  };

  const topPositionOffset = (now.getHours() * 64) + (now.getMinutes() * (64 / 60));

  // লাইভ ড্র্যাগিং লেয়ারের টপ এবং হাইট ক্যালকুলেশন
  const dragTop = Math.min(startHourDrag, currentLiveHour) * 64;
  const dragHeight = (Math.abs(currentLiveHour - startHourDrag) + 1) * 64;

  return (
    <div className="flex flex-col h-[600px] bg-white animate-in fade-in duration-150 select-none font-sans relative" onMouseUp={handleGridMouseUp}>
      
      {/* 📅 সপ্তাহের বার এবং তারিখের ফিক্সড টপ রো বার */}
      <div className="grid grid-cols-[64px_1fr] sm:grid-cols-[80px_1fr] border-b border-[#D0D5DD] bg-white shrink-0 sticky top-0 z-30 shadow-xs">
        <div className="border-r border-[#D0D5DD] bg-[#F9FAFB]/50" />
        
        <div className={`grid grid-cols-${weekDatesList.length} divide-x divide-[#D0D5DD]`}>
          {weekDatesList.map((dateItem, idx) => {
            const dayNum = dateItem.getDate();
            const monthNum = dateItem.getMonth();
            const isTodayActive = dayNum === currentDate.getDate() && monthNum === currentDate.getMonth();

            return (
              <div key={idx} className="py-2 text-center flex items-center justify-center bg-white min-w-0 h-14">
                <div className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
                  isTodayActive ? "bg-violet-600 text-white shadow-md shadow-violet-600/20" : "text-[#475467]"
                }`}>
                  <span className={isTodayActive ? "text-white" : "text-[#475467] font-semibold"}>
                    {daysOfWeek[dateItem.getDay()]}
                  </span>
                  <span className={isTodayActive ? "text-white font-black" : "text-[#101828] font-bold"}>
                    {dayNum}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ⏰ ২৪ ঘণ্টার আওয়ার্লি টাইমলাইন বডি */}
      <div className="flex-1 overflow-y-auto grid grid-cols-[64px_1fr] sm:grid-cols-[80px_1fr] bg-white relative">
        
        {/* বামপাশের ফিক্সড টাইম লেবেল কলাম */}
        <div className="border-r border-[#D0D5DD] bg-[#F9FAFB]/60 text-right pr-2 sm:pr-3 select-none z-10 relative">
          {hoursTimeline.map((hour, idx) => (
            <div key={idx} className="h-16 text-[10px] font-bold text-[#475467] pt-1.5 whitespace-nowrap tracking-tight">{hour}</div>
          ))}
          <div style={{ top: `${topPositionOffset - 10}px` }} className="absolute right-2 text-[10px] font-black text-violet-600 bg-white px-1 rounded-sm shadow-xs border border-violet-100 z-30">
            {now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
          </div>
        </div>

        {/* ডানপাশের মেইন ইভেন্ট টাইমলাইন গ্রিড কন্টেইনার */}
        <div 
          ref={gridRef}
          onMouseMove={handleGridMouseMove}
          className={`grid grid-cols-${weekDatesList.length} relative bg-[#F9FAFB]/10 divide-x divide-[#D0D5DD] h-[1536px]`}
        >
          {/* গ্লোবাল রিয়াল-টাইম পার্পল ইন্ডিকেটর লাইন */}
          <div style={{ top: `${topPositionOffset}px` }} className="absolute left-0 right-0 h-px bg-violet-500 z-25 pointer-events-none flex items-center">
            <div className="h-2 w-2 rounded-full bg-violet-600 -ml-1 ring-4 ring-violet-500/20" />
          </div>

          {/* 👑 👑 ২. নতুন ফিডব্যাক ফিচার: মাস ভিউর মতো উইক ভিউতেও ড্র্যাগ করার সময় লাইভ পার্পল সিলেকশন শ্যাডো ওভারলে লেয়ার দেখাবে */}
          {isDraggingHour && (
            <div 
              style={{ top: `${dragTop}px`, height: `${dragHeight}px` }}
              className="absolute left-0 right-0 bg-violet-500/10 border-y border-dashed border-violet-400 z-10 pointer-events-none transition-all duration-75"
            />
          )}

          {/* ব্যাকগ্রাউন্ড বর্ডার গাইডলাইনস */}
          <div className="absolute inset-0 flex flex-col pointer-events-none z-0 divide-y divide-[#D0D5DD]">
            {hoursTimeline.map((_, idx) => (
              <div key={idx} className="h-16 w-full relative">
                <div className="absolute top-1/2 left-0 right-0 h-px border-b border-dashed border-[#EAECF0]" />
              </div>
            ))}
          </div>

          {/* ডাইনামিক ইভেন্ট ব্যানার কার্ড রেন্ডার স্লটস */}
          {weekDatesList.map((dateItem, idx) => {
            const dayEvents = getEventsForSpecificDate(dateItem);
            const currentDayNumber = dateItem.getDate();

            return (
              <div 
                key={idx} 
                className="h-full relative p-0.5 cursor-cell min-w-0 z-10 select-none"
                onMouseDown={(e) => handleGridMouseDown(e, currentDayNumber)}
              >
                {dayEvents.map((event) => {
                  const startHourVal = event.startHour !== undefined ? event.startHour : 9;
                  const durationVal = event.durationHours !== undefined ? event.durationHours : 1;
                  const computedTop = startHourVal * 64; 
                  const computedHeight = durationVal * 64;

                  return (
                    <div 
                      key={event.id} 
                      style={{ top: `${computedTop}px`, height: `${computedHeight}px` }}
                      onMouseDown={(e) => e.stopPropagation()} 
                      className={`absolute inset-x-1 sm:inset-x-1.5 rounded-xl border p-1.5 sm:p-2 shadow-xs transition-all flex flex-col justify-start overflow-hidden text-left z-20 cursor-pointer hover:brightness-95 ${event.color}`}
                    >
                      <span className="truncate leading-none block font-black text-[9px] sm:text-[10px] mb-1">{event.title}</span>
                      <span className="text-[8px] font-semibold opacity-90 block truncate flex items-center gap-0.5">
                        <Clock size={9} /> {event.time}
                      </span>
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
