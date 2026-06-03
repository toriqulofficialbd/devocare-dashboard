
import MonthViewGrid from "./MonthViewGrid";
import WeekViewGrid from "./WeekViewGrid";

export default function CalendarGrid({ 
  filteredDays, events, currentMonth, currentYear, handleMouseDown, handleMouseEnter, handleMouseUp, isSelected, direction, 
  viewMode = "Month view", currentDate = new Date()
}) {
  const getEventsForDay = (day) => {
    return events.filter(e => day === e.startDay && e.month === currentMonth && e.year === currentYear);
  };

  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const blankSlots = Array.from({ length: firstDayIndex }, (_, i) => i);

  return (
    <div className="bg-white border border-[#EAECF0] rounded-2xl shadow-xs overflow-hidden w-full">
      {viewMode === "Week view" || viewMode === "Day view" ? (
        <WeekViewGrid 
          events={events} currentYear={currentYear} currentMonth={currentMonth} 
          currentDate={currentDate} handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp} viewMode={viewMode}
        />
      ) : (
        <>
          <div className="grid grid-cols-7 border-b border-[#EAECF0] bg-white">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
              <div key={idx} className="py-2.5 text-center text-[11px] sm:text-xs font-semibold text-[#475467] tracking-wide">{day}</div>
            ))}
          </div>
          <MonthViewGrid 
            filteredDays={filteredDays} currentMonth={currentMonth} currentYear={currentYear} 
            direction={direction} blankSlots={blankSlots} isSelected={isSelected} 
            getEventsForDay={getEventsForDay} handleMouseDown={handleMouseDown} 
            handleMouseEnter={handleMouseEnter} 
          />
        </>
      )}
    </div>
  );
}
