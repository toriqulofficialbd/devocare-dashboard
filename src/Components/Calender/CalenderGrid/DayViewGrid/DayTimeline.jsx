import { useEffect, useState, useRef } from "react";
import { Clock, Calendar } from "lucide-react";
import HoverPlusTimeline from "../HoverPlusTimeline";

export default function DayTimeline({ 
  currentDate, currentMonth, currentYear, activeDayEvents, 
  handleMouseDown, handleMouseUp, setWeekDragHours, handleEventDragStart, handleEventClick,
  handleEventDrop // 👑 ফিক্স: প্যারেন্ট থেকে আসা মেইন ড্রপ রিশেডিউলার হুকটি এখানে রিসিভ করা হলো
}) {
  const [now, setNow] = useState(new Date());
  
  // লাইভ ড্র্যাগ এবং পিক্সেল পজিশন ট্র্যাকিং রেফারেন্স স্টেট
  const [isDraggingHour, setIsDraggingHour] = useState(false);
  const [startHourDrag, setStartHourDrag] = useState(9);
  const [currentLiveHour, setCurrentLiveHour] = useState(10);
  const gridRef = useRef(null);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const hoursTimeline = Array.from({ length: 24 }, (_, i) => {
    if (i === 0) return "12 AM";
    if (i === 12) return "12 PM";
    return i > 12 ? `${i - 12} PM` : `${i} AM`;
  });

  // পিক্সেল-পারফেক্ট ক্যালকুলেটর: মাউস চেপে টানার সময় কারেন্ট স্ক্রল অফসেট অনুযায়ী ঘণ্টার স্লট বের করার লজিক
  const calculateHourFromY = (e) => {
    if (!gridRef.current) return 9;
    const rect = gridRef.current.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const exactHour = Math.floor(relativeY / 96); // প্রতি ১ ঘণ্টা = ৯৬ পিক্সেল উচ্চতা রেশিও
    return Math.max(0, Math.min(23, exactHour));
  };

  const handleGridMouseDown = (e) => {
    if (e.button !== 0) return; 
    const clickedHour = calculateHourFromY(e);
    setIsDraggingHour(true);
    setStartHourDrag(clickedHour);
    setCurrentLiveHour(clickedHour);
    
    if (setWeekDragHours) {
      setWeekDragHours({ start: clickedHour, end: clickedHour + 1 });
    }
    
    // মেইন প্যারেন্টে তারিখ, মাস এবং বছরের পিউর মেমোরি অবজেক্ট পুশ
    handleMouseDown({
      day: currentDate.getDate(),
      month: currentDate.getMonth(),
      year: currentDate.getFullYear()
    });
  };

  const handleGridMouseMove = (e) => {
    if (!isDraggingHour) return;
    const currentHourDrag = calculateHourFromY(e);
    setCurrentLiveHour(currentHourDrag);
    if (setWeekDragHours) {
      setWeekDragHours({
        start: Math.min(startHourDrag, currentHourDrag),
        end: Math.max(startHourDrag, currentHourDrag) + 1
      });
    }
  };

  const handleGridMouseUp = () => {
    if (isDraggingHour) {
      setIsDraggingHour(false);
      if (handleMouseUp) handleMouseUp(); // মডাল ওপেন ট্রিগার করবে
    }
  };

  // প্রতি ১ ঘণ্টা = ৯৬ পিক্সেল ধরে লাইভ রেখার অফসেট পজিশন
  const topPositionOffset = (now.getHours() * 96) + (now.getMinutes() * (96 / 60));
  const dragTop = Math.min(startHourDrag, currentLiveHour) * 96;
  const dragHeight = (Math.abs(currentLiveHour - startHourDrag) + 1) * 96;

   const formatHourString = (h) => {
    if (h === 0 || h === 24) return "12 AM";
    if (h === 12) return "12 PM";
    return h > 12 ? `${h - 12} PM` : `${h} AM`;
  };
  const liveDragTimeText = `${formatHourString(Math.min(startHourDrag, currentLiveHour))} - ${formatHourString(Math.max(startHourDrag, currentLiveHour) + 1)}`;



   return (
    // 👑 ফিক্স: পুরো কন্টেইনারে মাউস আপ বাইন্ডিং যুক্ত করা হলো যাতে ফর্ম মডাল পপ-আপ হতে পারে
    <div className="border border-[#D0D5DD] rounded-2xl overflow-hidden flex flex-col h-[550px] bg-white" onMouseUp={handleGridMouseUp}>
      
      {/* টপ ফিক্সড ইনফো বার */}
      <div className="p-3.5 border-b border-[#D0D5DD] bg-white text-xs font-bold text-slate-800 flex items-center gap-2 select-none shrink-0">
        <Calendar size={14} className="text-violet-500" />
        Timeline: {currentDate.getDate()} {monthNames[currentMonth]}, {currentYear}
      </div>

      {/* স্ক্রলযোগ্য ২৪ ঘণ্টার টাইম ক্যানভাস */}
      <div className="flex-1 overflow-y-auto grid grid-cols-[65px_1fr] bg-white relative">
        {/* বামপাশের ফিক্সড টাইম লেবেল */}
        <div className="border-r border-[#D0D5DD] bg-[#F9FAFB]/60 text-right pr-2 select-none z-10 relative">
          {hoursTimeline.map((hour, idx) => (
            <div key={idx} className="h-24 text-[10px] font-bold text-[#475467] pt-1.5 whitespace-nowrap tracking-tight">{hour}</div>
          ))}
          <div style={{ top: `${topPositionOffset - 10}px` }} className="absolute right-1 text-[8px] font-black text-violet-600 bg-white px-0.5 rounded-sm shadow-xs border border-violet-100 z-30">
            {now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
          </div>
        </div>

        {/* 👑 👑 ডানপাশের ইভেন্ট গ্রিড কন্টেইনার: মাউস মুভমেন্ট এবং ড্র্যাগ ইভেন্ট লিসেনারগুলো সরাসরি এই গ্রিড বডিতে বাইন্ড করা হলো */}
        <div 
          ref={gridRef}
          onMouseDown={handleGridMouseDown}
          onMouseMove={handleGridMouseMove}
          className="relative bg-[#F9FAFB]/10 h-[2304px] cursor-cell"
        >
          {/* গ্লোবাল লাইভ টাইম পার্পল ইন্ডিকেটর লাইন */}
          <div style={{ top: `${topPositionOffset}px` }} className="absolute left-0 right-0 h-px bg-violet-500 z-25 pointer-events-none flex items-center">
            <div className="h-2 w-2 rounded-full bg-violet-600 -ml-1 ring-4 ring-violet-500/20" />
          </div>

          {/* 👑 নতুন ভিজ্যুয়াল ফিচার: ড্র্যাগ করার সময় লাইভ পার্পল ওভারলে সিলেকশন শ্যাডো লেয়ার অন */}
          {isDraggingHour && (
  <div 
    style={{ top: `${dragTop}px`, height: `${dragHeight}px` }}
    className="absolute left-0 right-0 bg-violet-500/10 border-y border-dashed border-violet-400 z-20 pointer-events-none flex items-center justify-center"
  >
    {/* 🎯 ভেরিয়েবলটি এখানে সুন্দরভাবে লাইভ টাইম টেক্সট রেন্ডার করবে */}
    <span className="bg-violet-600 text-white font-black text-[9px] px-2 py-0.5 rounded-md shadow-md shadow-violet-600/20 tracking-tight animate-in zoom-in-95 duration-100">
      {liveDragTimeText}
    </span>
  </div>
)}

          {/* 👑 👑 ফিক্স: ব্যাকগ্রাউন্ডের আওয়ার রো গ্রিডগুলোকে মাউস ড্রপ সিগন্যাল রিসিভ করার জন্য 'pointer-events-auto' নোডে আনলক করা হলো */}
          <div className="absolute inset-0 flex flex-col pointer-events-none z-0 divide-y divide-[#D0D5DD]">
            {hoursTimeline.map((_, idx) => (
              <div 
                key={idx} 
                className="h-24 w-full relative pointer-events-auto" // 👈 এটি আপনার টানা কার্ডের ড্রপ সিগন্যাল রিড করবে [▲]
                onDragOver={(e) => e.preventDefault()} // 👈 কার্ড পেজের মাথায় ড্র্যাগ হোল্ড ধরে রাখবে [▲]
                onDrop={() => {
                  if (handleEventDrop) handleEventDrop(currentDate, idx); // 👈 মাউস ছেড়ে দিলে ওই নতুন সময়ের ঘরে কার্ড রিস্টোর করবে [▲]
                }}
              >
                {/* ৩০ মিনিটের মাথায় হাল্কা থিম ড্যাশড বর্ডার */}
                <div className="absolute top-1/2 left-0 right-0 h-px border-b border-dashed border-[#EAECF0]" />
              </div>
            ))}
          </div>

          {/* 👑 WeekViewBody.jsx এবং DayTimeline.jsx ফাইলে পুরোনো লুপ মুছে জাস্ট এই ১টি লাইন বসিয়ে দিন: */}

<HoverPlusTimeline hoursTimeline={hoursTimeline} />

          <div className="absolute inset-0 z-10 p-1 pointer-events-none">
            {activeDayEvents.map((event) => {
              const startHourVal = event.startHour !== undefined ? event.startHour : 9;
              const durationVal = event.durationHours !== undefined ? event.durationHours : 1;
              
              const computedTop = startHourVal * 96; 
              const computedHeight = durationVal * 96;

              return (
                <div 
                  key={event.id} 
                  // 👑 ফিক্স: ডুপ্লিকেট রিমুভ করে শুধুমাত্র ১টি নির্ভুল 'style' অবজেক্ট রাখা হলো
                  style={{ top: `${computedTop}px`, height: `${computedHeight}px` }}
                  draggable="true" 
                  onDragStart={() => handleEventDragStart(event.id)} 
                  onClick={() => handleEventClick(event)}
                  onMouseDown={(e) => e.stopPropagation()} 
                  // 👑 ফিক্স: ডুপ্লিকেট 'className' মুছে শুধুমাত্র ১টি ক্লিন রেসপনসিভ ক্লাস কন্টেইনার ফিক্সড করা হলো
                  className={`absolute inset-x-2 rounded-xl border p-2.5 shadow-xs transition-all flex flex-col justify-start overflow-hidden text-left z-30 cursor-pointer hover:brightness-95 pointer-events-auto ${event.color}`}
                >
                  <span className="truncate leading-none block font-black text-[10px] mb-1">{event.title}</span>
                  <span className="text-[8px] font-semibold opacity-90 block truncate flex items-center gap-0.5"><Clock size={9} /> {event.time}</span>
                </div>
              );
            })}
          </div>

        </div>

        
      </div>
    </div>
  );
}

