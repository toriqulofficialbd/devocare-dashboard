import  { useState } from "react";
import { motion } from "framer-motion";
import { User, Clock } from "lucide-react";

export default function CalendarGrid({ 
  filteredDays, events, currentMonth, currentYear, handleMouseDown, handleMouseEnter, isSelected, direction 
}) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // মোবাইলে কোন দিনের ডিটেইলস নিচে দেখাবে তা ট্র্যাক করার স্টেট (ডিফল্ট আজকের তারিখ ২)
  const [activeMobileDay, setActiveMobileDay] = useState(2);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 })
  };

  // নির্দিষ্ট দিনের সব ইভেন্ট ফিল্টার করার ফাংশন
  const getEventsForDay = (day) => {
    return events.filter(e => day >= e.startDay && day <= e.endDay && e.month === currentMonth && e.year === currentYear);
  };

  return (
    <div className="bg-white border border-[#EAECF0] rounded-2xl shadow-xs overflow-hidden">
      
      {/* 📅 সপ্তাহের বারগুলোর নাম */}
      <div className="grid grid-cols-7 border-b border-[#EAECF0] bg-white">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="py-2.5 text-center text-[11px] sm:text-xs font-semibold text-[#475467] tracking-wide">
            {day}
          </div>
        ))}
      </div>

      {/* 🧩 ক্যালেন্ডারের মেইন গ্রিড */}
      <motion.div 
        key={`${currentMonth}-${currentYear}`}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="grid grid-cols-7 gap-px bg-[#EAECF0]"
      >
        {filteredDays.map((day) => {
          const isDaySelected = isSelected(day);
          const dayEvents = getEventsForDay(day);
          const isMobileActive = activeMobileDay === day;

          return (
            <div 
              key={day} 
              onMouseDown={() => {
                handleMouseDown(day);
                setActiveMobileDay(day); // মোবাইল ভিউয়ের জন্য একটিভ ডে সেট
              }}
              onMouseEnter={() => handleMouseEnter(day)}
              className={`min-h-[70px] sm:min-h-[120px] p-1.5 sm:p-2 transition-all flex flex-col relative cursor-cell bg-white ${
                isDaySelected ? "!bg-violet-50/40" : ""
              } ${isMobileActive ? "ring-2 ring-violet-600 ring-inset z-10" : ""}`}
            >
              {/* তারিখ সংখ্যা */}
              <span className={`text-xs font-semibold mb-1 ${
                isDaySelected ? "text-violet-700 font-bold" : "text-[#475467]"
              }`}>
                {day}
              </span>
              
              {/* 💻 ডেস্কটপ ভিউ ইভেন্ট (ল্যাপটপে লম্বা ব্যানার দেখাবে, মোবাইলে হাইড থাকবে) */}
              <div className="hidden sm:block flex-1 space-y-1 overflow-y-auto">
                {dayEvents.map(event => {
                  const isFirstDay = day === event.startDay;
                  const isLastDay = day === event.endDay;

                  return (
                    <div 
                      key={event.id} 
                      className={`text-[10px] font-semibold px-2 h-8 flex items-center border-y transition-all ${event.color} ${
                        isFirstDay ? "rounded-l-lg border-l pl-2" : "border-l-0 pl-0 rounded-l-none"
                      } ${
                        isLastDay ? "rounded-r-lg border-r pr-2" : "border-r-0 pr-0 rounded-r-none"
                      }`}
                    >
                      {isFirstDay ? (
                        <div className="flex flex-col min-w-0 flex-1 justify-center">
                          <span className="truncate leading-none mb-0.5">{event.title}</span>
                          <span className="text-[8px] font-normal opacity-80 leading-none">{event.time}</span>
                        </div>
                      ) : (
                        <div className="h-full w-full" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 📱 মোবাইল ভিউ ইভেন্ট ইন্ডিকেটর (মোবাইলে শুধু সুন্দর রঙিন ডট দেখাবে) */}
              <div className="flex sm:hidden flex-wrap gap-0.5 justify-center mt-auto pb-1">
                {dayEvents.map((event) => (
                  <span 
                    key={event.id} 
                    className={`h-1.5 w-1.5 rounded-full ${
                      event.color.includes("violet") ? "bg-violet-500" : event.color.includes("orange") ? "bg-orange-500" : "bg-teal-500"
                    }`}
                  />
                ))}
              </div>

            </div>
          );
        })}
      </motion.div>

      {/* 📱 মোবাইল এজেন্ডা সেকশন (শুধুমাত্র মোবাইল স্ক্রিনে নিচে সুন্দর লিস্ট দেখাবে) */}
      <div className="block sm:hidden border-t border-[#EAECF0] bg-[#F9FAFB] p-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xs font-bold text-[#344054] uppercase tracking-wider">
            Schedule for June {activeMobileDay}
          </h4>
          <span className="text-[11px] font-medium text-slate-400">
            {getEventsForDay(activeMobileDay).length} Care Duties
          </span>
        </div>

        <div className="space-y-2.5">
          {getEventsForDay(activeMobileDay).length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4 bg-white rounded-xl border border-dashed border-slate-200">
              No duties scheduled for this day.
            </p>
          ) : (
            getEventsForDay(activeMobileDay).map(event => (
              <div 
                key={event.id} 
                className={`p-3 rounded-xl border bg-white shadow-xs flex flex-col gap-1.5 border-l-4 ${
                  event.color.includes("violet") ? "border-l-violet-500" : event.color.includes("orange") ? "border-l-orange-500" : "border-l-teal-500"
                }`}
              >
                <div className="text-sm font-bold text-slate-900">{event.title}</div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <User size={12} className="text-slate-400" /> {event.employee.split(" ")[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-slate-400" /> {event.time}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
