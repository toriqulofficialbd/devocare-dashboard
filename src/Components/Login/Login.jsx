import  { useState } from "react";
import { useApp } from "../../Context/AppContext";
import { Lock } from "lucide-react";

export default function Login() {
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) login(email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50 font-sans p-4 select-none">
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl animate-in scale-in duration-200">
        <div className="text-center mb-6">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-black mx-auto mb-3 text-lg shadow-md shadow-violet-500/10">D</div>
          <h2 className="text-xl font-bold text-slate-900">Welcome to DevoCare</h2>
          <p className="text-xs text-slate-400 mt-1">Please enter your authorized administrative metrics</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Email Account Address</label>
            <input type="email" required placeholder="admin@devocare.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-sm px-3 py-2 border border-slate-200 bg-[#F9FAFB] rounded-xl focus:outline-hidden focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Security Token Password</label>
            <input type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full text-sm px-3 py-2 border border-slate-200 bg-[#F9FAFB] rounded-xl focus:outline-hidden focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/5 transition-all" />
          </div>
          <button type="submit" className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 shadow-md transition-colors mt-2 flex items-center justify-center gap-2"><Lock size={14} /> Authenticate Access</button>
        </form>
      </div>
    </div>
  );
}
