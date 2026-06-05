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

  // 👑 গ্লোবাল মাউস আপ লিসেনার (মাউস ক্যালেন্ডারের বাইরে গিয়ে ছেড়ে দিলেও ড্র্যাগিং সুন্দরভাবে ক্লোজ হবে)
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDraggingHour) {
        setIsDraggingHour(false);
        if (handleMouseUp) handleMouseUp();
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDraggingHour, handleMouseUp]);

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

  const getEventsForSpecificDate = (dateObj) => {
    return events ? events.filter(e => 
      Number(dateObj.getDate()) === Number(e.startDay) && 
      Number(dateObj.getMonth()) === Number(e.month) && 
      Number(dateObj.getFullYear()) === Number(e.year) &&
      (e.startDay === e.endDay)
    ) : [];
  };

  // 👑 ফিক্সড ১: বডি গ্রিডের ফিক্সড h-24 বা ৯৬ পিক্সেলের সাথে মিল রেখে গাণিতিক হিসাব ঠিক করা হলো
  const calculateHourFromY = (e) => {
    if (!gridRef.current) return 9;
    const rect = gridRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    
    // এখানে ১২৮ এর জায়গায় ৯৬ দিয়ে নিখুঁতভাবে ভাগ করা হলো
    const exactHour = Math.floor(relativeY / 96); 
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

  // 👑 ফিক্সড ২: গ্রিড বডির উচ্চতার সাথে সামঞ্জস্য রেখে টপ পজিশন এবং ড্র্যাগ হাইট ক্যালকুলেশন ফিক্সড
  const topPositionOffset = (now.getHours() * 96) + (now.getMinutes() * (96 / 60));
  const dragTop = Math.min(startHourDrag, currentLiveHour) * 96;
  
  // এখানে অতিরিক্ত (+ 1) মুছে দিয়ে নূন্যতম ১টি স্লট সিলেক্ট রাখার ম্যাজিক লজিক দেওয়া হলো
  const dragHeight = Math.max(1, Math.abs(currentLiveHour - startHourDrag)) * 96;

  return (
    <div className="flex flex-col h-[600px] bg-white border border-[#D0D5DD] rounded-2xl shadow-xs overflow-hidden select-none font-sans w-full">
      
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
        startDayDrag={startDayDrag}
        currentDayDrag={currentDayDrag}
        events={events}
      />

    </div>
  );
}
