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
  const [editingEventId, setEditingEventId] = useState(null); // 👑 এডিটিং ট্র্যাক আইডি
  const [draggedEventId, setDraggedEventId] = useState(null);

    // 👑 চূড়ান্ত ফিক্স: ডেমো ডাটার চাইল্ড নেম ও স্টাফ নেম ড্রপডাউন লিস্টের টেক্সটের সাথে ১০০% হুবহু ম্যাচ করা হলো
  const [events, setEvents] = useState([
    { 
      id: 1, 
      title: "Care: Sami (Autism Spectrum)", // 👈 ওল্ড "Care: Sami" পরিবর্তন করে ফুল ড্রপডাউন নাম দেওয়া হলো [▲]
      employee: "Karim Rahman (Therapist)", 
      startDay: 1, endDay: 1, month: 5, year: 2026, time: "09:00 AM - 10:00 AM", startHour: 9, durationHours: 1, color: "bg-orange-50 text-orange-700 border-orange-200" 
    },
    { 
      id: 2, 
      title: "Care: Aria (Down Syndrome)", // 👈 ওল্ড "Care: Aria" পরিবর্তন করে ফুল ড্রপডাউন নাম দেওয়া হলো [▲]
      employee: "Sultana Begum (Nurse)", 
      startDay: 4, endDay: 4, month: 5, year: 2026, time: "04:00 PM - 05:30 PM", startHour: 16, durationHours: 1.5, color: "bg-violet-50 text-violet-700 border-violet-200" 
    },
    { 
      id: 3, 
      title: "Product Demo", // এটি প্রোডাক্ট ডেমো হিসেবে স্টাফের সাথে সিঙ্কড থাকবে
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
    
    if (viewMode === "Month view") {
      setCurrentDate(new Date(year, month - 1, 1)); // ১ মাস পেছনে যাবে
    } else if (viewMode === "Week view") {
      const prevWeek = new Date(currentDate);
      prevWeek.setDate(prevWeek.getDate() - 7); // ১ সপ্তাহ পেছনে যাবে
      setCurrentDate(prevWeek);
    } else if (viewMode === "Day view") {
      const prevDay = new Date(currentDate);
      prevDay.setDate(prevDay.getDate() - 1); // ১ দিন পেছনে যাবে
      setCurrentDate(prevDay);
    }
  };

  const handleNextMonth = () => {
    setDirection(1);
    
    if (viewMode === "Month view") {
      setCurrentDate(new Date(year, month + 1, 1)); // ১ মাস সামনে যাবে
    } else if (viewMode === "Week view") {
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(nextWeek.getDate() + 7); // ১ সপ্তাহ সামনে যাবে
      setCurrentDate(nextWeek);
    } else if (viewMode === "Day view") {
      const nextDay = new Date(currentDate);
      nextDay.setDate(nextDay.getDate() + 1); // ১ দিন সামনে যাবে
      setCurrentDate(nextDay);
    }
  };


  const handleToday = () => {
    const today = new Date(2026, 5, 3);
    setDirection(currentDate.getMonth() > 5 ? -1 : 1);
    setCurrentDate(today);
  };

  const handleMouseDown = (day) => { 
     setEditingEventId(null);
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

  // 👑 ফিচার ২: কার্ডে ক্লিক করলে মডাল প্রি-ফিল্ড হয়ে এডিট মুডে ওপেন হবে
  const handleEventClick = (eventObj) => {
    setEditingEventId(eventObj.id);
    // টাইটেল থেকে বাচ্চার নাম আলাদা করা
    const childName = eventObj.title.replace("Care: ", "").trim();
    setSelectedChild(childName);
    setSelectedEmployee(eventObj.employee);
    
    setDragStart(eventObj.startDay);
    setDragEnd(eventObj.endDay);
    setIsModalOpen(true);
  };

  // 👑 👑 👑 ফিচার ৩: ইভেন্ট ড্র্যাগ অ্যান্ড drop রিসেডিউল ইঞ্জিন
  const handleEventDragStart = (eventId) => {
    setDraggedEventId(eventId);
  };

    // 👑 ২ নম্বর ধাপের চূড়ান্ত ম্যাজিক ফিক্স: উইক ও ডে ভিউর লাইভ ড্র্যাগ অ্যান্ড ড্রপ মুভিং এবং রিসেডিউল ইঞ্জিন সচল করা হলো
  const handleEventDrop = (targetDay, targetHour = null) => {
    if (!draggedEventId) return;

    setEvents((prevEvents) =>
      prevEvents.map((ev) => {
        if (ev.id === draggedEventId) {
          // 👑 ডাইনামিক টাইপ কাস্টিং সেফগার্ড: অবজেক্ট বা নরমাল নাম্বার—উভয় ফরম্যাট থেকেই পিউর সংখ্যা বের করা
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

          // ঘণ্টার নতুন পজিশন ও টেক্সট স্ট্রিং ফরম্যাটার সিঙ্ক
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

          // নতুন ডেটা ম্যাপ অবজেক্ট রিটার্ন (পুরোনো জায়গা থেকে অটো মুছে নতুন ঘরে শিফট হবে)
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
    
    // ড্র্যাগড আইডি ক্লিনিং ও রিলিজ
    setDraggedEventId(null);
  };

  
    const handleAddEventClick = () => { 
    setEditingEventId(null);
    
    // 👑 গ্লিচ ফিক্স: নতুন ইভেন্ট ফর্মে যাতে আগের ডাটা না দেখায়, সেজন্য স্টেট ব্ল্যাঙ্ক করা হলো
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
    
    // 👑 মোডাল বন্ধ করার সময়ও সেফটি রিসেট করে দেওয়া হলো
    if (setSelectedChild) setSelectedChild(""); 
    if (setSelectedEmployee) setSelectedEmployee("");

    setIsModalOpen(false); 
  };


  // 👑 লজিক ফিক্স ১: অবজেক্ট এবং সাধারণ নাম্বার—উভয় প্রকার তারিখ সিঙ্কের জন্য ইউনিভার্সাল সেফগার্ড
    // 👑 পরিবর্তন ১: আপনার ফাইলের আনুমানিক ৭০ নম্বর লাইনে থাকা 'isSelected' ফাংশনটি পরিবর্তন করুন:
  const isSelected = (day) => {
    if (!dragStart || !dragEnd) return false;
    
    // উইক বা ডে ভিউ থেকে অবজেক্ট আসলে .day রিড করবে, মান্থ ভিউ থেকে আসলে সরাসরি নম্বর রিড করবে
    const startNum = typeof dragStart === "object" ? dragStart.day : dragStart;
    const endNum = typeof dragEnd === "object" ? dragEnd.day : dragEnd;
    
    return day >= Math.min(startNum, endNum) && day <= Math.max(startNum, endNum);
  };


  // 👑 👑 লজিক ফিক্স ২: উইক ভিউ থেকে আসা পিউর ডেট অবজেক্ট থেকে ডাইনামিকালি সঠিক দিন ও মাস এক্সট্রাক্ট করার মাস্টার ইঞ্জিন
    
    // 👑 পরিবর্তন ২: আপনার ফাইলের আনুমানিক ১০৫ নম্বর লাইনে থাকা 'handleCreateEvent' ফাংশনটি পরিবর্তন করুন:
  const handleCreateEvent = (e, calculatedTimeRange) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!selectedChild || !selectedEmployee) return;

    // মডাল থেকে সাবমিট হয়ে আসা নতুন টাইম টেক্সট (যেমন: "02:00 PM - 03:00 PM")
    const finalTimeText = calculatedTimeRange || "10:00 AM - 11:00 AM";

    // এএম/পিএম স্ট্রিং থেকে ২৪ ঘণ্টার ডিজিটাল আওয়ার ইনডেক্স বের করার ইউনিভার্সাল লজিক
    let extractedStartHour = 10;
    const timeParts = finalTimeText.split("-")[0].trim();
    const matches = timeParts.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (matches) {
      let h = parseInt(matches[1], 10);
      const period = matches[3].toUpperCase();
      if (period === "PM" && h < 12) h += 12;
      if (period === "AM" && h === 12) h = 0;
      extractedStartHour = h;
    }

    if (editingEventId) {
      // এডিট মুড সেভ লজিক (আগের মতোই থাকবে)
      setEvents((prev) => prev.map(ev => {
        if (ev.id === editingEventId) {
          return { ...ev, title: `Care: ${selectedChild}`, employee: selectedEmployee, time: finalTimeText, startHour: Number(extractedStartHour) };
        }
        return ev;
      }));
    } else {
      // 👑 নতুন ইভেন্ট তৈরির সময় ডাইনামিক ডেট এবং টাইম রেঞ্জ সিঙ্ক লজিক
      const colors = ["bg-violet-50 text-violet-700 border-violet-200", "bg-teal-50 text-teal-700 border-teal-200", "bg-orange-50 text-orange-700 border-orange-200"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const isTimelineView = viewMode === "Week view" || viewMode === "Day view";
      
      // শুরুর দিন ও শেষের দিন আলাদা করা (৩ থেকে ৭ তারিখ লকিং মেকানিজম)
      const startDayNum = typeof dragStart === "object" ? dragStart.day : (dragStart || currentDate.getDate());
      const endDayNum = typeof dragEnd === "object" ? (dragEnd.endDay || dragEnd.day) : (dragEnd || currentDate.getDate());

      // উইক/ডে ভিউতে গ্রিডের টানা সময় লক করবে, মান্থ ভিউতে মডালের ড্রপডাউন সময় লক করবে
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
        endDay: Number(endDayNum), // 👈 এখন ৩ থেকে ৭ তারিখ পর্যন্ত পুরো কলাম রেঞ্জ ডাটাবেজে লক হবে [▲]
        month: Number(month), 
        year: Number(year), 
        time: creationTimeText, 
        startHour: startH, 
        durationHours: duration,
        color: randomColor
      };

      setEvents((prev) => [...prev, newCreatedEvent]);
    }

    // স্টেট ও মডাল রিসেট
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

  // 👑 লজিক ফিক্স ৩: মডাল হেডার ডেট টেক্সট প্রিন্ট করার জন্য ডেট অবজেক্ট সেফগার্ড মেথড
    // 👑 পরিবর্তন ৩: আপনার ফাইলের আনুমানিক ১৫৫ নম্বর লাইনের দিকে থাকা 'getModalDayDisplay' ফাংশনটি মুছে এই ২টি ছোট ফাংশন বসিয়ে দিন:
  const getModalStartDay = () => {
    if (dragStart && typeof dragStart === "object") return dragStart.day;
    return dragStart || currentDate.getDate();
  };

  const getModalEndDay = () => {
    if (dragEnd && typeof dragEnd === "object") return dragEnd.endDay || dragEnd.day;
    return dragEnd || currentDate.getDate();
  };


  return (
    <div className="select-none p-2  font-sans" onMouseUp={handleMouseUp}>
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
            dragStart={getModalStartDay()} 
            dragEnd={getModalEndDay()} 
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
          />
        )}
      </AnimatePresence>
    </div>
  );
}
