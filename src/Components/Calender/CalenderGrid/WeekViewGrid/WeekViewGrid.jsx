import { useEffect, useState, useRef } from "react";
import WeekViewHeader from "./WeekViewHeader";
import WeekViewBody from "./WeekViewBody";

export default function WeekViewGrid({ events, currentMonth, currentYear, currentDate, handleMouseDown, handleMouseUp, setWeekDragHours }) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [now, setNow] = useState(new Date());
  
  const [isDraggingHour, setIsDraggingHour] = useState(false);
  const [startHourDrag, setStartHourDrag] = useState(9);
  const [currentLiveHour, setCurrentLiveHour] = useState(10);
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

  // 👑 লজিক ফিক্স ১: ডাটা টাইপ নাম্বার ফরম্যাটে সুরক্ষিত করা হলো যাতে মেমোরি ড্রপ না হয়
  const getEventsForSpecificDate = (dateObj) => {
    return events.filter(e => 
      Number(dateObj.getDate()) === Number(e.startDay) && 
      Number(dateObj.getMonth()) === Number(e.month) && 
      Number(dateObj.getFullYear()) === Number(e.year)
    );
  };

  const calculateHourFromY = (e) => {
    if (!gridRef.current) return 9;
    const rect = gridRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const exactHour = Math.floor(relativeY / 64); 
    return Math.max(0, Math.min(23, exactHour));
  };

  // 👑 লজিক ফিক্স ২: মাউস ডাউন অ্যাকশনে তারিখ সংখ্যার পাশাপাশি সঠিক মাসের ইনডেক্স অবজেক্ট আকারে প্যারেন্টে পাঠানো হচ্ছে
  const handleGridMouseDown = (e, dateItem) => {
    console.log("🖱️ CLICKED DATE OBJECT:", dateItem); // 👈 এটি চেক করবে তারিখ অবজেক্ট ঠিক আছে কি না
    console.log("🔢 EXTRACTED DAY NUMBER:", dateItem ? dateItem.getDate() : "NULL");
    if (e.button !== 0) return; 
    const clickedHour = calculateHourFromY(e);
    setIsDraggingHour(true);
    setStartHourDrag(clickedHour);
    setCurrentLiveHour(clickedHour);
    if (setWeekDragHours) {
      setWeekDragHours({ start: clickedHour, end: clickedHour + 1 });
    }
    
    // পিউর মেমোরি অবজেক্ট পাস (যা মান্থ ও উইক ভিউ দুই জায়গাতেই ইভেন্ট লাইভ রাখবে)
    handleMouseDown({
      day: dateItem.getDate(),
      month: dateItem.getMonth(),
      year: dateItem.getFullYear()
    }); 
  };

  const handleGridMouseMove = (e) => {
    if (!isDraggingHour) return;
    const currentHourDrag = calculateHourFromY(e);
    setCurrentLiveHour(currentHourDrag);
    if (setWeekDragHours) {
      setWeekDragHours({
        start: Math.min(startHourDrag, currentHourDrag),
        end: Math.max(startHourDrag, currentHourDrag) + 1
      });
    }
  };

  const handleGridMouseUp = () => {
    if (isDraggingHour) {
      setIsDraggingHour(false);
      handleMouseUp(); 
    }
  };

  const topPositionOffset = (now.getHours() * 64) + (now.getMinutes() * (64 / 60));
  const dragTop = Math.min(startHourDrag, currentLiveHour) * 64;
  const dragHeight = (Math.abs(currentLiveHour - startHourDrag) + 1) * 64;

  return (
    <div className="flex flex-col h-[600px] bg-white animate-in fade-in duration-150 select-none font-sans w-full overflow-hidden" onMouseUp={handleGridMouseUp}>
      
      {/* 📅 ১. সপ্তাহের টপ ফিক্সড হেডার রো বার (আপনার অবিকল ডিজাইন অক্ষুণ্ণ) */}
     <WeekViewHeader 
        weekDatesList={weekDatesList}
        currentDate={currentDate}
        daysOfWeek={daysOfWeek}
        handleGridMouseDown={handleGridMouseDown}
      />

      {/* ⏰ ২. ২৪ ঘণ্টার আওয়ার্লি টাইমলাইন বডি */}
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
      />
    </div>
  );
}
