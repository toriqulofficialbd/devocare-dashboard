import { Clock } from "lucide-react";
import WeekMultiDayBanners from "./WeekMultiDayBanners";
// import HoverPlusTimeline from "../HoverPlusTimeline";

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
  handleGridMouseDown,
  handleEventDragStart,
  handleEventClick,
  handleEventDrop,
  startDayDrag,
  currentDayDrag,
  events,
  currentDate
}) {

  const multiDayEvents = events 
    ? events.filter(e => Number(e.startDay) !== Number(e.endDay) && Number(e.month) === Number(currentDate?.getMonth() || e.month)) 
    : [];

  return (
    <div className="flex-1 overflow-y-auto grid grid-cols-[65px_1fr] bg-white relative">
      
      {/* বামপাশের ফিক্সড ২৪ ঘণ্টার টাইম লেবেল কলাম */}
      <div className="border-r border-[#D0D5DD] bg-violet-50 text-right lg:pr-1.5 pr-3 select-none z-10 relative">
        {hoursTimeline.map((hour, idx) => (
          <div key={idx} className="h-24 lg:text-[10px] text-[10px] font-bold text-[#475467] pt-1.5 whitespace-nowrap tracking-tight">
            
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

      {/* ৩. মেইন ইভেন্ট টাইমলাইন গ্রিড বডি */}
      <div 
        ref={gridRef} 
        className="grid grid-cols-7 relative bg-[#F9FAFB]/10 lg:divide-x overflow-x-auto divide-[#ddd0d0] h-[2304px]"
      >
        {/* গ্লোবাল লাইভ টাইম পার্পল রেখা */}
        <div style={{ top: `${topPositionOffset}px` }} className="absolute left-0 right-0 h-px bg-violet-500 z-45 pointer-events-none flex items-center">
          <div className="h-2 w-2 rounded-full bg-violet-600 -ml-1 ring-4 ring-violet-500/20" />
        </div>

        {/* ব্যাকগ্রাউন্ডের ২৪টি রিয়েল আওয়ার রো গ্রিড লাইনস */}
        <div className="absolute inset-0 flex flex-col pointer-events-none z-0 divide-y divide-[#D0D5DD]">
          {hoursTimeline.map((_, idx) => (
            <div key={idx} className="h-24 w-full relative pointer-events-auto" onDragOver={(e) => e.preventDefault()} />
          ))}
        </div>

        {/* 👑 ২. মাল্টি-ডে ব্যানার ওভারলে কম্পোনেন্ট নোড */}
        <WeekMultiDayBanners 
          multiDayEvents={multiDayEvents}
          weekDatesList={weekDatesList}
          handleEventClick={handleEventClick}
          handleEventDragStart={handleEventDragStart}
        />

        {/* dynamic runtime weekly date cell blocks mapping */}
        {weekDatesList.map((dateItem, idx) => {
          const dayEvents = getEventsForSpecificDate(dateItem);
          
          {/* 👑 ২ডি ম্যাট্রিক্স ক্যালকুলেশন কন্ডিশন: মাউস যে যে কলামের সীমানা ক্রস করবে সেগুলোকে ট্র্যাকিং করা */}
          const isCurrentColumnDragging = startDayDrag && currentDayDrag && 
            dateItem.getDate() >= Math.min(startDayDrag.getDate(), currentDayDrag.getDate()) &&
            dateItem.getDate() <= Math.max(startDayDrag.getDate(), currentDayDrag.getDate());

          return (
            <div 
              key={idx} 
              className="h-full relative lg:p-px p-0.5 cursor-cell lg:min-w-0 min-w-32 z-0 select-none"
              onMouseDown={(e) => handleGridMouseDown(e, dateItem)}
              onMouseMove={(e) => handleGridMouseMove && handleGridMouseMove(e, dateItem)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                if (handleEventDrop && gridRef.current) {
                  const rect = gridRef.current.getBoundingClientRect();
                  const relativeY = e.clientY - rect.top;
                  const exactHour = Math.floor(relativeY / 96); 
                  handleEventDrop(dateItem, exactHour); 
                }
              }}
            >
            {/* <HoverPlusTimeline hoursTimeline={hoursTimeline} /> */}
              
              {/* 👑 জাদুকরী ২ডি ওভারলে ফিক্স: এটি প্রতিটি কলামের নির্দিষ্ট ড্র্যাগ এরিয়াতেই কেবল বেগুনি শ্যাডো লক করবে */}
              {isDraggingHour && isCurrentColumnDragging && (
                <div 
                  style={{ top: `${dragTop}px`, height: `${dragHeight}px` }}
                  className="absolute inset-x-0.5 bg-violet-500/10 border-y border-dashed border-violet-400 z-20 pointer-events-none flex items-center justify-center"
                >
                  {/* সিলেকশন লেবেল যেন শুধুমাত্র শুরুর কলামেই একবার দেখায় */}
                  {dateItem.getDate() === startDayDrag.getDate() && (
                    <span className="bg-violet-600 text-white font-black text-[8px] px-1.5 py-0.5 rounded shadow-xs select-none">
                      Slot Locked
                    </span>
                  )}
                </div>
              )}

              {/* সিডিল একক দিনের শর্টカード  রেন্ডারিং */}
              <div className="absolute inset-0 z-35 p-1 pointer-events-none">
                {dayEvents.map((event) => {
                  const startHourVal = event.startHour !== undefined ? event.startHour : 9;
                  const durationVal = event.durationHours !== undefined ? event.durationHours : 1;
                  
                  const computedTop = startHourVal * 96; 
                  const computedHeight = durationVal * 96; 

                  return (
                    <div 
                      key={event.id} 
                      style={{ top: `${computedTop}px`, height: `${computedHeight}px` }}
                      draggable="true" 
                      onDragStart={() => handleEventDragStart(event.id)} 
                      onMouseDown={(e) => e.stopPropagation()} 
                      onMouseUp={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation(); 
                        if (handleEventClick) handleEventClick(event);
                      }}
                      className={`absolute inset-x-0.5 rounded-xl border p-2 shadow-xs transition-all flex flex-col justify-start overflow-hidden text-left z-40 cursor-pointer pointer-events-auto hover:brightness-95 ${event.color}`}
                    >
                      <span className="truncate leading-none block font-black text-[10px] mb-1">{event.title}</span>
                      <span className="text-[8px] font-semibold opacity-90 block truncate flex items-center gap-0.5 shrink-0">
                        <Clock size={8} /> {event.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
