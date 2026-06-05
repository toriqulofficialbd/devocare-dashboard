

export default function WeekViewHeader({ 
  weekDatesList, 
  currentDate, 
  daysOfWeek, 
  handleGridMouseDown 
}) {
  return (
    <div className="grid lg:grid-cols-[65px_1fr] border-b border-[#D0D5DD] bg-white shrink-0 sticky top-0 z-0 shadow-xs">
      <div className="md:border-r border-[#D0D5DD] bg-[#F9FAFB]/50" />
      
      <div className="grid grid-cols-7 divide-x divide-[#D0D5DD] overflow-x-auto scrollbar-none">
        {weekDatesList.map((dateItem, idx) => {
          const dayNum = dateItem.getDate();
          const monthNum = dateItem.getMonth();
          const isTodayActive = dayNum === currentDate.getDate() && monthNum === currentDate.getMonth();

          return (
            <div 
              key={idx} 
              onMouseDown={(e) => {
                if (handleGridMouseDown) {
                  handleGridMouseDown(e, dateItem); 
                }
              }}
              className="py-2 text-center flex items-center justify-center bg-white min-w-0 md:h-12 h-14 cursor-cell"
            >
              <div className="flex flex-col md:flex-row items-center lg:gap-1 gap-1.5 lg:text-[12px] text-xs font-bold transition-all">
                <span className={isTodayActive ? "text-violet-600 font-bold" : "text-[#475467] font-semibold"}>
                  {daysOfWeek[dateItem.getDay()]}
                </span>
                <span className={`lg:h-6 lg:w-6 h-7 w-7 flex items-center justify-center rounded-full text-center transition-all ${
                  isTodayActive 
                    ? "bg-violet-600 text-white font-black shadow-md shadow-violet-600/20" 
                    : "text-[#101828] font-bold"
                }`}>
                  {dayNum}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
