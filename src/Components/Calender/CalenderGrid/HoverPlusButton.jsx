export default function HoverPlusButton() {
  return (
    /* 👑 ম্যাজিক ফিক্স: absolute এবং relative এর কনফ্লিক্ট দূর করা হলো। 
       প্যারেন্ট ডাইভটি এখন absolute inset-0 হিসেবে পুরো ক্যালেন্ডার সেলের ক্ষোপটি কভার করবে */
    <div className="absolute inset-0 h-full w-full group cursor-cell pointer-events-auto">

      {/* 🎯 প্লাস বাটন: সাইজ h-7 w-7 এবং টেক্সট-xl দিয়ে আপনার রিকোয়েস্ট অনুযায়ী বড় ও ট্রেন্ডি করা হয়েছে */}
     <div className="absolute bottom-2 right-2 hidden sm:flex items-center justify-center h-7 w-7 rounded-lg border border-slate-200 bg-white shadow-xs text-slate-500 font-bold text-xl select-none pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-violet-50/70 group-hover:text-violet-600 group-hover:border-violet-300 transition-all duration-150 ease-out z-45">
            +
          </div>

    </div>
  );
}
