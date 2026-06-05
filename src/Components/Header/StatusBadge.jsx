
import { ShieldCheck } from "lucide-react";

export default function StatusBadge() {
  return (
    <div className="lg:hidden inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl text-emerald-700 select-none">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
      </span>
      <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
        <ShieldCheck size={11} /> Live Node
      </span>
    </div>
  );
}
