import { useState, useRef, useEffect } from "react";
import { X, ArrowLeft, Menu } from "lucide-react";
import EmailList from "../Components/Gmail/EmailList";
import MessageDetail from "../Components/Gmail/MessageDetail";
import MailNavigation from "../Components/Gmail/MailNavigation/MailNavigation";
import { useOutletContext } from "react-router-dom";

export default function GmailView() {
  const globalSearch = useOutletContext();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [navWidth, setNavWidth] = useState(230);
  const [listWidth, setListWidth] = useState(360);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const [gmailSearchTerm, setGmailSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); 
     
  
  
  const [activeFolder, setActiveFolder] = useState("Inbox");


   const [emails, setEmails] = useState([
    { id: 1, sender: "William Smith", subject: "Meeting Tomorrow", snippet: "Hi, let's have a meeting tomorrow to discuss the project...", time: "Oct 22, 2023, 9:00:00 AM", unread: true, archived: false, folder: "Inbox", deleted: false },
    { id: 2, sender: "Alice Smith", subject: "Re: Project Update", snippet: "Thank you for the project update. It looks great!...", time: "Oct 22, 2023, 10:15:30 AM", unread: false, archived: false, folder: "Inbox", deleted: false },
    { id: 3, sender: "Bob Johnson", subject: "Weekend Plans", snippet: "Any plans for the weekend? I was thinking of going hiking...", time: "Oct 21, 2023, 4:30:12 PM", unread: true, archived: false, folder: "Inbox", deleted: false },
    { id: 4, sender: "Figma Community", subject: "Draft: Design System Kit", snippet: "This is a saved draft for the upcoming project document...", time: "Yesterday", unread: false, archived: false, folder: "Drafts", deleted: false },
    { id: 5, sender: "Spam Bot", subject: "Win Safe Lottery!", snippet: "Congratulations! You have been randomly selected...", time: "2 Days Ago", unread: true, archived: false, folder: "Junk", deleted: false }
  ]);


  const [selectedEmail, setSelectedEmail] = useState(emails[0]);

    const handleDeleteEmail = (id) => {
    const updatedEmails = emails.map((email) => 
      email.id === id ? { ...email, deleted: true, folder: "Trash" } : email
    );
    setEmails(updatedEmails);
    const remainingEmails = updatedEmails.filter(e => e.folder === activeFolder);
    setSelectedEmail(remainingEmails.length > 0 ? remainingEmails[0] : null);
    setIsMobileDetailOpen(false);
  };

  const handleArchiveEmail = (id) => {
    const updatedEmails = emails.map((email) => 
      email.id === id ? { ...email, archived: true, folder: "Archive" } : email
    );
    setEmails(updatedEmails);
    const remainingEmails = updatedEmails.filter(e => e.folder === activeFolder);
    setSelectedEmail(remainingEmails.length > 0 ? remainingEmails[0] : null);
    setIsMobileDetailOpen(false);
  };


 
  const handleMarkAsUnread = (id) => {
    const updatedEmails = emails.map((email) => 
      email.id === id ? { ...email, unread: true } : email
    );
    setEmails(updatedEmails);
   
    const current = updatedEmails.find(e => e.id === id);
    setSelectedEmail(current);
  };

   
  const filteredEmails = emails.filter((email) => {
   
    if (email.folder !== activeFolder) return false; 
    
   
    if (!globalSearch || !globalSearch.trim()) {
      return filterType === "unread" ? email.unread : true;
    }

   
    const searchLower = globalSearch.toLowerCase();
    
   
    const matchesSearch = 
      (email.sender && email.sender.toLowerCase().includes(searchLower)) ||
      (email.subject && email.subject.toLowerCase().includes(searchLower)) ||
      (email.snippet && email.snippet.toLowerCase().includes(searchLower));

    if (filterType === "unread") return matchesSearch && email.unread;
    return matchesSearch;
  });

 
  const handleFolderChange = (folderName) => {
    setActiveFolder(folderName);
    const targetMails = emails.filter(e => e.folder === folderName);
    setSelectedEmail(targetMails.length > 0 ? targetMails[0] : null);
    setIsMobileNavOpen(false);
  };

  const folderCounts = {
    Inbox: emails.filter(e => e.folder === "Inbox").length,
    Drafts: emails.filter(e => e.folder === "Drafts").length,
    Junk: emails.filter(e => e.folder === "Junk").length,
    Trash: emails.filter(e => e.folder === "Trash").length,
    Archive: emails.filter(e => e.folder === "Archive").length,
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerRef = useRef(null);
  const isResizingNav = useRef(false);
  const isResizingList = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      if (isResizingNav.current) {
        const newWidth = e.clientX - containerRect.left;
        if (newWidth > 160 && newWidth < 300) setNavWidth(newWidth);
      }
      if (isResizingList.current) {
        const newWidth = e.clientX - containerRect.left - navWidth;
        if (newWidth > 280 && newWidth < 480) setListWidth(newWidth);
      }
    };
    const handleMouseUp = () => {
      isResizingNav.current = false;
      isResizingList.current = false;
      document.body.style.cursor = "default";
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [navWidth]);

  return (
        <div ref={containerRef} className="bg-white border border-[#EAECF0] rounded-2xl  overflow-hidden h-[calc(100vh-10rem)] w-full flex select-none relative">
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs xl:hidden" onClick={() => setIsMobileNavOpen(false)} />
      )}
      
   
      <div style={{ width: windowWidth >= 1280 ? `${navWidth}px` : "240px" }} className={`h-full overflow-y-auto bg-white shrink-0 fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 xl:static xl:translate-x-0 ${isMobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex xl:hidden justify-between items-center p-4 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mailboxes</span>
          <button onClick={() => setIsMobileNavOpen(false)} className="p-1.5 text-slate-500 hover:bg-slate-50 rounded-lg"><X size={18} /></button>
        </div>
        <MailNavigation activeFolder={activeFolder} onFolderSelect={handleFolderChange} counts={folderCounts} />
      </div>
      
      
      <div onMouseDown={() => { isResizingNav.current = true; document.body.style.cursor = "col-resize"; }} className="hidden xl:flex w-1 bg-[#EAECF0] hover:bg-violet-400 cursor-col-resize transition-colors items-center justify-center group shrink-0 relative z-30">
        <div className="w-0.5 h-8 bg-slate-300 group-hover:bg-white rounded-full opacity-0 group-hover:opacity-100" />
      </div>

     
      <div className="h-full bg-white flex flex-col relative w-full xl:w-[var(--list-width)] xl:min-w-[var(--list-width)] shrink-0" style={{ "--list-width": `${listWidth}px`, width: windowWidth >= 1280 ? `${listWidth}px` : "100%", maxWidth: windowWidth >= 1280 ? `${listWidth}px` : "100%" }}>
        <div className="flex xl:hidden items-center gap-3 p-4 border-b border-[#EAECF0] bg-slate-50/50 shrink-0">
          <button onClick={() => setIsMobileNavOpen(true)} className="p-2 hover:bg-slate-200 rounded-xl text-slate-600 transition-all"><Menu size={20} /></button>
          
         
          <span className="text-sm font-bold text-slate-800 tracking-tight">{activeFolder}</span>
        </div>

        <div className="flex-1 overflow-hidden">
          <EmailList 
            emails={filteredEmails} 
            selectedEmailId={selectedEmail?.id} 
            onSelectEmail={(email) => {
              setSelectedEmail(email);
              email.unread = false; 
              if (windowWidth < 1280) setIsMobileDetailOpen(true);
            }} 
            searchTerm={gmailSearchTerm}
            setSearchTerm={setGmailSearchTerm}
            filterType={filterType}       
            setFilterType={setFilterType}   
          />
        </div>
      </div>
      
     
      <div onMouseDown={() => { isResizingList.current = true; document.body.style.cursor = "col-resize"; }} className="hidden xl:flex w-1 bg-[#EAECF0] hover:bg-violet-400 cursor-col-resize transition-colors items-center justify-center group shrink-0 relative z-30">
        <div className="w-0.5 h-8 bg-slate-300 group-hover:bg-white rounded-full opacity-0 group-hover:opacity-100" />
      </div>

     
      <div className={`h-full bg-white fixed inset-0 z-50 transform transition-transform duration-300 xl:static xl:translate-x-0 xl:flex-1 overflow-hidden flex flex-col ${isMobileDetailOpen ? "translate-x-0" : "translate-x-full xl:translate-x-0"}`}>
        <div className="flex xl:hidden items-center p-3 border-b border-[#EAECF0] bg-white shrink-0">
          <button onClick={() => setIsMobileDetailOpen(false)} className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-xl transition-all"><ArrowLeft size={14} /> Back to Inbox</button>
        </div>

        <div className="flex-1 overflow-hidden">
          <MessageDetail 
            email={selectedEmail} 
            onDelete={handleDeleteEmail}   
            onArchive={handleArchiveEmail} 
            onMarkUnread={handleMarkAsUnread} 
          />
        </div>
      </div>
    </div>

  );
}
