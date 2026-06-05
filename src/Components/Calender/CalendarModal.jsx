import { useState } from "react";
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
  isEditing = false
}) {

  const [startHour, setStartHour] = useState("09:00");
  const [startPeriod, setStartPeriod] = useState("AM");

  const [endHour, setEndHour] = useState("10:00");
  const [endPeriod, setEndPeriod] = useState("AM");

  if (!isModalOpen || !dragStart || !dragEnd) return null;

  // বডি গ্রিডের ১২ AM থেকে ১১ PM পর্যন্ত পুরো ২৪ ঘণ্টার পরিচ্ছন্ন তালিকা
  const hourOptions = [
    "12:00", "01:00", "02:00", "03:00", "04:00", "05:00",
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00"
  ];

  // 👑 ১. ট্রেন্ডি ট্র্যাকিং কন্ডিশন: উইক বা ডে ভিউ কি না চেক করা
  const isTimelineMode = viewMode === "Week view" || viewMode === "Day view";

  // 👑 ২. আপনার শর্ত: নতুন তৈরির সময় উইক/ডে ভিউ হলে সময় হাইড থাকবে, কিন্তু এডিট করার সময় শো করবে
  const shouldHideTimeDropdown = isTimelineMode && !isEditing;

  // তারিখের সংখ্যা ঠিকভাবে পার্স করা
  const minDay = Math.min(Number(dragStart), Number(dragEnd));
  const maxDay = Math.max(Number(dragStart), Number(dragEnd));
  const dateText = minDay === maxDay ? `June ${minDay}, 2026` : `June ${minDay} to June ${maxDay}, 2026`;

  const handleSubmit = (e) => {
    e.preventDefault();

    // যদি টাইমলাইন মোডে নতুন ক্রিয়েশন হয়, তবে বডি গ্রিডের অটো-লক হওয়া সময়টি যাবে, অন্যথায় ড্রপডাউনের সময় যাবে
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

        {/* ওপরে ডাইনামিক নোটিশ বার */}
        <div className="text-xs text-violet-600 font-semibold mb-4 bg-violet-50/50 p-2.5 rounded-xl border border-violet-100/50">
          <div>Date Focus: <span className="font-extrabold">{dateText}</span></div>
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

          {/*  
              নতুন তৈরির সময় উইক/ডে ভিউ হলে এই গ্রিডটি সম্পূর্ণ হাইড (গায়েব) থাকবে। 
              কিন্তু মাসের ভিউতে অথবা যেকোনো পেজে কার্ড ক্লিক করে এডিট করতে গেলে টাইম ড্রপডাউন দুটি সুন্দরভাবে স্ক্রিনে দেখা যাবে! */}
          {!shouldHideTimeDropdown && (
            <div className="grid lg:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-150">
             <div className="flex flex-col gap-1">
                <label className="block text-xs font-semibold text-slate-700">Start Time</label>
                <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                  {/* আওয়ার লিস্ট স্ক্রল হুইল নোড */}
                  <select 
                    value={startHour} 
                    onChange={(e) => setStartHour(e.target.value)}
                    className="flex-1 bg-white rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold text-slate-800 outline-hidden cursor-pointer"
                  >
                    {hourOptions.map((h, i) => <option key={i} value={h}>{h}</option>)}
                  </select>
                  {/* AM/PM কাস্টম ক্যাপসুল টগল বাটন নোড */}
                  <div className="flex bg-slate-200 rounded-lg p-0.5 shrink-0 select-none">
                    <button type="button" onClick={() => setStartPeriod("AM")} className={`px-2 py-0.5 text-[10px] font-black rounded-md transition-all ${startPeriod === "AM" ? "bg-white text-violet-600 shadow-xs" : "text-slate-500"}`}>AM</button>
                    <button type="button" onClick={() => setStartPeriod("PM")} className={`px-2 py-0.5 text-[10px] font-black rounded-md transition-all ${startPeriod === "PM" ? "bg-white text-violet-600 shadow-xs" : "text-slate-500"}`}>PM</button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="block text-xs font-semibold text-slate-700">End Time</label>
                <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                  {/* আওয়ার লিস্ট স্ক্রল হুইল নোড */}
                  <select
                    value={endHour}
                    onChange={(e) => setEndHour(e.target.value)}
                    className="flex-1 bg-white rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold text-slate-800 outline-hidden cursor-pointer"
                  >
                    {hourOptions.map((h, i) => <option key={i} value={h}>{h}</option>)}
                  </select>
                  {/* AM/PM কাস্টম ক্যাপসুল টগল বাটন নোড */}
                  <div className="flex bg-slate-200 rounded-lg p-0.5 shrink-0 select-none">
                    <button type="button" onClick={() => setEndPeriod("AM")} className={`px-2 py-0.5 text-[10px] font-black rounded-md transition-all ${endPeriod === "AM" ? "bg-white text-violet-600 shadow-xs" : "text-slate-500"}`}>AM</button>
                    <button type="button" onClick={() => setEndPeriod("PM")} className={`px-2 py-0.5 text-[10px] font-black rounded-md transition-all ${endPeriod === "PM" ? "bg-white text-violet-600 shadow-xs" : "text-slate-500"}`}>PM</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
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
