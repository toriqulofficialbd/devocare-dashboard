import  { useState } from "react";
import { Globe, Check } from "lucide-react";

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");

  const languages = [
    { code: "EN", label: "English (US)" },
    { code: "BN", label: "বাংলা (BD)" }
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
          isOpen ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
        }`} 
        title="Toggle Language"
      >
        <Globe className="h-4.5 w-4.5" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-10 w-40 bg-white border border-[#EAECF0] rounded-xl shadow-xl z-50 p-1 space-y-0.5 animate-in fade-in slide-in-from-top-2 duration-150">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setCurrentLang(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg flex items-center justify-between transition-colors ${
                  currentLang === lang.code ? "bg-violet-50 text-violet-700" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{lang.label}</span>
                {currentLang === lang.code && <Check size={12} className="text-violet-700 shrink-0" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
