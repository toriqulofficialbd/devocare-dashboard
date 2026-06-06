

export default function ModalDateDropdowns({ modalStartDay, setModalStartDay, setDragStart, modalEndDay, setModalEndDay, setDragEnd, dynamicDateOptions }) {
  return (
    <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-200">
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
        <select 
          value={modalStartDay} 
          onChange={(e) => {
            const val = Number(e.target.value);
            setModalStartDay(val);
            setDragStart(val); 
          }} 
          className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs bg-white font-bold text-slate-800 outline-none cursor-pointer"
        >
          {dynamicDateOptions.map((opt, i) => (
            <option key={i} value={opt.day}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
        <select 
          value={modalEndDay} 
          onChange={(e) => {
            const val = Number(e.target.value);
            setModalEndDay(val);
            setDragEnd(val); 
          }} 
          className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs bg-white font-bold text-slate-800 outline-none cursor-pointer"
        >
          {dynamicDateOptions.map((opt, i) => (
            <option key={i} value={opt.day}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
