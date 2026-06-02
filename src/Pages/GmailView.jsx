import React from "react";
import { Search, Star, Trash2, Paperclip } from "lucide-react";

export default function GmailView() {
  const emails = [
    { id: 1, sender: "Untitled UI", subject: "🚀 New Calendar components released!", snippet: "Check out our latest update with smooth drag-and-drop feature and optimized Tailwind templates...", time: "9:04 PM", unread: true },
    { id: 2, sender: "Figma Community", subject: "Your design file was approved", snippet: "Congratulations! Your premium dashboard UI kit is now live in the Figma global marketplace...", time: "7:15 PM", unread: false },
    { id: 3, sender: "Vercel Team", subject: "[Deployment Successful] production branch", snippet: "Your project untitiled-dashboard has been successfully deployed to edge servers worldwide...", time: "4:30 PM", unread: false },
  ];

  return (
    <div className="bg-white border border-[#EAECF0] rounded-xl overflow-hidden shadow-sm flex flex-col h-[calc(100vh-12rem)]">
      {/* Inbox Actions Search Header */}
      <div className="p-4 border-b border-[#EAECF0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/50">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search all emails..." 
            className="w-full bg-white rounded-lg border border-slate-300 pl-10 pr-4 py-2 text-sm focus:border-violet-500 focus:outline-hidden focus:ring-2 focus:ring-violet-100"
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>1-3 of 150</span>
        </div>
      </div>

      {/* Email List Grid */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#EAECF0]">
        {emails.map((email) => (
          <div 
            key={email.id} 
            className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2 hover:bg-slate-50/80 cursor-pointer transition-colors ${email.unread ? "bg-violet-50/20 font-medium" : ""}`}
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <button className="text-slate-400 hover:text-amber-400 pt-0.5"><Star className="h-4 w-4" /></button>
              <div className="min-w-0 flex-1 sm:grid sm:grid-cols-4 sm:gap-4">
                <span className={`text-sm truncate block ${email.unread ? "text-slate-900 font-bold" : "text-slate-700"}`}>{email.sender}</span>
                <div className="sm:col-span-3 min-w-0">
                  <span className="text-sm text-slate-900 block truncate">{email.subject}</span>
                  <span className="text-xs text-slate-500 block truncate">{email.snippet}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-4 pl-7 sm:pl-0">
              <div className="flex items-center gap-1.5 text-slate-400 opacity-0 group-hover:opacity-100 sm:opacity-100">
                <Paperclip className="h-3.5 w-3.5" />
                <button className="hover:text-red-500 p-1 rounded-sm"><Trash2 className="h-4 w-4" /></button>
              </div>
              <span className="text-xs text-slate-400 whitespace-nowrap">{email.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
