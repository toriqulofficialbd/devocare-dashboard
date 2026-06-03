
import { motion } from "framer-motion";

export default function MonthViewGrid({ 
  filteredDays, currentMonth, currentYear, direction, blankSlots, isSelected, getEventsForDay, handleMouseDown, handleMouseEnter, activeMobileDay, setActiveMobileDay
}) {
  return (
    <motion.div 
      key={`${currentMonth}-${currentYear}`}
      custom={direction}
      variants={{
        enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 })
      }}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="grid grid-cols-7 gap-px bg-[#EAECF0]"
    >
      {blankSlots.map((_, index) => (
        <div key={`blank-${index}`} className="min-h-[70px] sm:min-h-[120px] bg-slate-50/50" />
      ))}

      {filteredDays.map((day) => {
        const isDaySelected = isSelected(day);
        const dayEvents = getEventsForDay(day);
        const isMobileActive = activeMobileDay === day;

        return (
          <div 
            key={day} 
            onMouseDown={() => { handleMouseDown(day); setActiveMobileDay(day); }}
            onMouseEnter={() => handleMouseEnter(day)}
            className={`min-h-[70px] sm:min-h-[120px] p-1.5 sm:p-2 transition-all flex flex-col relative cursor-cell bg-white ${
              isDaySelected ? "!bg-violet-50/40" : ""
            } ${isMobileActive ? "ring-2 ring-violet-600 ring-inset z-10" : ""}`}
          >
            <span className={`text-xs font-semibold mb-1 text-center sm:text-left ${isDaySelected ? "text-violet-700 font-bold" : "text-[#475467]"}`}>{day}</span>
            
            <div className="hidden sm:block flex-1 space-y-1 overflow-y-auto">
              {dayEvents.map(event => {
                const isFirstDay = day === event.startDay;
                const isLastDay = day === event.endDay;
                return (
                  <div key={event.id} className={`text-[10px] font-semibold px-2 h-8 flex items-center border-y transition-all ${event.color} ${isFirstDay ? "rounded-l-lg border-l pl-2" : "border-l-0 pl-0 rounded-l-none"} ${isLastDay ? "rounded-r-lg border-r pr-2" : "border-r-0 pr-0 rounded-r-none"}`}>
                    {isFirstDay ? (
                      <div className="flex flex-col min-w-0 flex-1 justify-center">
                        <span className="truncate leading-none mb-0.5">{event.title}</span>
                        <span className="text-[8px] font-normal opacity-80 leading-none">{event.time}</span>
                      </div>
                    ) : ( <div className="h-full w-full" /> )}
                  </div>
                );
              })}
            </div>

            <div className="flex sm:hidden flex-wrap gap-0.5 justify-center mt-auto pb-1">
              {dayEvents.map((event) => (
                <span key={event.id} className={`h-1.5 w-1.5 rounded-full ${event.color.includes("violet") ? "bg-violet-500" : event.color.includes("orange") ? "bg-orange-500" : "bg-teal-500"}`} />
              ))}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
