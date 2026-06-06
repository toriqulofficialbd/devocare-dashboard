export default function HoverPlusTimeline({ hoursTimeline = [] }) {
  return (

    <div className="absolute inset-0 flex flex-col pointer-events-none  divide-y divide-[#D0D5DD]/40">
      {hoursTimeline.map((_, idx) => (

        <div key={idx} className="h-24 w-full relative select-none">

         
          <div className="absolute top-1/2 left-0 right-0 h-px border-b border-dashed border-[#EAECF0]" />

          
          <div className="absolute bottom-2 right-2 lg:hidden flex items-center justify-center h-7 w-7 rounded-lg border border-slate-200 bg-white shadow-xs text-slate-500 font-bold text-xl opacity-100 scale-100 transition-all duration-150 ease-out ">
            +
          </div>

        </div>
      ))}
    </div>
  );
}
