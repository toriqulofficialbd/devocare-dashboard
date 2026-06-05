export default function MonthEventCard({ event, day, handleEventClick }) {
  const isFirstDay = day === event.startDay;
  const isLastDay = day === event.endDay;

  return (
    <div 
      // 👑 ১ম ধাপের ম্যাজিক ফিক্স: মাউস ডাউন বাবলিং বন্ধ করা হলো যাতে মডাল ক্র্যাশ না করে
      onMouseDown={(e) => e.stopPropagation()} 
      onClick={(e) => {
        e.stopPropagation(); // প্যারেন্ট ডিল ঘর সিঙ্ক ব্লক
        if (handleEventClick) handleEventClick(event); // 👑 এডিট মডাল ওপেন ট্রিগার
      }}
      className={`text-[10px] font-semibold px-2 h-8 flex items-center border-y transition-all cursor-pointer hover:brightness-95 select-none ${event.color} ${
        isFirstDay ? "rounded-l-lg border-l pl-2" : "border-l-0 pl-0 rounded-l-none"
      } ${isLastDay ? "rounded-r-lg border-r pr-2" : "border-r-0 pr-0 rounded-r-none"}`}
    >
      {isFirstDay ? (
        <div className="flex flex-col min-w-0 flex-1 justify-center text-left">
          
          {/* 👑 মোবাইলের জন্য টাইটেল ছোট করার এবং ডেস্কটপে ফুল দেখানোর লজিক */}
          <span className="truncate leading-none mb-0.5">
            <span className="block sm:hidden">
              {event.title.length > 6 ? `${event.title.substring(0, 6)}...` : event.title}
            </span>
            <span className="hidden sm:block">
              {event.title}
            </span>
          </span>

          {/* 👑 মোবাইল স্ক্রিনে হিজিবিজি কমানোর জন্য টাইমিং টেক্সট হাইড করা হলো */}
          <span className="hidden sm:block text-[8px] font-normal opacity-80 leading-none">
            {event.time}
          </span>
          
        </div>
      ) : (
        <div className="h-full w-full" />
      )}
    </div>
  );
}
