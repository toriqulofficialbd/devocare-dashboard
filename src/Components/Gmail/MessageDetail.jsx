import  { useState, useRef } from "react";
import { Trash2, Archive, CornerUpLeft, MoreVertical, Send, CheckSquare } from "lucide-react";

export default function MessageDetail({ email, onDelete, onArchive, onMarkUnread }) {
  const [replyText, setReplyText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // ৩-ডট মেনু স্টেট
  const textareaRef = useRef(null); // রিপ্লাই বক্স ফোকাস করার জন্য রেফারেন্স

  if (!email) {
    return (
      <div className="h-full flex items-center justify-center bg-white text-slate-400 text-sm font-medium">
        Select an email to view full content
      </div>
    );
  }

  
  const handleReplyButtonClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    alert(`Reply sent successfully to ${email.sender}!`);
    setReplyText("");
  };

  return (
    <div className="h-full bg-white flex flex-col overflow-hidden relative">
     
      <div className="h-14 border-b border-[#EAECF0] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-slate-500">
          <button onClick={() => onArchive(email.id)} className="p-2 hover:bg-slate-50 rounded-lg transition-colors" title="Archive email"><Archive size={16} /></button>
          <button onClick={() => onDelete(email.id)} className="p-2 hover:bg-slate-50 rounded-lg transition-colors hover:text-red-500" title="Delete email"><Trash2 size={16} /></button>
        </div>
        
        <div className="flex items-center gap-2 text-slate-500 relative">
          
          <button onClick={handleReplyButtonClick} className="p-2 hover:bg-slate-50 rounded-lg transition-colors" title="Reply to message"><CornerUpLeft size={16} /></button>
          
         
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="p-2 hover:bg-slate-50 rounded-lg transition-colors" title="More options"><MoreVertical size={16} /></button>
          
          
          {isDropdownOpen && (
            <div className="absolute right-0 top-10 w-44 bg-white border border-[#EAECF0] rounded-xl shadow-xl z-50 p-1 py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
              <button 
                onClick={() => {
                  onMarkUnread(email.id);
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2 transition-colors"
              >
                <CheckSquare size={14} className="text-slate-400" />
                Mark as unread
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6" onClick={() => setIsDropdownOpen(false)}>
        <div className="flex justify-between items-start border-b border-[#F2F4F7] pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-sm">
              {email.sender.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{email.sender}</h3>
              <p className="text-xs text-slate-500 mt-0.5">To: user@example.com</p>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-medium">{email.time}</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-base font-bold text-slate-900 leading-snug">{email.subject}</h1>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{email.snippet}</p>
        </div>
      </div>

      <div className="p-4 border-t border-[#EAECF0] bg-white shrink-0">
        <form onSubmit={handleSendReply} className="border border-[#EAECF0] rounded-xl overflow-hidden focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/10 transition-all bg-[#F9FAFB]">
          <textarea
            ref={textareaRef} 
            rows={3}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={`Reply to ${email.sender}...`}
            className="w-full bg-transparent px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden resize-none"
          />
          <div className="px-3 py-2 bg-white border-t border-[#EAECF0] flex justify-end">
            <button type="submit" className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs">
              <Send size={12} /> Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
