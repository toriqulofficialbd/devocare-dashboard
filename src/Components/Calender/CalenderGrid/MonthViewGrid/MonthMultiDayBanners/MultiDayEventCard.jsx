export default function MultiDayEventCard({
  event,
  idx,
  blankSlots,
  filteredDays,
  isMobile,
  handleEventClick,
  handleEventDragStart
}) {
  const startGridIdx = blankSlots.length + filteredDays.findIndex(d => d === event.startDay);
  const endGridIdx = blankSlots.length + filteredDays.findIndex(d => d === event.endDay);

  // যদি এই মাসের শুরুর অফসেটের আগে চলে যায়, তবে রেন্ডার হবে না
  if (startGridIdx < blankSlots.length) return null;

  const startRow = Math.floor(startGridIdx / 7);
  const startCol = startGridIdx % 7;
  const endCol = endGridIdx % 7;

  const leftPercent = (startCol / 7) * 100;
  const widthPercent = ((endCol - startCol + 1) / 7) * 100;

  // রিয়াল-টাইম রেস্পন্সিভ লেআউট গাণিতিক হিসাব
  const rowHeight = isMobile ? 75 : 120;
  const topGap = isMobile ? 18 : 32;
  const itemGap = isMobile ? 18 : 34;
  const computedTop = (startRow * rowHeight) + topGap + (idx * itemGap);

  return (
    <div
      style={{
        left: `calc(${leftPercent}% + 4px)`,
        width: `calc(${widthPercent}% - 8px)`,
        top: `${computedTop}px`
      }}
      draggable="true"
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
}