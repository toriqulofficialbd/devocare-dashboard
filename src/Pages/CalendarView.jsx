import { useState } from "react";
import { useOutletContext } from "react-router-dom"; 
import { AnimatePresence } from "framer-motion";
import CalendarHeader from "../Components/Calender/CalendarHeader";
import CalendarGrid from "../Components/Calender/CalenderGrid/CalendarGrid";
import CalendarModal from "../Components/Calender/CalendarModal";

export default function CalendarView() {
  const globalSearch = useOutletContext(); 
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

  const filteredEvents = events.filter(event => {
    if (!globalSearch || !globalSearch.trim()) return true;
    const normalizedSearch = globalSearch.toLowerCase();
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

  const isSelected = (day) => {
    if (!dragStart || !dragEnd) return false;
    return day >= Math.min(dragStart, dragEnd) && day <= Math.max(dragStart, dragEnd);
  };

  const handleCreateEvent = (e, calculatedTimeRange) => {
    e.preventDefault();
    if (!selectedChild || !selectedEmployee) return;

    const colors = ["bg-violet-50 text-violet-700 border-violet-200", "bg-teal-50 text-teal-700 border-teal-200", "bg-orange-50 text-orange-700 border-orange-200"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const targetDay = dragStart ? dragStart : currentDate.getDate();
    const startH = viewMode === "Month view" ? 10 : weekDragHours.start;
    const endH = viewMode === "Month view" ? 11 : weekDragHours.end;
    const duration = Math.max(0.5, endH - startH);

    setEvents([...events, {
      id: Date.now(), 
      title: `Care: ${selectedChild}`, 
      employee: selectedEmployee,
      startDay: targetDay, 
      endDay: targetDay, 
      month: month, 
      year: year, 
      time: viewMode === "Month view" ? calculatedTimeRange : `${startH}:00 - ${endH}:00`, 
      startHour: startH, 
      durationHours: duration,
      color: randomColor
    }]);

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

  return (
    <div className="select-none p-2 font-sans" onMouseUp={handleMouseUp}>
      <CalendarHeader
        searchTerm={globalSearch} 
        setSearchTerm={() => {}} 
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
        />
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <CalendarModal 
            isModalOpen={isModalOpen} 
            // 👑 ফিক্স: উইক ভিউতে ড্র্যাগ করা সুনির্দিষ্ট তারিখটি মডালের ওপরে ১০০% লাইভ শো করবে
            dragStart={dragStart ? dragStart : currentDate.getDate()} 
            dragEnd={dragEnd ? dragEnd : currentDate.getDate()} 
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
