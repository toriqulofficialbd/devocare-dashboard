

export default function MailNavigationItem({ icon: Icon, label, count, isSelected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.98] ${
        isSelected 
          ? "bg-slate-900 text-white shadow-md shadow-slate-900/10" 
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Icon 
          size={16} 
          className={`shrink-0 transition-colors ${isSelected ? "text-white" : "text-slate-400"}`} 
        />
        <span className="truncate">{label}</span>
      </div>

      {count > 0 && (
        <span 
          className={`text-xs px-2 py-0.5 font-bold rounded-full border transition-all shrink-0 ml-2 ${
            isSelected 
              ? "bg-slate-800 text-white border-slate-700" 
              : "bg-slate-50 text-slate-600 border-[#EAECF0]"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
