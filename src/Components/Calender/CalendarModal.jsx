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
  
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("10:00 AM");

  if (!isModalOpen || !dragStart || !dragEnd) return null;

  // বডি গ্রিডের ১২ AM থেকে ১১ PM পর্যন্ত পুরো ২৪ ঘণ্টার পরিচ্ছন্ন তালিকা
  const timeSlots = [
    "12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", 
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", 
    "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
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
    const calculatedTimeRange = shouldHideTimeDropdown ? "" : `${startTime} - ${endTime}`;
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

          {/* 👑 👑 ৩. আপনার কাঙ্ক্ষিত ম্যাজিক কন্ডিশনাল লেয়ার: 
              নতুন তৈরির সময় উইক/ডে ভিউ হলে এই গ্রিডটি সম্পূর্ণ হাইড (গায়েব) থাকবে। 
              কিন্তু মাসের ভিউতে অথবা যেকোনো পেজে কার্ড ক্লিক করে এডিট করতে গেলে টাইম ড্রপডাউন দুটি সুন্দরভাবে স্ক্রিনে দেখা যাবে! */}
          {!shouldHideTimeDropdown && (
            <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-150">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Start Time</label>
                <select 
                  value={startTime} 
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-hidden bg-white cursor-pointer"
                >
                  {timeSlots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">End Time</label>
                <select 
                  value={endTime} 
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-hidden bg-white cursor-pointer"
                >
                  {timeSlots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)}
                </select>
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
