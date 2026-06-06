import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CalendarHeader from "../Components/Calender/CalendarHeader";
import CalendarGrid from "../Components/Calender/CalenderGrid/CalendarGrid";
import CalendarModal from "../Components/Calender/CalenderGrid/CalendarModal/CalendarModal";


export default function CalendarView() {
  const globalSearch = useOutletContext();

  const [activeModalTime, setActiveModalTime] = useState("09:00 AM - 10:00 AM");

  const [calendarSearch, setCalendarSearch] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("Month view");
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [editingEventId, setEditingEventId] = useState(null);
  const [draggedEventId, setDraggedEventId] = useState(null);


  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Care: Sami (Autism Spectrum)",
      employee: "Karim Rahman (Therapist)",
      startDay: 1, endDay: 1, month: 5, year: 2026, time: "09:00 AM - 10:00 AM", startHour: 9, durationHours: 1, color: "bg-orange-50 text-orange-700 border-orange-200"
    },
    {
      id: 2,
      title: "Care: Aria (Down Syndrome)",
      employee: "Sultana Begum (Nurse)",
      startDay: 4, endDay: 4, month: 5, year: 2026, time: "04:00 PM - 05:30 PM", startHour: 16, durationHours: 1.5, color: "bg-violet-50 text-violet-700 border-violet-200"
    },
    {
      id: 3,
      title: "Product Demo",
      employee: "Abir Hasan (Caregiver)",
      startDay: 2, endDay: 2, month: 5, year: 2026, time: "04:30 PM - 05:30 PM", startHour: 16.5, durationHours: 1, color: "bg-blue-50 text-blue-700 border-blue-200"
    },
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

    if (viewMode === "Month view") {
      setCurrentDate(new Date(year, month - 1, 1));
    } else if (viewMode === "Week view") {
      const prevWeek = new Date(currentDate);
      prevWeek.setDate(prevWeek.getDate() - 7);
      setCurrentDate(prevWeek);
    } else if (viewMode === "Day view") {
      const prevDay = new Date(currentDate);
      prevDay.setDate(prevDay.getDate() - 1);
      setCurrentDate(prevDay);
    }
  };

  const handleNextMonth = () => {
    setDirection(1);

    if (viewMode === "Month view") {
      setCurrentDate(new Date(year, month + 1, 1));
    } else if (viewMode === "Week view") {
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(nextWeek.getDate() + 7);
      setCurrentDate(nextWeek);
    } else if (viewMode === "Day view") {
      const nextDay = new Date(currentDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCurrentDate(nextDay);
    }
  };


  const handleToday = () => {
    const today = new Date(2026, 5, 3);
    setDirection(currentDate.getMonth() > 5 ? -1 : 1);
    setCurrentDate(today);
  };

  const handleMouseDown = (dayInfo) => {
    setEditingEventId(null);
    setSelectedChild("");
    setSelectedEmployee("");
    setIsDragging(true);

    setDragStart(dayInfo);
    setDragEnd(dayInfo);




    if (weekDragHours) {
      const formatHourString = (h) => {
        const intH = Math.floor(h);
        const minVal = Math.round((h - intH) * 60);
        const displayH = intH === 0 || intH === 12 ? 12 : intH > 12 ? intH - 12 : intH;
        const displayM = minVal === 0 ? "00" : minVal < 10 ? `0${minVal}` : minVal;
        const period = intH >= 12 ? "PM" : "AM";
        return `${displayH < 10 ? '0' + displayH : displayH}:${displayM} ${period}`;
      };
      setActiveModalTime(`${formatHourString(weekDragHours.start)} - ${formatHourString(weekDragHours.end)}`);
    }

    console.log("📢 [LIVE DEBUG 1] Raw dragStart Data Passed ->", dayInfo);
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


  const handleEventClick = (eventObj) => {
    setEditingEventId(eventObj.id);
    setActiveModalTime(eventObj.time);

    const childName = eventObj.title.replace("Care: ", "").trim();
    setSelectedChild(childName);
    setSelectedEmployee(eventObj.employee);

    setDragStart(eventObj.startDay);
    setDragEnd(eventObj.endDay);
    setIsModalOpen(true);
  };


  const handleEventDragStart = (eventId) => {
    setDraggedEventId(eventId);
  };


  const handleEventDrop = (targetDay, targetHour = null) => {
    if (!draggedEventId) return;

    setEvents((prevEvents) =>
      prevEvents.map((ev) => {
        if (ev.id === draggedEventId) {

          let updatedDay = ev.startDay;
          let updatedMonth = ev.month;
          let updatedYear = ev.year;

          if (targetDay && typeof targetDay === "object") {
            updatedDay = targetDay.day !== undefined ? targetDay.day : targetDay.getDate();
            updatedMonth = targetDay.month !== undefined ? targetDay.month : targetDay.getMonth();
            updatedYear = targetDay.year !== undefined ? targetDay.year : targetDay.getFullYear();
          } else if (targetDay) {
            updatedDay = targetDay;
          }

          let updatedStartHour = ev.startHour;
          let updatedTime = ev.time;


          if (targetHour !== null) {
            updatedStartHour = Number(targetHour);
            const endH = updatedStartHour + ev.durationHours;

            const formatHourString = (h) => {
              if (h === 0 || h === 24) return "12:00 AM";
              if (h === 12) return "12:00 PM";
              return h > 12 ? `${h - 12}:00 PM` : `${h}:00 AM`;
            };
            updatedTime = `${formatHourString(updatedStartHour)} - ${formatHourString(endH)}`;
          }


          return {
            ...ev,
            startDay: Number(updatedDay),
            endDay: Number(updatedDay),
            month: Number(updatedMonth),
            year: Number(updatedYear),
            startHour: Number(updatedStartHour),
            time: updatedTime
          };
        }
        return ev;
      })
    );


    setDraggedEventId(null);
  };


  const handleAddEventClick = () => {
    setEditingEventId(null);


    if (setSelectedChild) setSelectedChild("");
    if (setSelectedEmployee) setSelectedEmployee("");

    setDragStart(currentDate.getDate());
    setDragEnd(currentDate.getDate());
    setWeekDragHours({ start: 10, end: 11 });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingEventId(null);
    setDragStart(null);
    setDragEnd(null);


    if (setSelectedChild) setSelectedChild("");
    if (setSelectedEmployee) setSelectedEmployee("");

    setIsModalOpen(false);
  };



  const isSelected = (day) => {
    if (!dragStart || !dragEnd) return false;


    const startNum = typeof dragStart === "object" ? dragStart.day : dragStart;
    const endNum = typeof dragEnd === "object" ? dragEnd.day : dragEnd;

    return day >= Math.min(startNum, endNum) && day <= Math.max(startNum, endNum);
  };



  const handleCreateEvent = (e, calculatedTimeRange) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!selectedChild || !selectedEmployee) return;

    console.log("🛠️ EDITING EVENT ID:", editingEventId);
    console.log("⏰ SUBMITTED TIME TEXT FROM MODAL:", calculatedTimeRange);

    const finalTimeText = calculatedTimeRange || "10:00 AM - 11:00 AM";
    let extractedStartHour = 10;
    let extractedEndHour = 11;


    const matches = finalTimeText.match(/(\d+):(\d+)\s*(AM|PM)/gi);

    if (matches && matches.length >= 2) {

      const startParts = matches[0].match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (startParts) {
        let h = parseInt(startParts[1], 10);
        let m = parseInt(startParts[2], 10);
        const period = startParts[3].toUpperCase();
        if (period === "PM" && h < 12) h += 12;
        if (period === "AM" && h === 12) h = 0;
        extractedStartHour = h + (m / 60);
      }


      const endParts = matches[1].match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (endParts) {
        let h = parseInt(endParts[1], 10);
        let m = parseInt(endParts[2], 10);
        const period = endParts[3].toUpperCase();
        if (period === "PM" && h < 12) h += 12;
        if (period === "AM" && h === 12) h = 0;
        extractedEndHour = h + (m / 60);
      }
    }
    const finalDurationHours = Math.max(0.5, extractedEndHour - extractedStartHour);

    if (editingEventId) {

      setEvents((prev) => prev.map(ev => {
        if (ev.id === editingEventId) {

          const updatedStartDay = typeof dragStart === "object" ? dragStart.day : dragStart;
          const updatedEndDay = typeof dragEnd === "object" ? dragEnd.day : dragEnd;
          return {
            ...ev,
            title: selectedChild.includes("Care:") ? selectedChild : `Care: ${selectedChild}`,
            employee: selectedEmployee,
            time: finalTimeText,
            startHour: Number(extractedStartHour),
            durationHours: Number(finalDurationHours),
            startDay: Number(updatedStartDay || ev.startDay),
            endDay: Number(updatedEndDay || ev.endDay)
          };
        }
        return ev;
      }));
    } else {

      const colors = ["bg-violet-50 text-violet-700 border-violet-200", "bg-teal-50 text-teal-700 border-teal-200", "bg-orange-50 text-orange-700 border-orange-200"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const isTimelineView = viewMode === "Week view" || viewMode === "Day view";


      const startDayNum = typeof dragStart === "object" ? dragStart.day : (dragStart || currentDate.getDate());
      const endDayNum = typeof dragEnd === "object" ? (dragEnd.endDay || dragEnd.day) : (dragEnd || currentDate.getDate());


      const startH = isTimelineView && weekDragHours ? weekDragHours.start : extractedStartHour;
      const endH = isTimelineView && weekDragHours ? weekDragHours.end : (extractedStartHour + 1);
      const duration = Math.max(0.5, endH - startH);

      const formatHourString = (h) => {
        if (h === 0 || h === 24) return "12:00 AM";
        if (h === 12) return "12:00 PM";
        return h > 12 ? `${h - 12}:00 PM` : `${h}:00 AM`;
      };

      const creationTimeText = isTimelineView
        ? `${formatHourString(startH)} - ${formatHourString(endH)}`
        : finalTimeText;

      const newCreatedEvent = {
        id: Date.now(),
        title: `Care: ${selectedChild}`,
        employee: selectedEmployee,
        startDay: Number(startDayNum),
        endDay: Number(endDayNum),
        month: Number(month),
        year: Number(year),
        time: creationTimeText,
        startHour: startH,
        durationHours: duration,
        color: randomColor
      };

      setEvents((prev) => [...prev, newCreatedEvent]);
    }


    setSelectedChild("");
    setSelectedEmployee("");
    setDragStart(null);
    setDragEnd(null);
    setEditingEventId(null);
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



  // const getModalStartDay = () => {
  // if (!dragStart) return currentDate.getDate();
  // if (typeof dragStart === "object") {
  //
  // return dragStart.day !== undefined ? dragStart.day : (typeof dragStart.getDate === "function" ? dragStart.getDate() : currentDate.getDate());
  // }
  // return dragStart;
  // };

  // const getModalEndDay = () => {
  // if (!dragEnd) return currentDate.getDate();
  // if (typeof dragEnd === "object") {
  // return dragEnd.endDay !== undefined ? dragEnd.endDay : (dragEnd.day !== undefined ? dragEnd.day : (typeof dragEnd.getDate === "function" ? dragEnd.getDate() : currentDate.getDate()));
  // }
  // return dragEnd;
  // };



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
          handleEventClick={handleEventClick}
          handleEventDragStart={handleEventDragStart}
          handleEventDrop={handleEventDrop}
        />
      </div>

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
            viewMode={viewMode}
            isEditing={!!editingEventId}
            setDragStart={setDragStart}
            setDragEnd={setDragEnd}
            activeModalTime={activeModalTime}
            currentMonth={month}
            currentYear={year}

          />
        )}
      </AnimatePresence>
    </div>
  );
}