import { useState } from "react";
import { motion } from "framer-motion";
import MonthDayCell from "./MonthDayCell";
import MonthMultiDayBanners from "./MonthMultiDayBanners/MonthMultiDayBanners";

export default function MonthViewGrid({ 
  filteredDays, currentMonth, currentYear, direction, blankSlots, isSelected, handleMouseDown, handleMouseEnter, activeMobileDay, setActiveMobileDay, handleEventClick,
  handleEventDragStart, handleEventDrop, events 
}) {
  const [isMouseDragging, setIsMouseDragging] = useState(false);

  
  const multiDayEvents = events ? events.filter(e => e.startDay !== e.endDay && Number(e.month) === Number(currentMonth)) : [];

 
  const getSingleDayEventsForDay = (day) => {
    return events ? events.filter(e => Number(day) === Number(e.startDay) && e.startDay === e.endDay && Number(e.month) === Number(currentMonth) && Number(e.year) === currentYear) : [];
  };


  const prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate(); 
  const prevMonthDaysArray = blankSlots.map((_, idx) => prevMonthLastDate - blankSlots.length + 1 + idx);

  
  const totalGridSlots = blankSlots.length + filteredDays.length;
  const remainingSlotsCount = totalGridSlots % 7 === 0 ? 0 : 7 - (totalGridSlots % 7);
  const nextMonthDaysArray = Array.from({ length: remainingSlotsCount }, (_, i) => i + 1);

  return (
    <div className="relative w-full">
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
        onMouseUp={() => setIsMouseDragging(false)}
        className="grid grid-cols-7 gap-px bg-[#EAECF0] relative"
      >
        
        
        {prevMonthDaysArray.map((prevDay, index) => (
          <div key={`prev-${index}`} className="min-h-[70px] sm:min-h-[120px] bg-slate-50/40 p-1.5 sm:p-2 flex flex-col justify-start opacity-65 select-none cursor-not-allowed">
            <span className="text-xs font-bold text-slate-500 text-center sm:text-left transition-all">{prevDay}</span>
          </div>
        ))}

       
        {filteredDays.map((day) => {
          const isDaySelected = isSelected(day);
          const singleDayEvents = getSingleDayEventsForDay(day);
          const isMobileActive = activeMobileDay === day;

          return (
            <MonthDayCell 
              key={day}
              day={day}
              isDaySelected={isDaySelected}
              dayEvents={singleDayEvents} 
              isMobileActive={isMobileActive}
              handleMouseDown={(d) => {
                setIsMouseDragging(true);
                if (handleMouseDown) handleMouseDown(d);
                if (setActiveMobileDay) setActiveMobileDay(d);
              }}
              handleMouseEnter={(d) => {
                if (isMouseDragging && handleMouseEnter) handleMouseEnter(d);
              }}
              handleEventClick={handleEventClick}
              handleEventDragStart={handleEventDragStart}
              handleEventDrop={handleEventDrop}
            />
          );
        })}

       
        {nextMonthDaysArray.map((nextDay, index) => (
          <div key={`next-${index}`} className="min-h-[70px] sm:min-h-[120px] bg-slate-50/40 p-1.5 sm:p-2 flex flex-col justify-start opacity-65 select-none cursor-not-allowed">
            <span className="text-xs font-bold text-slate-500 text-center sm:text-left transition-all">{nextDay}</span>
          </div>
        ))}

       
        <MonthMultiDayBanners 
          multiDayEvents={multiDayEvents}
          blankSlots={blankSlots}
          filteredDays={filteredDays}
          handleEventClick={handleEventClick}
          handleEventDragStart={handleEventDragStart}
        />

      </motion.div>
    </div>
  );
}
