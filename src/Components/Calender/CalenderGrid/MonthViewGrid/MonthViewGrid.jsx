import  { useState } from "react";
import { motion } from "framer-motion";
import MonthDayCell from "./MonthDayCell";
import MonthMultiDayBanners from "./MonthMultiDayBanners";

export default function MonthViewGrid({ 
  filteredDays, currentMonth, currentYear, direction, blankSlots, isSelected,  handleMouseDown, handleMouseEnter, activeMobileDay, setActiveMobileDay, handleEventClick,
  handleEventDragStart, handleEventDrop, events // 👑 মেইন ইভেন্ট লিস্ট রিসিভ
}) {
  const [isMouseDragging, setIsMouseDragging] = useState(false);

  // 👑 মাসের মাল্টি-ডে ইভেন্টগুলো ফিল্টার করা (যেমন: Team offsite)
  const multiDayEvents = events ? events.filter(e => e.startDay !== e.endDay && Number(e.month) === Number(currentMonth)) : [];

  // একক দিনের ফিক্সড ইভেন্ট ফিল্টারিং 
  const getSingleDayEventsForDay = (day) => {
    return events ? events.filter(e => Number(day) === Number(e.startDay) && e.startDay === e.endDay && Number(e.month) === Number(currentMonth) && Number(e.year) === currentYear) : [];
  };

  return (
    <div className="relative w-full">
      <motion.div 
        key={`${currentMonth}-${currentYear}`}
        custom={direction}
        variants={{
          enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
          center: { x: 0, opacity: 1 },
          exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 })
        }}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onMouseUp={() => setIsMouseDragging(false)}
        className="grid grid-cols-7 gap-px bg-[#EAECF0] relative"
      >
        {/* ব্ল্যাঙ্ক ডেস লুপ */}
        {blankSlots.map((_, index) => (
          <div key={`blank-${index}`} className="min-h-[70px] sm:min-h-[120px] bg-slate-50/50" />
        ))}

        {/* দিনগুলোর সেল ম্যাপ লুপ */}
        {filteredDays.map((day) => {
          const isDaySelected = isSelected(day);
          const singleDayEvents = getSingleDayEventsForDay(day);
          const isMobileActive = activeMobileDay === day;

          return (
            <MonthDayCell 
              key={day}
              day={day}
              isDaySelected={isDaySelected}
              dayEvents={singleDayEvents} 
              isMobileActive={isMobileActive}
              handleMouseDown={(d) => {
                setIsMouseDragging(true);
                if (handleMouseDown) handleMouseDown(d);
                if (setActiveMobileDay) setActiveMobileDay(d);
              }}
              handleMouseEnter={(d) => {
                if (isMouseDragging && handleMouseEnter) handleMouseEnter(d);
              }}
              handleEventClick={handleEventClick}
              handleEventDragStart={handleEventDragStart}
              handleEventDrop={handleEventDrop}
            />
          );
        })}

        {/* 👑 👑 জাদুকরী ওভারলে লেয়ার: এটি স্ক্রিনশটের অবিকল 'Team offsite'-এর মতো একাধিক দিনের ইভেন্টকে চ্যাপ্টা ফিতা বানিয়ে দিবে */}
        <MonthMultiDayBanners 
          multiDayEvents={multiDayEvents}
          blankSlots={blankSlots}
          filteredDays={filteredDays}
          handleEventClick={handleEventClick}
            handleEventDragStart={handleEventDragStart}
        />

      </motion.div>
    </div>
  );
}
