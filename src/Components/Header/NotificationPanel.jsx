import  { useState } from "react";
import { Bell, Clock, Calendar, MessageSquare } from "lucide-react";

export default function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const notifications = [
    { id: 1, icon: Calendar, text: "New therapy session assigned to Sami", time: "5 mins ago", unread: true },
    { id: 2, icon: MessageSquare, text: "William Smith sent a direct message", time: "1 hour ago", unread: false }
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          setHasUnread(false);
        }}
        className={`p-2 rounded-lg transition-colors relative flex items-center justify-center ${
          isOpen ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
        }`}
      >
        <Bell className="h-4.5 w-4.5" />
        {hasUnread && (
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
        )}
      </button>

      {isOpen && (
        <>
         
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          
          <div className="absolute -right-12 sm:right-0 top-10 w-[calc(100vw-2rem)] sm:w-72 bg-white border border-[#EAECF0] rounded-xl shadow-2xl z-[100] p-1 divide-y divide-[#EAECF0] animate-in fade-in slide-in-from-top-2 duration-150">
            
           
            <div className="px-3 py-2 text-xs font-bold text-slate-800">
              Notifications
            </div>
            
          
            <div className="py-1 space-y-0.5 max-h-[280px] overflow-y-auto">
              {notifications.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-3 rounded-lg flex gap-3 text-left transition-colors cursor-pointer hover:bg-slate-50 ${
                    item.unread ? "bg-slate-50/50" : ""
                  }`}
                >
                  <item.icon size={14} className="text-violet-500 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 font-medium leading-relaxed break-words">
                      {item.text}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      <Clock size={10} />
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </>
      )}
    </div>
  );
}
