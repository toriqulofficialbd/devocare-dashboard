import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../Context/AppContext";
import { User, Shield, Save, Settings, BellRing, Upload } from "lucide-react";

export default function ProfileAndSettings() {
  const { user, setUser } = useApp();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || "");
  const [role, setRole] = useState(user?.role || "");
  const [avatar, setAvatar] = useState(user?.avatar || ""); // গ্লোবাল ইমেজ স্টেট ধারণ করবে
  const [emailNotification, setEmailNotification] = useState(true);

  // 👑 ম্যাজিক লজিক: ডিভাইস থেকে ছবি সিলেক্ট করলে Base64 এ কনভার্ট করার হ্যান্ডলার
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result); // সরাসরি লোকাল প্রিভিউ ইমেজ অবজেক্ট জেনারেট করবে
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setUser({ ...user, name, role, avatar });
    alert("Profile and workspace configurations saved successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 mt-2 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-[#EAECF0] pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Workspace Settings</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage your system preferences and personal administrative profile credentials</p>
        </div>
        <button 
          onClick={() => navigate("/")}
          className="text-xs font-semibold text-slate-600 border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       
        <div className="bg-white border border-[#EAECF0] rounded-2xl p-5 flex flex-col items-center text-center shadow-xs h-fit">
          <img src={avatar || "https://unsplash.com"} alt="Profile" className="h-20 w-20 rounded-full border border-slate-200 object-cover shadow-sm mb-3" />
          <h4 className="text-sm font-bold text-slate-900">{name || "Name"}</h4>
          <span className="text-[11px] font-medium text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full mt-1.5">{role || "Role"}</span>
          <p className="text-xs text-slate-400 mt-2">{user?.email}</p>
        </div>

      
        <div className="md:col-span-2 bg-white border border-[#EAECF0] rounded-2xl p-6 shadow-xs">
          <form onSubmit={handleSave} className="space-y-5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-50">
              <Settings size={16} className="text-slate-400" /> Account Management
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Identity Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full text-sm pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-violet-500" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Administrative Role Label</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full text-sm pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-violet-500" required />
                </div>
              </div>
            </div>

          
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Profile Avatar Upload</label>
              <div className="mt-1 flex items-center justify-center border-2 border-dashed border-slate-200 hover:border-violet-400 rounded-xl p-5 bg-[#F9FAFB] transition-colors relative cursor-pointer group">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload} 
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="text-center space-y-1 select-none">
                  <Upload size={20} className="text-slate-400 mx-auto group-hover:text-violet-500 transition-colors" />
                  <div className="text-xs font-bold text-slate-700">Click to upload image file</div>
                  <p className="text-[10px] text-slate-400">PNG, JPG up to 2MB from your device storage</p>
                </div>
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pt-2 pb-2 border-b border-slate-50">
              <BellRing size={16} className="text-slate-400" /> System Communications
            </h3>
            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-[#F9FAFB]">
              <div>
                <div className="text-xs font-bold text-slate-800">Email Real-time Digests</div>
                <p className="text-[11px] text-slate-400 mt-0.5">Receive instant email synchronization dispatch alerts for care schedules</p>
              </div>
              <input type="checkbox" checked={emailNotification} onChange={(e) => setEmailNotification(e.target.checked)} className="h-4 w-4 text-violet-600 focus:ring-violet-500 rounded border-slate-300 cursor-pointer" />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-50">
              <button type="button" onClick={() => navigate("/")} className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
              <button type="submit" className="rounded-xl bg-slate-900 text-white px-4 py-2 text-xs font-bold hover:bg-slate-800 shadow-xs flex items-center gap-2"><Save size={14} /> Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
