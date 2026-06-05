export default function HoverPlusButton({ customClass = "" }) {
  return (
    /* 👑 ম্যাজিক ফিক্স: group-hover এবং opacity-0 সম্পূর্ণ রিমুভ করা হয়েছে। 
       ফলে বাটনটি এখন হোভার ছাড়া সবসময় নরমালি স্ক্রিনে শো করবে এবং ড্র্যাগিংয়ে কোনো বাধা দেবে না */
    <div 
      className={`absolute bottom-2 right-2 hidden sm:flex items-center justify-center h-7 w-7 rounded-lg border border-slate-200 bg-white shadow-xs text-slate-500 font-bold text-xl select-none pointer-events-none opacity-100 scale-100 transition-all duration-150 ease-out z-45 ${customClass}`}
    >
      +
    </div>
  );
}
