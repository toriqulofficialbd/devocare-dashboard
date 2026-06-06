import { Search } from "lucide-react";

export default function EmailList({ emails = [], selectedEmailId, onSelectEmail, searchTerm, setSearchTerm, filterType, setFilterType }) {
  return (
    <div className="h-full bg-white flex flex-col overflow-hidden border-x border-[#EAECF0]">
      <div className="p-4 border-b border-[#EAECF0] flex items-center justify-between shrink-0">
        <h2 className="text-xl font-bold text-slate-900">Inbox</h2>
        
        
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
          <button 
            onClick={() => setFilterType("all")}
            className={`px-3 py-1 rounded-lg transition-all ${filterType === "all" ? "bg-white text-slate-900 shadow-xs" : "hover:text-slate-900"}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilterType("unread")}
            className={`px-3 py-1 rounded-lg transition-all ${filterType === "unread" ? "bg-white text-slate-900 shadow-xs" : "hover:text-slate-900"}`}
          >
            Unread
          </button>
        </div>
      </div>

      <div className="p-3 border-b border-[#EAECF0] shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F9FAFB] rounded-xl border border-[#D0D5DD] pl-9 pr-4 py-2 text-sm focus:outline-hidden focus:border-violet-500 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-[#EAECF0] p-2 space-y-1 bg-[#F9FAFB]/50">
        {emails.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400 font-medium">No messages found</div>
        ) : (
          emails.map((email) => {
            const isSelected = selectedEmailId === email.id;
            return (
              <div
                key={email.id}
                onClick={() => onSelectEmail(email)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left relative ${
                  isSelected 
                    ? "bg-white border-violet-500 shadow-md ring-1 ring-violet-500" 
                    : "bg-white border-[#EAECF0] hover:border-slate-300 shadow-xs"
                }`}
              >
               
                {email.unread && !isSelected && (
                  <span className="absolute top-4 right-4 h-2 w-2 bg-blue-600 rounded-full" />
                )}
                
                <div className="flex justify-between items-center mb-1 pr-4">
                  <span className={`text-sm truncate block ${email.unread ? "text-slate-900 font-bold" : "text-slate-700"}`}>{email.sender}</span>
                  <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">{email.time.split(",")[0]}</span>
                </div>
                <div className={`text-xs mb-1 truncate ${email.unread ? "text-slate-900 font-bold" : "text-slate-600"}`}>{email.subject}</div>
                <div className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{email.snippet}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
