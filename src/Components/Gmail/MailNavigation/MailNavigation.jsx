
import { Inbox, File, Send, Archive, Trash2, AlertCircle } from "lucide-react";
import AccountSelector from "./AccountSelector";
import MailNavigationItem from "./MailNavigationItem";

export default function MailNavigation({ activeFolder = "Inbox", onFolderSelect, counts = {} }) {
  const folders = [
    { icon: Inbox, label: "Inbox", count: counts.Inbox || 0 },
    { icon: File, label: "Drafts", count: counts.Drafts || 0 },
    { icon: Send, label: "Sent", count: counts.Sent || 0 },
    { icon: AlertCircle, label: "Junk", count: counts.Junk || 0 },
    { icon: Trash2, label: "Trash", count: counts.Trash || 0 },
    { icon: Archive, label: "Archive", count: counts.Archive || 0 },
  ];

  return (
    <div className="h-full bg-white p-3 flex flex-col gap-1 select-none overflow-y-auto">
      {/* Account Drop-down Select Module Block */}
      <AccountSelector activeAccount="Amina Rahman" />

      {/* Nav Link Item Iteration Stack wrapper */}
      <div className="space-y-0.5 flex-1">
        {folders.map((folder, index) => (
          <MailNavigationItem
            key={index}
            icon={folder.icon}
            label={folder.label}
            count={folder.count}
            isSelected={activeFolder === folder.label} // ✅ Correct boolean mapping evaluation loop
            onClick={() => {
              if (onFolderSelect) {
                onFolderSelect(folder.label); // ✅ Restores live tab click operations instantly
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
