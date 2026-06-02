import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CalendarHeader from "../Components/Dashboard/Calender/CalendarHeader";
import CalendarGrid from "../Components/Dashboard/Calender/CalendarGrid";
import CalendarModal from "../Components/Dashboard/Calender/CalendarModal";

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 2)); // June 2, 2026
  const [viewMode, setViewMode] = useState("Month view");
  const [direction, setDirection] = useState(0); // Animation direction (1 = right, -1 = left)
  
  const [events, setEvents] = useState([
    { id: 1, title: "Care: Sami", employee: "Karim Rahman", startDay: 1, endDay: 1, month: 5, year: 2026, time: "09:00 AM - 10:00 AM", color: "bg-orange-50 text-orange-700 border-orange-200" },
    { id: 2, title: "Care: Aria", employee: "Sultana Begum", startDay: 2, endDay: 4, month: 5, year: 2026, time: "04:00 PM - 05:00 PM", color: "bg-violet-50 text-violet-700 border-violet-200" },
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [selectedChild, setSelectedChild] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const employees = ["Karim Rahman (Therapist)", "Sultana Begum (Nurse)", "Abir Hasan (Caregiver)"];
  const children = ["Sami (Autism Spectrum)", "Aria (Down Syndrome)", "Faiaz (Cerebral Palsy)"];
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Dynamically calculate total days in the active month
  const daysInMonthCount = new Date(year, month + 1, 0).getDate();

  // 🔄 Month panel navigator controls
  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    const today = new Date(2026, 5, 2);
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
  
  // Header "Add event" button click handler
  const handleAddEventClick = () => { 
    setDragStart(currentDate.getDate()); 
    setDragEnd(currentDate.getDate()); 
    setIsModalOpen(true); 
  };
  
  const closeModal = () => { 
    setDragStart(null); 
    setDragEnd(null); 
    setIsModalOpen(false); 
  };

  const isSelected = (day) => {
    if (!dragStart || !dragEnd) return false;
    return day >= Math.min(dragStart, dragEnd) && day <= Math.max(dragStart, dragEnd);
  };

  // ✅ Fixed: Accepting calculated time range string from the custom modal form submit event
  const handleCreateEvent = (e, calculatedTimeRange) => {
    e.preventDefault();
    if (!selectedChild || !selectedEmployee) return;

    const colors = ["bg-violet-50 text-violet-700 border-violet-200", "bg-teal-50 text-teal-700 border-teal-200", "bg-orange-50 text-orange-700 border-orange-200"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setEvents([...events, {
      id: Date.now(), 
      title: `Care: ${selectedChild}`, 
      employee: selectedEmployee,
      startDay: Math.min(dragStart, dragEnd), 
      endDay: Math.max(dragStart, dragEnd), 
      month: month, 
      year: year, 
      time: calculatedTimeRange, // Maps precise string block e.g., "09:00 AM - 11:00 AM"
      color: randomColor
    }]);

    setSelectedChild(""); 
    setSelectedEmployee(""); 
    setDragStart(null); 
    setDragEnd(null); 
    setIsModalOpen(false);
  };

  // 🎯 Dynamic calendar row array configuration
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

  return (
    <div className=" select-none p-2 font-sans" onMouseUp={handleMouseUp}>
      {/* 1. Top Panel Controller Header */}
      <CalendarHeader 
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
      
      {/* 2. Main Calendar Track Panel Grid */}
      <div className="overflow-hidden relative rounded-2xl">
        <CalendarGrid 
          filteredDays={getFilteredDays()} 
          events={events} 
          currentMonth={month} 
          currentYear={year} 
          handleMouseDown={handleMouseDown} 
          handleMouseEnter={handleMouseEnter} 
          isSelected={isSelected} 
          direction={direction} 
          currentDate={currentDate}
        />
      </div>

      {/* 3. Global Full Screen Overlay Event Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <CalendarModal 
            isModalOpen={isModalOpen} 
            dragStart={dragStart} 
            dragEnd={dragEnd} 
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
