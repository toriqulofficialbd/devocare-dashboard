
import { Clock } from "lucide-react";

export default function WeekMultiDayBanners({ 
  multiDayEvents, 
  weekDatesList, 
  handleEventClick, 
  handleEventDragStart 
}) {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 p-0.5">
      {multiDayEvents.map((event) => {
        const startIdx = weekDatesList.findIndex(d => d.getDate() === event.startDay);
        const endIdx = weekDatesList.findIndex(d => d.getDate() === event.endDay);
        
        if (startIdx === -1) return null;
        const activeStart = startIdx;
        const activeEnd = endIdx === -1 ? 6 : endIdx;
        
        
        const leftPercent = (activeStart / 7) * 100;
        const widthPercent = ((activeEnd - activeStart + 1) / 7) * 100;
       

        const startHourVal = event.startHour !== undefined ? event.startHour : 9;
        const computedTop = startHourVal * 96;

        const durationVal = event.durationHours !== undefined ? event.durationHours : 1;
        const computedHeight = durationVal * 96;

        return (
          <div
            key={event.id}
            style={{ 
              left: `calc(${leftPercent}% + 4px)`, 
              width: `calc(${widthPercent}% - 8px)`, 
              top: `${computedTop + 4}px` ,
              height: `${computedHeight - 8}px`
            }}
            draggable="true"
            onDragStart={() => handleEventDragStart && handleEventDragStart(event.id)}
            onMouseDown={(e) => e.stopPropagation()} 
            onMouseUp={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              if (handleEventClick) handleEventClick(event);
            }}
            className={`absolute rounded-xl border p-2.5 shadow-xs transition-all flex flex-col justify-start text-left cursor-pointer pointer-events-auto hover:brightness-95 select-none overflow-hidden ${event.color}`}
          >
          
            <div className="truncate font-black lg:text-[9px] text-[10px] leading-none mb-1.5 shrink-0">
              {event.title}
            </div>
            
           
            <div className="text-[7px] sm:text-[8px] font-semibold opacity-90 leading-none truncate flex items-center gap-0.5 shrink-0">
              <Clock size={8} /> {event.time}
            </div>
          </div>
        );
      })}
    </div>
  );
}
