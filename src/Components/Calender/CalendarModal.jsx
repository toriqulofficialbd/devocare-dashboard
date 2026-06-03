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
  employees = []     
}) {
  
  // Local state slots for precise trendy clock selections
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("10:00 AM");

  if (!isModalOpen || !dragStart || !dragEnd) return null;

  // Time options array for clean dropdown select interface
  const timeSlots = [
    "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the calculated range string back to the handler function
    const calculatedTimeRange = `${startTime} - ${endTime}`;
    handleCreateEvent(e, calculatedTimeRange);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={closeModal} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 z-10 relative"
      >
        <h3 className="text-base font-bold text-slate-900 mb-1">New Care Schedule</h3>
        <p className="text-xs text-violet-600 font-semibold mb-4">
          Date Range: June {Math.min(dragStart, dragEnd)} to June {Math.max(dragStart, dragEnd)}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Child Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Child Name</label>
            <select 
              value={selectedChild} 
              onChange={(e) => setSelectedChild(e.target.value)} 
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-hidden" 
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
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-hidden" 
              required
            >
              <option value="">Select Staff</option>
              {employees.map((emp, idx) => (
                <option key={idx} value={emp}>{emp}</option>
              ))}
            </select>
          </div>

          {/* ⏰ New Feature: Split Time Allocation Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Start Time</label>
              <select 
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-hidden bg-white"
              >
                {timeSlots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">End Time</label>
              <select 
                value={endTime} 
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-hidden bg-white"
              >
                {timeSlots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)}
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button" 
              onClick={closeModal} 
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 shadow-xs"
            >
              Confirm Duty
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
