import { useState } from "react";
import { ChevronDown, Check,  Shield } from "lucide-react";

export default function AccountSelector({ activeAccount = "Amina Rahman" }) {
  const [isOpen, setIsOpen] = useState(false);
  const accounts = ["Amina Rahman", "Karim Rahman (Therapist)", "DevoCare Primary"];

  return (
    <div className="px-2 py-1.5 mb-2 relative">
      {/* Clickable Header Box Block */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-between w-full bg-white border rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 cursor-pointer transition-all ${
          isOpen ? "border-slate-400 ring-4 ring-slate-100" : "border-[#EAECF0]"
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          <div className="h-5 w-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
            {activeAccount.charAt(0)}
          </div>
          <span className="truncate">{activeAccount}</span>
        </div>
        <ChevronDown size={14} className={`text-slate-400 shrink-0 ml-1.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* 👑 Trendy Drop-down Menu Popover Layer */}
      {isOpen && (
        <>
          {/* Transparent click-away overlay track */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute left-2 right-2 top-12 mt-1 bg-white border border-[#EAECF0] rounded-xl shadow-xl z-50 p-1 space-y-0.5 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Account</div>
            
            {accounts.map((acc, idx) => (
              <button
                key={idx}
                onClick={() => setIsOpen(false)}
                className={`w-full text-left px-2.5 py-2 text-xs font-semibold rounded-lg flex items-center justify-between transition-colors ${
                  acc.includes(activeAccount) ? "bg-slate-50 text-slate-900" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Shield size={12} className="text-slate-400" />
                  <span className="truncate">{acc}</span>
                </div>
                {acc.includes(activeAccount) && <Check size={12} className="text-emerald-600 shrink-0" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
