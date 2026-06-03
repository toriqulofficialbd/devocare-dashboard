
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useApp } from "../../Context/AppContext"; // গ্লোবাল অ্যাপ কন্টেক্সট

export default function GlobalSearch() {
  const { globalSearch, setGlobalSearch } = useApp();
  const location = useLocation();

  const getSearchPlaceholder = () => {
    if (location.pathname === "/gmail") return "Search inbox (sender, subject)...";
    if (location.pathname === "/settings") return "Search preferences...";
    return "Search schedule (child, staff)...";
  };

  return (
    <div className="relative hidden md:block w-48 lg:w-64 select-none">
      <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
      <input
        type="text"
        value={globalSearch || ""} // 👈 নিশ্চিত করা হলো যাতে কখনই undefined না হয়
        onChange={(e) => {
          // 👑 রিয়াল-টাইম ডাইনামিক ইভেন্ট বাবলিং ট্র্যাকার
          setGlobalSearch(e.target.value);
        }}
        placeholder={getSearchPlaceholder()}
        className="w-full bg-[#F9FAFB] rounded-lg border border-[#D0D5DD] pl-9 pr-4 py-1.5 text-xs text-[#101828] focus:border-violet-500 focus:outline-hidden focus:ring-4 focus:ring-violet-500/10 transition-all"
      />
    </div>
  );
}
