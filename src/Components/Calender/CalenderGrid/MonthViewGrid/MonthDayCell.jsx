import { useState } from "react";
import MonthEventCard from "./MonthEventCard";

export default function MonthDayCell({
  day, 
  isDaySelected, 
  dayEvents, 
  isMobileActive, 
  handleMouseDown, 
  setActiveMobileDay, 
  handleMouseEnter, 
  handleEventClick,
  handleEventDragStart, 
  handleEventDrop 
}) {

  const [activeTouchCardId, setActiveTouchCardId] = useState(null);

  // ১. মোবাইল স্ক্রিনে খালি জায়গায় ডেট রেঞ্জ সিলেক্ট করার ট্র্যাকার
  const handleTouchMoveGlobal = (e) => {
    if (activeTouchCardId || !handleMouseEnter || !e.touches || e.touches.length === 0) return;
    
    const touch = e.touches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    const targetDayCell = targetElement?.closest("[data-day]");
    
    if (targetDayCell) {
      const targetedDayValue = Number(targetDayCell.getAttribute("data-day"));
      if (targetedDayValue) handleMouseEnter(targetedDayValue);
    }
  };

  // 📱 ২. মোবাইল টাচ স্ক্রিনে ইভেন্ট কার্ড মুভ করার নিখুঁত লজিক
  const handleCardTouchMove = (e) => {
    if (!activeTouchCardId || !e.touches || e.touches.length === 0) return;
    if (e.cancelable) e.preventDefault(); 
    
    const touch = e.touches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    const targetDayCell = targetElement?.closest("[data-day]");
    
    if (targetDayCell) {
      const newTargetDay = Number(targetDayCell.getAttribute("data-day"));
      if (handleMouseEnter) handleMouseEnter(newTargetDay);
      window.lastTouchedDay = newTargetDay;
    }
  };

  const handleCardTouchEnd = () => {
    if (activeTouchCardId && handleEventDrop) {
      const dropTargetDay = window.lastTouchedDay || day;
      handleEventDrop(dropTargetDay); 
    }
    setActiveTouchCardId(null);
    window.lastTouchedDay = null;
  };

  return (
    <div
      data-day={day} 
      onMouseDown={() => { if (handleMouseDown) handleMouseDown(day); if (setActiveMobileDay) setActiveMobileDay(day); }}
      onMouseEnter={() => handleMouseEnter && handleMouseEnter(day)}
      onTouchStart={() => {
        if (!activeTouchCardId) {
          if (handleMouseDown) handleMouseDown(day);
          if (setActiveMobileDay) setActiveMobileDay(day);
        }
      }}
      onTouchMove={handleTouchMoveGlobal}
      onDragOver={(e) => e.preventDefault()} 
      onDrop={() => {
        if (handleEventDrop) handleEventDrop(day); 
      }}
      className={`min-h-[75px] sm:min-h-[120px] p-1.5 sm:p-2 transition-all flex flex-col relative cursor-cell bg-white select-none ${
        isDaySelected ? "!bg-violet-50/40" : ""
      }`}
    >
      {/* তারিখের গোল ব্যাজ */}
      <div className="flex sm:justify-start justify-center mb-1 select-none shrink-0">
        <span className={`h-6 w-6 sm:h-6.5 sm:w-6.5 flex items-center justify-center rounded-full text-center text-xs font-semibold transition-all ${
          isMobileActive || isDaySelected
            ? "bg-violet-600 text-white font-black shadow-xs shadow-violet-600/20"
            : "text-[#475467]"
        }`}>
          {day}
        </span>
      </div>

      {/* 👑 জাদুকরী ফিক্স: ল্যাপটপ এবং মোবাইল দুই ভিউর কার্ড কন্টেইনার (overflow-hidden করা হয়েছে) */}
      <div className="flex-1 space-y-1 overflow-hidden max-h-[75px] sm:max-h-[90px] w-full">
        {dayEvents.map(event => {
          const isThisCardDragging = activeTouchCardId === event.id;

          return (
            <div
              key={event.id}
              draggable="true" 
              onDragStart={() => handleEventDragStart && handleEventDragStart(event.id)} 
              onTouchStart={(e) => {
                e.stopPropagation(); 
                setActiveTouchCardId(event.id);
                if (handleEventDragStart) handleEventDragStart(event.id);
              }}
              onTouchMove={handleCardTouchMove}
              onTouchEnd={handleCardTouchEnd}
              className={`touch-none transition-all duration-150 rounded-xl cursor-grab active:cursor-grabbing w-full ${
                isThisCardDragging 
                  ? "opacity-40 scale-95 border-2 border-dashed border-violet-500 bg-violet-50" 
                  : "active:scale-95 active:brightness-95"
              }`}
            >
              <div className={isThisCardDragging ? "pointer-events-none brightness-75 select-none" : ""}>
                <MonthEventCard
                  event={event}
                  day={day}
                  handleEventClick={handleEventClick}
                />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
