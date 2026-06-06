import { useState } from "react";
import MonthViewGrid from "./MonthViewGrid/MonthViewGrid";
import WeekViewGrid from "./WeekViewGrid/WeekViewGrid";
import DayViewGrid from "./DayViewGrid/DayViewGrid"; // 👑 ১. নতুন ডে ভিউ গ্রিড ইম্পোর্ট করা হলো

export default function CalendarGrid({
  filteredDays, events, currentMonth, currentYear, handleMouseDown, handleMouseEnter, handleMouseUp, isSelected, direction,
  viewMode = "Month view", currentDate = new Date(), setCurrentDate, setWeekDragHours, handleEventClick, handleEventDragStart, handleEventDrop // 👑 setCurrentDate রিসিভ করা হলো
}) {
  const [activeMobileDay, setActiveMobileDay] = useState(currentDate.getDate());

  const getEventsForDay = (day) => {
    return events.filter(e => Number(day) === Number(e.startDay) && Number(e.month) === Number(currentMonth) && Number(e.year) === currentYear);
  };

  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const blankSlots = Array.from({ length: firstDayIndex }, (_, i) => i);

  return (
    <div className=" overflow-hidden w-full">

      
      {viewMode === "Day view" ? (
        <DayViewGrid
          events={events}
          currentYear={currentYear}
          currentMonth={currentMonth}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate} 
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          setWeekDragHours={setWeekDragHours}
          filteredDays={filteredDays}
          handleEventClick={handleEventClick}
          handleEventDragStart={handleEventDragStart}
          handleEventDrop={handleEventDrop}
        />
      ) : viewMode === "Week view" ? (
        <WeekViewGrid
          events={events}
          currentYear={currentYear}
          currentMonth={currentMonth}
          currentDate={currentDate}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          setWeekDragHours={setWeekDragHours}
          handleEventClick={handleEventClick}
          handleEventDragStart={handleEventDragStart}
          handleEventDrop={handleEventDrop}
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
            handleMouseEnter={handleMouseEnter} activeMobileDay={activeMobileDay} setActiveMobileDay={setActiveMobileDay}
            handleEventClick={handleEventClick}
            handleEventDragStart={handleEventDragStart}
            handleEventDrop={handleEventDrop}
            events={events}
          />
        </>
      )}

    </div>
  );
}
