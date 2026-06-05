import { useState } from "react";
import { motion } from "framer-motion";
import MonthDayCell from "./MonthDayCell";
import MonthMultiDayBanners from "./MonthMultiDayBanners";

export default function MonthViewGrid({ 
  filteredDays, currentMonth, currentYear, direction, blankSlots, isSelected, handleMouseDown, handleMouseEnter, activeMobileDay, setActiveMobileDay, handleEventClick,
  handleEventDragStart, handleEventDrop, events // 👑 মেইন ইভেন্ট লিস্ট রিসিভ
}) {
  const [isMouseDragging, setIsMouseDragging] = useState(false);

  // 👑 মাসের মাল্টি-ডে ইভেন্টগুলো ফিল্টার করা (যেমন: Team offsite)
  const multiDayEvents = events ? events.filter(e => e.startDay !== e.endDay && Number(e.month) === Number(currentMonth)) : [];

  // একক দিনের ফিক্সড ইভেন্ট ফিল্টারিং 
  const getSingleDayEventsForDay = (day) => {
    return events ? events.filter(e => Number(day) === Number(e.startDay) && e.startDay === e.endDay && Number(e.month) === Number(currentMonth) && Number(e.year) === currentYear) : [];
  };

  // গত মে মাসের শেষ দিনগুলো (২৯, ৩০, ৩১) বের করার ম্যাথ লজিক
  const prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate(); 
  const prevMonthDaysArray = blankSlots.map((_, idx) => prevMonthLastDate - blankSlots.length + 1 + idx);

  // আগামী জুলাই মাসের শুরুর দিনগুলো (১, ২, ৩, ৪) বের করার ম্যাথ লজিক
  const totalGridSlots = blankSlots.length + filteredDays.length;
  const remainingSlotsCount = totalGridSlots % 7 === 0 ? 0 : 7 - (totalGridSlots % 7);
  const nextMonthDaysArray = Array.from({ length: remainingSlotsCount }, (_, i) => i + 1);

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
        
        {/* 👑 👑 ফিক্স ১: গত মাসের শেষ দিনগুলোর নম্বর স্পষ্ট ও প্রফেশনাল ক্লিয়ার রিড করা হলো (opacity-65 ও text-slate-500 সিঙ্কড) [▲] */}
        {prevMonthDaysArray.map((prevDay, index) => (
          <div key={`prev-${index}`} className="min-h-[70px] sm:min-h-[120px] bg-slate-50/40 p-1.5 sm:p-2 flex flex-col justify-start opacity-65 select-none cursor-not-allowed">
            <span className="text-xs font-bold text-slate-500 text-center sm:text-left transition-all">{prevDay}</span>
          </div>
        ))}

        {/* দিনগুলোর সেল ম্যাপ লুপ (আপনার ওরিজিনাল কোড অবিকল বহাল আছে) */}
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

        {/* 👑 👑 ফিক্স ২: আগামী জুলাই মাসের শুরুর দিনগুলোর নম্বর স্পষ্ট ও প্রফেশনাল ক্লিয়ার রিড করা হলো (opacity-65 ও text-slate-500 সিঙ্কড) [▲] */}
        {nextMonthDaysArray.map((nextDay, index) => (
          <div key={`next-${index}`} className="min-h-[70px] sm:min-h-[120px] bg-slate-50/40 p-1.5 sm:p-2 flex flex-col justify-start opacity-65 select-none cursor-not-allowed">
            <span className="text-xs font-bold text-slate-500 text-center sm:text-left transition-all">{nextDay}</span>
          </div>
        ))}

        {/* জাদুকরী ওভারলে লেয়ার: এটি স্ক্রিনশটের অবিকল 'Team offsite'-এর মতো একাধিক দিনের ইভেন্টকে চ্যাপ্টা ফিতা বানিয়ে দিবে */}
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
