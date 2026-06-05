

export default function MonthMultiDayBanners({
  multiDayEvents,
  blankSlots,
  filteredDays,
  handleEventClick,
  handleEventDragStart
}) {
  return (
    <div className="absolute inset-0 pointer-events-none  z-30 pt-8 pl-1 pr-1">
      {multiDayEvents.map((event, idx) => {
        const startGridIdx = blankSlots.length + filteredDays.findIndex(d => d === event.startDay);
        const endGridIdx = blankSlots.length + filteredDays.findIndex(d => d === event.endDay);

        if (startGridIdx < blankSlots.length) return null;

        const startRow = Math.floor(startGridIdx / 7);
        const startCol = startGridIdx % 7;
        const endCol = endGridIdx % 7;

        const leftPercent = (startCol / 7) * 100;
        const widthPercent = ((endCol - startCol + 1) / 7) * 100;
        const computedTop = (startRow * 120) + 32 + (idx * 34);

        return (
          <div
            key={event.id}
            style={{
              left: `calc(${leftPercent}% + 4px)`,
              width: `calc(${widthPercent}% - 8px)`,
              top: `${computedTop}px`
            }}

            // 👑 👑 ২. মাস্টার ম্যাজিক ফিক্স: বড় ব্যানার ইভেন্টগুলোকেও এখন টেনে সরানোর জন্য অফিশিয়াল ড্র্যাগ প্রোপার্টি বাইন্ড করা হলো [▲]
            draggable="true" // 👈 ব্যানার কার্ডটি ড্র্যাগ করার গ্লোবাল পারমিশন অন করা হলো [▲]
            onDragStart={() => handleEventDragStart && handleEventDragStart(event.id)}
            onClick={(e) => {
              e.stopPropagation();
              if (handleEventClick) handleEventClick(event);
            }}
            className={`absolute h-7 rounded-lg px-2 text-[10px] font-black flex flex-col justify-center border shadow-xs cursor-pointer pointer-events-auto hover:brightness-95 select-none text-left truncate transition-all ${event.color}`}
          >
            <span className="truncate leading-none mb-0.5">{event.title}</span>
            <span className="text-[8px] font-semibold opacity-80 leading-none truncate">{event.time}</span>
          </div>
        );
      })}
    </div>
  );
}
