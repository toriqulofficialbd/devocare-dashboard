import { useEffect, useState, useRef } from "react";
import WeekViewHeader from "./WeekViewHeader"; 
import WeekViewBody from "./WeekViewBody";     

export default function WeekViewGrid({ 
  events, currentMonth, currentYear, currentDate, handleMouseDown, handleMouseUp, setWeekDragHours,
  handleEventClick, handleEventDragStart, handleEventDrop 
}) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [now, setNow] = useState(new Date());
  
  const [isDraggingHour, setIsDraggingHour] = useState(false);
  const [startHourDrag, setStartHourDrag] = useState(9);
  const [currentLiveHour, setCurrentLiveHour] = useState(10);
  const [startDayDrag, setStartDayDrag] = useState(null);
  const [currentDayDrag, setCurrentDayDrag] = useState(null);
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

  const weekDatesList = getWeekDates();

  // ১ ঘণ্টার সুনির্দিষ্ট ইভেন্ট ফিল্টারিং
  const getEventsForSpecificDate = (dateObj) => {
    return events.filter(e => 
      Number(dateObj.getDate()) === Number(e.startDay) && 
      Number(dateObj.getMonth()) === Number(e.month) && 
      Number(dateObj.getFullYear()) === Number(e.year) &&
      (e.startDay === e.endDay) // শুধুমাত্র একক দিনের ইভেন্ট
    );
  };

  

  const calculateHourFromY = (e) => {
    if (!gridRef.current) return 9;
    const rect = gridRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const exactHour = Math.floor(relativeY / 128); 
    return Math.max(0, Math.min(23, exactHour));
  };

  const handleGridMouseDown = (e, dateItem) => {
    if (e.button !== 0) return; 
    const clickedHour = calculateHourFromY(e);
    setIsDraggingHour(true);
    setStartHourDrag(clickedHour);
    setCurrentLiveHour(clickedHour);
    setStartDayDrag(dateItem);
    setCurrentDayDrag(dateItem);

    if (setWeekDragHours) {
      setWeekDragHours({ start: clickedHour, end: clickedHour + 1 });
    }
    
    handleMouseDown({
      day: dateItem.getDate(),
      month: dateItem.getMonth(),
      year: dateItem.getFullYear()
    }); 
  };

  const handleGridMouseMove = (e, dateItem = null) => {
    if (!isDraggingHour) return;
    const currentHourDrag = calculateHourFromY(e);
    setCurrentLiveHour(currentHourDrag);
    
    if (setWeekDragHours) {
      setWeekDragHours({
        start: Math.min(startHourDrag, currentHourDrag),
        end: Math.max(startHourDrag, currentHourDrag) + 1
      });
    }

    if (dateItem) {
      setCurrentDayDrag(dateItem);
      handleMouseDown({
        day: startDayDrag ? startDayDrag.getDate() : dateItem.getDate(),
        endDay: dateItem.getDate(),
        month: dateItem.getMonth(),
        year: dateItem.getFullYear()
      });
    }
  };

  const handleGridMouseUp = () => {
    if (isDraggingHour) {
      setIsDraggingHour(false);
      handleMouseUp(); 
    }
  };

  const topPositionOffset = (now.getHours() * 128) + (now.getMinutes() * (128 / 60));
  const dragTop = Math.min(startHourDrag, currentLiveHour) * 128;
  const dragHeight = (Math.abs(currentLiveHour - startHourDrag) + 1) * 128;

 

  return (
    <div className="flex flex-col h-[600px] bg-white border border-[#D0D5DD] rounded-2xl shadow-xs overflow-hidden select-none font-sans w-full" onMouseUp={handleGridMouseUp}>
      
      <WeekViewHeader 
        weekDatesList={weekDatesList}
        currentDate={currentDate}
        daysOfWeek={daysOfWeek}
        handleGridMouseDown={handleGridMouseDown}
      />

      

      <WeekViewBody 
        hoursTimeline={hoursTimeline}
        topPositionOffset={topPositionOffset}
        now={now}
        gridRef={gridRef}
        handleGridMouseMove={handleGridMouseMove}
        isDraggingHour={isDraggingHour}
        dragTop={dragTop}
        dragHeight={dragHeight}
        weekDatesList={weekDatesList}
        getEventsForSpecificDate={getEventsForSpecificDate}
        handleGridMouseDown={handleGridMouseDown}
        handleEventDragStart={handleEventDragStart}
        handleEventClick={handleEventClick}
        handleEventDrop={handleEventDrop} 
        // 👑 নতুন ড্র্যাগ প্রিভিউ ট্র্যাকার প্রোপস
        startDayDrag={startDayDrag}
        currentDayDrag={currentDayDrag}
        events={events}
      />

    </div>
  );
}
