export default function HoverPlusTimeline({ hoursTimeline = [] }) {
  return (
    /* পুরো ২৪ ঘণ্টার ব্যাকগ্রাউন্ড গ্রিড লেয়ার কন্টেইনার */
    <div className="absolute inset-0 flex flex-col pointer-events-none z-0 divide-y divide-[#D0D5DD]/40">
      {hoursTimeline.map((_, idx) => (
        // প্রতিটা রো নিজে থেকেই এখন 'group' এবং 'pointer-events-auto' হোভার কন্টেইনার
        <div key={idx} className="h-24 w-full relative pointer-events-auto group">
          
          {/* ৩০ মিনিটের মাথায় হাল্কা থিম ড্যাশড বর্ডার লাইন */}
          <div className="absolute top-1/2 left-0 right-0 h-px border-b border-dashed border-[#EAECF0]" />
          
          {/* 🎯 আপনার অরিজিনাল প্রিমিয়াম বেগুনি গ্লো হোভার প্লাস বাটন উইজেট (রিকোয়েস্ট অনুযায়ী সাইজ ও টেক্সট বড় করা হয়েছে) */}
          <div className="absolute bottom-2 right-2 hidden sm:flex items-center justify-center h-7 w-7 rounded-lg border border-slate-200 bg-white shadow-xs text-slate-500 font-bold text-xl select-none pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-violet-50/70 group-hover:text-violet-600 group-hover:border-violet-300 transition-all duration-150 ease-out z-45">
            +
          </div>

        </div>
      ))}
    </div>
  );
}
