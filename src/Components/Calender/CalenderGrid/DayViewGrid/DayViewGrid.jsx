
import DayTimeline from "./DayTimeline";
import MiniCalendar from "./MiniCalendar";

export default function DayViewGrid({ 
  events, currentMonth, currentYear, currentDate, setCurrentDate, handleMouseDown ,handleMouseUp, setWeekDragHours,handleEventClick,handleEventDragStart,handleEventDrop
}) {
  
  const activeDayEvents = events.filter(e => 
    Number(currentDate.getDate()) === Number(e.startDay) && 
    Number(currentDate.getMonth()) === Number(e.month) && 
    Number(currentDate.getFullYear()) === Number(e.year)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-5 bg-white  animate-in fade-in duration-150 w-full overflow-hidden">
      
      
      <DayTimeline 
        currentDate={currentDate}
        currentMonth={currentMonth}
        currentYear={currentYear}
        activeDayEvents={activeDayEvents}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        setWeekDragHours={setWeekDragHours}
        handleEventClick={handleEventClick}
         handleEventDragStart={handleEventDragStart}
          handleEventDrop={handleEventDrop}
      />

     
      <MiniCalendar 
        events={events}
        currentMonth={currentMonth}
        currentYear={currentYear}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        activeDayEvents={activeDayEvents}
      />

    </div>
  );
}
