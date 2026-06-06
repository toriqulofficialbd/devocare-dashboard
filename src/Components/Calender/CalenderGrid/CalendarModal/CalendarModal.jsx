import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CalendarModal({
  isModalOpen,
  dragStart,
  dragEnd,
  handleCreateEvent,
  closeModal,
  selectedChild,
  setSelectedChild,
  selectedEmployee,
  setSelectedEmployee,
  childrenList = [],
  employees = [],
  viewMode = "Month view",
  isEditing = false,
  setDragStart,
  setDragEnd,
  activeModalTime,
  currentMonth,
  currentYear
  
}) {

  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("10:00 AM");

  const [startHour, setStartHour] = useState("09:00");
  const [startPeriod, setStartPeriod] = useState("AM");

  const [endHour, setEndHour] = useState("10:00");
  const [endPeriod, setEndPeriod] = useState("AM");



  useEffect(() => {
    if (isModalOpen) {
     
       console.log("📢 [DEBUG 3] Modal Received dragStart Prop ->", dragStart);
      const rawTimeText = activeModalTime || "09:00 AM - 10:00 AM";

      setStartTime(rawTimeText.split(" - ")[0] || "09:00 AM");
      setEndTime(rawTimeText.split(" - ")[1] || "10:00 AM");

      const matches = rawTimeText.match(/(\d+):(\d+)\s*(AM|PM)/gi);
      if (matches && matches.length >= 2) {
        const startParts = matches[0].split(" ");
        if (startParts.length >= 2) {
          setStartHour(startParts[0]);
          setStartPeriod(startParts[1].toUpperCase());
        }
        const endParts = matches[1].split(" ");
        if (endParts.length >= 2) {
          setEndHour(endParts[0]);
          setEndPeriod(endParts[1].toUpperCase());
        }
      }

      
    }
  }, [isModalOpen, isEditing, activeModalTime, dragStart, dragEnd]); 




  if (!isModalOpen || !dragStart || !dragEnd) return null;

  
  const hourOptions = [
    "12:00", "01:00", "02:00", "03:00", "04:00", "05:00",
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00"
  ];



  
  const isTimelineMode = viewMode === "Week view" || viewMode === "Day view";

  
  const shouldHideTimeDropdown = isTimelineMode && !isEditing;

  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

 
  const startFormattedText = dragStart && typeof dragStart === "object" ? `${monthNames[dragStart.month]} ${dragStart.day}, ${dragStart.year}` : `${monthNames[currentMonth]} ${dragStart}, ${currentYear}`;
  const endFormattedText = dragEnd && typeof dragEnd === "object" ? `${monthNames[dragEnd.month]} ${dragEnd.day}, ${dragEnd.year}` : `${monthNames[currentMonth]} ${dragEnd}, ${currentYear}`;
  
  const dateNoticeHeading = startFormattedText === endFormattedText ? startFormattedText : `${startFormattedText} to ${endFormattedText}`;


  
  // const minDay = Math.min(Number(dragStart), Number(dragEnd));
  // const maxDay = Math.max(Number(dragStart), Number(dragEnd));
  // const dateText = minDay === maxDay ? `June ${minDay}, 2026` : `June ${minDay} to June ${maxDay}, 2026`;

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const finalStartTime = `${startHour} ${startPeriod}`;
    const finalEndTime = `${endHour} ${endPeriod}`;
    const calculatedTimeRange = shouldHideTimeDropdown ? "" : `${finalStartTime} - ${finalEndTime}`;
    handleCreateEvent(e, calculatedTimeRange);
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={closeModal} />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 z-10 relative"
      >
        <h3 className="text-base font-bold text-slate-900 mb-1">
          {isEditing ? "✏️ Update Care Schedule" : "✨ New Care Schedule"}
        </h3>

        
        <div className="text-xs text-violet-600 font-semibold mb-4 bg-violet-50/50 p-2.5 rounded-xl border border-violet-100/50">
          <div>Date Focus: <span className="font-extrabold">{dateNoticeHeading}</span></div>
          <div>Selected Time: <span className="font-black text-violet-700 bg-violet-100 px-1.5 py-0.5 rounded-md ml-1">{startTime} - {endTime}</span></div>
          {shouldHideTimeDropdown ? (
            <div className="mt-1 text-slate-500 text-[11px] font-medium animate-in fade-in duration-150">
              • Time Slot: Automatically locked by {viewMode.toLowerCase()} drag grid
            </div>
          ) : (
            <div className="mt-1 text-slate-500 text-[11px] font-medium animate-in fade-in duration-150">
              • Custom Time: Adjust shift hours in the dropdown below anytime
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">




          {isEditing && (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                <select
                  value={typeof dragStart === "object" ? dragStart.day : dragStart}
                  onChange={(e) => setDragStart(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs bg-white font-bold text-slate-800 outline-none cursor-pointer"
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>June {d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                <select
                  value={typeof dragEnd === "object" ? dragEnd.day : dragEnd}
                  onChange={(e) => setDragEnd(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs bg-white font-bold text-slate-800 outline-none cursor-pointer"
                >
                  {Array.from({ length: 30 }, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>June {d}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Child Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Child Name</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-hidden bg-white cursor-pointer"
              required
            >
              <option value="">Select Child</option>
              {childrenList.map((c, idx) => (
                <option key={idx} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Staff Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Staff / Therapist</label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-hidden bg-white cursor-pointer"
              required
            >
              <option value="">Select Staff</option>
              {employees.map((emp, idx) => (
                <option key={idx} value={emp}>{emp}</option>
              ))}
            </select>
          </div>

         
          {!shouldHideTimeDropdown && (
            <div className="grid lg:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-150">
              <div className="flex flex-col gap-1">
                <label className="block text-xs font-semibold text-slate-700">Start Time</label>
                <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                  
                  <select
                    value={startHour}
                    onChange={(e) => setStartHour(e.target.value)}
                    className="flex-1 bg-white rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold text-slate-800 outline-hidden cursor-pointer"
                  >
                    {hourOptions.map((h, i) => <option key={i} value={h}>{h}</option>)}
                  </select>
                  
                  <div className="flex bg-slate-200 rounded-lg p-0.5 shrink-0 select-none">
                    <button type="button" onClick={() => setStartPeriod("AM")} className={`px-2 py-0.5 text-[10px] font-black rounded-md transition-all ${startPeriod === "AM" ? "bg-white text-violet-600 shadow-xs" : "text-slate-500"}`}>AM</button>
                    <button type="button" onClick={() => setStartPeriod("PM")} className={`px-2 py-0.5 text-[10px] font-black rounded-md transition-all ${startPeriod === "PM" ? "bg-white text-violet-600 shadow-xs" : "text-slate-500"}`}>PM</button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="block text-xs font-semibold text-slate-700">End Time</label>
                <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                  
                  <select
                    value={endHour}
                    onChange={(e) => setEndHour(e.target.value)}
                    className="flex-1 bg-white rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold text-slate-800 outline-hidden cursor-pointer"
                  >
                    {hourOptions.map((h, i) => <option key={i} value={h}>{h}</option>)}
                  </select>
                 
                  <div className="flex bg-slate-200 rounded-lg p-0.5 shrink-0 select-none">
                    <button type="button" onClick={() => setEndPeriod("AM")} className={`px-2 py-0.5 text-[10px] font-black rounded-md transition-all ${endPeriod === "AM" ? "bg-white text-violet-600 shadow-xs" : "text-slate-500"}`}>AM</button>
                    <button type="button" onClick={() => setEndPeriod("PM")} className={`px-2 py-0.5 text-[10px] font-black rounded-md transition-all ${endPeriod === "PM" ? "bg-white text-violet-600 shadow-xs" : "text-slate-500"}`}>PM</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-98 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 shadow-xs active:scale-98 transition-all"
            >
              {isEditing ? "Save Changes" : "Confirm Duty"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
