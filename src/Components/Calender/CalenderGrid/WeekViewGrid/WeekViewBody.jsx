
import { Clock } from "lucide-react";

export default function WeekViewBody({
  hoursTimeline,
  topPositionOffset,
  now,
  gridRef,
  handleGridMouseMove,
  isDraggingHour,
  dragTop,
  dragHeight,
  weekDatesList,
  getEventsForSpecificDate,
  handleGridMouseDown
}) {
  return (
    <div className="flex-1 overflow-y-auto grid grid-cols-[65px_1fr] bg-white relative">
      
      {/* বামপাশের ফিক্সড ২৪ ঘণ্টার টাইম লেবেল কলাম (h-24 উচ্চতা সিঙ্কড) */}
      <div className="border-r border-[#D0D5DD] bg-violet-50 text-right lg:pr-1.5 pr-3 select-none z-10 relative">
        {hoursTimeline.map((hour, idx) => (
          <div key={idx} className="h-24 lg:text-[10px] text-[10px] font-bold  text-[#475467] pt-1.5 whitespace-nowrap tracking-tight">
            {hour}
          </div>
        ))}
        <div 
          style={{ top: `${topPositionOffset - 20}px` }} 
          className="absolute lg:right-0.5 right-2 lg:text-[8px] text-[10px] font-black text-violet-600 bg-white px-0.5 rounded-sm shadow-xs border border-violet-100 z-30"
        >
          {now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
        </div>
      </div>

      {/* ৩. মেইন ইভেন্ট টাইমলাইন গ্রিড বডি (h-2304px কলাম সিঙ্কড) */}
      <div 
        ref={gridRef} 
        onMouseMove={handleGridMouseMove} 
        className="grid grid-cols-7 relative bg-[#F9FAFB]/10 lg:divide-x overflow-x-auto divide-[#ddd0d0] h-[2304px]" // 👑 ফিক্স: ২৪ ঘণ্টা * ৯৬ পিক্সেল (h-24) = ২৩MD৪ পিক্সেল লক করা হলো
      >
        {/* গ্লোবাল লাইভ টাইম পার্পল রেখা */}
        <div style={{ top: `${topPositionOffset}px` }} className="absolute left-0 right-0 h-px bg-violet-500 z-25 pointer-events-none flex items-center">
          <div className="h-2 w-2 rounded-full bg-violet-600 -ml-1 ring-4 ring-violet-500/20" />
        </div>

        {/* লাইভ ড্র্যাগ শ্যাডো প্রিভিউ লেয়ার */}
        {isDraggingHour && (
          <div 
            style={{ top: `${dragTop}px`, height: `${dragHeight}px` }}
            className="absolute left-0 right-0 bg-violet-500/10 border-y border-dashed border-violet-400 z-20 pointer-events-none"
          />
        )}

        {/* ব্যাকগ্রাউন্ড বর্ডার গাইডলাইনস এবং ৩০ মিনিটের ড্যাশড সেপারেটরস */}
        <div className="absolute inset-0 flex flex-col pointer-events-none z-0 divide-y divide-[#D0D5DD]">
          {hoursTimeline.map((_, idx) => (
            <div key={idx} className="h-24 w-full relative"> {/* 👑 ফিক্স: উচ্চতা h-16 থেকে বাড়িয়ে h-24 বা ৯৬ পিক্সেল সিঙ্ক করা হলো */}
              <div className="absolute top-1/2 left-0 right-0 h-px border-b border-dashed border-[#EAECF0]" />
            </div>
          ))}
        </div>

        {/* dynamic runtime weekly date cell blocks mapping */}
        {weekDatesList.map((dateItem, idx) => {
          const dayEvents = getEventsForSpecificDate(dateItem);

          return (
            <div 
              key={idx} 
              className="h-full relative lg:p-px p-0.5 cursor-cell lg:min-w-0 min-w-32 z-10 select-none"
              onMouseDown={(e) => handleGridMouseDown(e, dateItem)}
            >
              {dayEvents.map((event) => {
                const startHourVal = event.startHour !== undefined ? event.startHour : 9;
                const durationVal = event.durationHours !== undefined ? event.durationHours : 1;
                
                // 👑 ফিক্স: ইভেন্ট কার্ডের টপ এবং উচ্চতা গুণিতক ৯৬ পিক্সেল (h-24 রুলস) এ সিঙ্কড করা হলো
                const computedTop = startHourVal * 96; 
                const computedHeight = durationVal * 96; 

                return (
                  <div 
                    key={event.id} 
                    style={{ top: `${computedTop}px`, height: `${computedHeight}px` }}
                    onMouseDown={(e) => e.stopPropagation()} 
                    className={`absolute lg:inset-x-0.5 lg:rounded-md rounded-xl border p-1 shadow-xs transition-all flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start overflow-hidden text-left z-30 cursor-pointer hover:brightness-95 ${event.color}`}
                  >
                    <span className="truncate leading-none block font-black lg:text-[8px] text-[10px] sm:mb-1 shrink-0">{event.title}</span>
                    <span className="text-[7px] sm:text-[8px] font-semibold opacity-90 lg:block truncate flex items-center gap-0.5 shrink-0">
                      <Clock size={8} /> {event.time}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

    </div>
  );
}
