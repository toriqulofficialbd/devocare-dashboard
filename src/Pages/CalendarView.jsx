import { useState } from "react";
import { useOutletContext } from "react-router-dom"; 
import { AnimatePresence } from "framer-motion";
import CalendarHeader from "../Components/Calender/CalendarHeader";
import CalendarGrid from "../Components/Calender/CalenderGrid/CalendarGrid";
import CalendarModal from "../Components/Calender/CalendarModal";
// 👑 নিশ্চিত করুন এই লাইনটি ফাইলের ওপরে ইম্পোর্ট করা আছে:

export default function CalendarView() {
   const globalSearch = useOutletContext();
  const [calendarSearch, setCalendarSearch] = useState(""); 
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 3)); 
  const [viewMode, setViewMode] = useState("Month view");
  const [direction, setDirection] = useState(0); 
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const [events, setEvents] = useState([
    { id: 1, title: "Care: Sami", employee: "Karim Rahman", startDay: 1, endDay: 1, month: 5, year: 2026, time: "09:00 AM - 10:00 AM", startHour: 9, durationHours: 1, color: "bg-orange-50 text-orange-700 border-orange-200" },
    { id: 2, title: "Care: Aria", employee: "Sultana Begum", startDay: 4, endDay: 4, month: 5, year: 2026, time: "04:00 PM - 05:30 PM", startHour: 16, durationHours: 1.5, color: "bg-violet-50 text-violet-700 border-violet-200" },
    { id: 3, title: "Product Demo", employee: "Abir Hasan", startDay: 2, endDay: 2, month: 5, year: 2026, time: "04:30 PM - 05:30 PM", startHour: 16.5, durationHours: 1, color: "bg-blue-50 text-blue-700 border-blue-200" },
  ]);

  const [weekDragHours, setWeekDragHours] = useState({ start: 9, end: 10 });

  const employees = ["Karim Rahman (Therapist)", "Sultana Begum (Nurse)", "Abir Hasan (Caregiver)"];
  const children = ["Sami (Autism Spectrum)", "Aria (Down Syndrome)", "Faiaz (Cerebral Palsy)"];
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const daysInMonthCount = new Date(year, month + 1, 0).getDate();

    // 👑 ট্রেন্ডি ফিক্স ২: এখন ওপরের বক্স বা ক্যালেন্ডারের বক্স—যেকোনো ১টিতে টাইপ করলেই ক্যালেন্ডার ফিল্টার হবে, কিন্তু লেখা ডুপ্লিকেট হবে না
  const filteredEvents = events.filter(event => {
    // যেকোনো একটি বক্সে লেখা থাকলে সেটি রিড করবে (ক্যালেন্ডার সার্চকে অগ্রাধিকার দেওয়া হয়েছে)
    const activeSearch = calendarSearch.trim() ? calendarSearch : globalSearch;
    
    if (!activeSearch || !activeSearch.trim()) return true;
    const normalizedSearch = activeSearch.toLowerCase();
    
    return (
      event.title.toLowerCase().includes(normalizedSearch) ||
      event.employee.toLowerCase().includes(normalizedSearch)
    );
  });


  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    const today = new Date(2026, 5, 3);
    setDirection(currentDate.getMonth() > 5 ? -1 : 1);
    setCurrentDate(today);
  };

  const handleMouseDown = (day) => { 
    setIsDragging(true); 
    setDragStart(day); 
    setDragEnd(day); 
  };
  
  const handleMouseEnter = (day) => { 
    if (isDragging) setDragEnd(day); 
  };
  
  const handleMouseUp = () => { 
    if (isDragging) { 
      setIsDragging(false); 
      setIsModalOpen(true); 
    } 
  };
  
  const handleAddEventClick = () => { 
    setDragStart(currentDate.getDate()); 
    setDragEnd(currentDate.getDate()); 
    setWeekDragHours({ start: 10, end: 11 });
    setIsModalOpen(true); 
  };
  
  const closeModal = () => { 
    setDragStart(null); 
    setDragEnd(null); 
    setIsModalOpen(false); 
  };

  // 👑 লজিক ফিক্স ১: অবজেক্ট এবং সাধারণ নাম্বার—উভয় প্রকার তারিখ সিঙ্কের জন্য ইউনিভার্সাল সেফগার্ড
  const isSelected = (day) => {
    if (!dragStart || !dragEnd) return false;
    const startNum = dragStart instanceof Date ? dragStart.getDate() : (typeof dragStart === "object" ? dragStart.day : dragStart);
    const endNum = dragEnd instanceof Date ? dragEnd.getDate() : (typeof dragEnd === "object" ? dragEnd.day : dragEnd);
    return day >= Math.min(startNum, endNum) && day <= Math.max(startNum, endNum);
  };

  // 👑 👑 লজিক ফিক্স ২: উইক ভিউ থেকে আসা পিউর ডেট অবজেক্ট থেকে ডাইনামিকালি সঠিক দিন ও মাস এক্সট্রাক্ট করার মাস্টার ইঞ্জিন
  const handleCreateEvent = (e, calculatedTimeRange) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!selectedChild || !selectedEmployee) return;

    const colors = ["bg-violet-50 text-violet-700 border-violet-200", "bg-teal-50 text-teal-700 border-teal-200", "bg-orange-50 text-orange-700 border-orange-200"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    let targetDay = currentDate.getDate();
    let targetMonth = month; 
    let targetYear = year;

    // 🎯 কনসোলে পাওয়া ডেট অবজেক্ট ট্র্যাক করার চূড়ান্ত ম্যাজিক লজিক:
    if (dragStart instanceof Date) {
      targetDay = dragStart.getDate();
      targetMonth = dragStart.getMonth(); // মে এর ঘরে মে (4), জুনের ঘরে জুন (5) অটো ডিটেক্ট করবে
      targetYear = dragStart.getFullYear();
    } else if (dragStart && typeof dragStart === "object") {
      targetDay = dragStart.day !== undefined ? dragStart.day : targetDay;
      targetMonth = dragStart.month !== undefined ? dragStart.month : targetMonth;
      targetYear = dragStart.year !== undefined ? dragStart.year : targetYear;
    } else if (dragStart) {
      targetDay = dragStart;
    }

    const startH = viewMode === "Month view" ? 10 : weekDragHours.start;
    const endH = viewMode === "Month view" ? 11 : weekDragHours.end;
    const duration = Math.max(0.5, endH - startH);

    const formatHourString = (h) => {
      if (h === 0 || h === 24) return "12:00 AM";
      if (h === 12) return "12:00 PM";
      return h > 12 ? `${h - 12}:00 PM` : `${h}:00 AM`;
    };

    const finalTimeText = viewMode === "Month view" 
      ? (calculatedTimeRange || "10:00 AM - 11:00 AM") 
      : `${formatHourString(startH)} - ${formatHourString(endH)}`;

    const newCreatedEvent = {
      id: Date.now(), 
      title: `Care: ${selectedChild}`, 
      employee: selectedEmployee,
      startDay: Number(targetDay), 
      endDay: Number(targetDay), 
      month: Number(targetMonth), 
      year: Number(targetYear), 
      time: finalTimeText, 
      startHour: startH, 
      durationHours: duration,
      color: randomColor
    };

    setEvents((prev) => [...prev, newCreatedEvent]);

    // ফরম এবং মডাল মেমোরি রিসেট
    setSelectedChild(""); 
    setSelectedEmployee(""); 
    setDragStart(null); 
    setDragEnd(null); 
    setIsModalOpen(false);
  };

  const getFilteredDays = () => {
    const activeDay = currentDate.getDate();
    if (viewMode === "Day view") return [activeDay];
    if (viewMode === "Week view") {
      const start = Math.max(1, activeDay - 3);
      const end = Math.min(daysInMonthCount, activeDay + 3);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
    return Array.from({ length: daysInMonthCount }, (_, i) => i + 1);
  };

  // 👑 লজিক ফিক্স ৩: মডাল হেডার ডেট টেক্সট প্রিন্ট করার জন্য ডেট অবজেক্ট সেফগার্ড মেথড
  const getModalDayDisplay = () => {
    if (dragStart instanceof Date) return dragStart.getDate();
    if (dragStart && typeof dragStart === "object") return dragStart.day;
    if (dragStart) return dragStart;
    return currentDate.getDate();
  };

  return (
    <div className="select-none p-2 font-sans" onMouseUp={handleMouseUp}>
      <CalendarHeader
       searchTerm={calendarSearch} 
        setSearchTerm={setCalendarSearch}
        currentDate={currentDate} 
        monthNames={monthNames} 
        shortMonthNames={shortMonthNames} 
        month={month} 
        year={year} 
        daysInMonthCount={daysInMonthCount} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        handlePrevMonth={handlePrevMonth} 
        handleNextMonth={handleNextMonth} 
        handleToday={handleToday} 
        handleAddEventClick={handleAddEventClick}
      />
      
      <div className="overflow-hidden relative rounded-2xl">
        <CalendarGrid 
          filteredDays={getFilteredDays()} 
          events={filteredEvents}  
          currentMonth={month} 
          currentYear={year} 
          handleMouseDown={handleMouseDown} 
          handleMouseEnter={handleMouseEnter} 
          handleMouseUp={handleMouseUp}
          isSelected={isSelected} 
          direction={direction} 
          currentDate={currentDate}
          viewMode={viewMode} 
          setWeekDragHours={setWeekDragHours} 
          setCurrentDate={setCurrentDate} 
        />
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <CalendarModal 
            isModalOpen={isModalOpen} 
            dragStart={getModalDayDisplay()} 
            dragEnd={getModalDayDisplay()} 
            handleCreateEvent={handleCreateEvent} 
            closeModal={closeModal} 
            selectedChild={selectedChild} 
            setSelectedChild={setSelectedChild} 
            selectedEmployee={selectedEmployee} 
            setSelectedEmployee={setSelectedEmployee} 
            childrenList={children} 
            employees={employees}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
