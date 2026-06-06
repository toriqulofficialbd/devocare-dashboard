export default function HoverPlusButton({ customClass = "" }) {
  return (
    
    <div 
      className={`absolute bottom-2 right-2 hidden sm:flex items-center justify-center h-7 w-7 rounded-lg border border-slate-200 bg-white shadow-xs text-slate-500 font-bold text-xl select-none pointer-events-none opacity-100 scale-100 transition-all duration-150 ease-out z-45 ${customClass}`}
    >
      +
    </div>
  );
}
