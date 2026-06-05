
import HoverPlusButton from "../HoverPlusButton";
import MonthEventCard from "./MonthEventCard";

export default function MonthDayCell({
  day, isDaySelected, dayEvents, isMobileActive, handleMouseDown, setActiveMobileDay, handleMouseEnter, handleEventClick,
  handleEventDragStart, handleEventDrop // 👑 ১. ফিক্স: প্যারেন্ট থেকে আসা গ্লোবাল ড্র্যাগ এবং ড্রপ মেথড দুটি রিসিভ করা হলো
}) {
  return (
    <div
      onMouseDown={() => { if (handleMouseDown) handleMouseDown(day); if (setActiveMobileDay) setActiveMobileDay(day); }}
      onMouseEnter={() => handleMouseEnter && handleMouseEnter(day)}

      // 👑 👑 ২. ম্যাজিক ফিক্স: মাসের এই সুনির্দিষ্ট তারিখের ঘরটি যাতে উপর থেকে টেনে আনা কার্ডের ড্রপ সিগন্যাল রিসিভ করতে পারে
      onDragOver={(e) => e.preventDefault()} // 👈 কার্ডটি মাউসের মাথায় হোল্ড ধরে রাখবে
      onDrop={() => {
        if (handleEventDrop) handleEventDrop(day); // 👈 মাউস ছেড়ে দিলে ওই নতুন তারিখের সংখ্যাটি প্যারেন্টে পাঠাবে [▲]
      }}

      className={`min-h-[70px] sm:min-h-[120px] p-1.5 sm:p-2 transition-all flex flex-col relative cursor-cell bg-white ${isDaySelected ? "!bg-violet-50/40" : ""
        }`}
    >
      {/* তারিখের গোল বেগুনি ব্যাজ নোড */}
      <div className="flex sm:justify-start justify-center mb-1 select-none shrink-0">
        <span className={`h-6 w-6 sm:h-6.5 sm:w-6.5 flex items-center justify-center rounded-full text-center text-xs font-semibold transition-all ${isMobileActive || isDaySelected
            ? "bg-violet-600 text-white font-black shadow-xs shadow-violet-600/20"
            : "text-[#475467]"
          }`}>
          {day}
        </span>
      </div>

      {/* ল্যাপটপ ভিউর ইভেন্ট লিস্ট কন্টেইনার */}
      <div className="hidden sm:block flex-1 space-y-1 overflow-y-auto max-h-[75px] sm:max-h-[90px]">
        {dayEvents.map(event => (
          <div
            key={event.id}
            // 👑 👑 ৩. ম্যাজিক ফিক্স: প্রতিটি কার্ডকে টেনে নিয়ে যাওয়ার জন্য ড্র্যাগ পারমিশন এবং আইডি লকিং মেথড বাইন্ড করা হলো
            draggable="true" // 👈 কার্ডটি ড্র্যাগ করার পারমিশন অন [▲]
            onDragStart={() => handleEventDragStart && handleEventDragStart(event.id)} // 👈 ড্র্যাগ শুরুর সাথে সাথে আইডি লক [▲]
          >
            <MonthEventCard
              event={event}
              day={day}
              handleEventClick={handleEventClick}
            />
          </div>
        ))}
      </div>


      <HoverPlusButton />
      {/* মোবাইল ভিউর ছোট কালারফুল ডট ইন্ডিকেটরস */}
      <div className="flex sm:hidden flex-wrap gap-0.5 justify-center mt-auto pb-1">
        {dayEvents.map((event) => (
          <span key={event.id} className={`h-1.5 w-1.5 rounded-full ${event.color.includes("violet") ? "bg-violet-500" : event.color.includes("orange") ? "bg-orange-500" : "bg-teal-500"}`} />
        ))}
      </div>
    </div>
  );
}
