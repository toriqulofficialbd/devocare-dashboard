

export default function ModalDateNotice({ dateNoticeHeading, startTime, endTime }) {
  return (
    <div className="text-xs text-violet-600 font-semibold mb-4 bg-violet-50/50 p-2.5 rounded-xl border border-violet-100/50 flex flex-col gap-1 select-none">
      <div>Date Focus: <span className="font-extrabold text-violet-700">{dateNoticeHeading}</span></div>
      <div>Selected Time: <span className="font-black text-violet-700 bg-violet-100 px-1.5 py-0.5 rounded-md ml-1">{startTime} - {endTime}</span></div>
    </div>
  );
}
