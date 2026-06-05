import { useEffect, useState } from "react";
import MultiDayEventCard from "./MultiDayEventCard";

export default function MonthMultiDayBanners({
  multiDayEvents,
  blankSlots,
  filteredDays,
  handleEventClick,
  handleEventDragStart
}) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  // উইন্ডো রেসাইজ (Inspect / Zoom) লাইভ ট্র্যাকিং লুপ এফেক্ট
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 pt-8 pl-1 pr-1">
      {multiDayEvents.map((event, idx) => (
        <MultiDayEventCard
          key={event.id}
          event={event}
          idx={idx}
          blankSlots={blankSlots}
          filteredDays={filteredDays}
          isMobile={isMobile}
          handleEventClick={handleEventClick}
          handleEventDragStart={handleEventDragStart}
        />
      ))}
    </div>
  );
}