import  { useState } from "react";
import { Outlet, useNavigation, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import Sidebar from "../Components/Sidebars/Sidebar";
import Header from "../Components/Header/Header";
import { useApp } from "../Context/AppContext"; // গ্লোবাল অ্যাপ কন্টেক্সট হুক
import Login from "../Components/Login/Login";

const MainLayout = () => {
  const navigation = useNavigation(); 
  const location = useLocation(); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // 👑 ফিক্স: গ্লোবাল কন্টেক্সট থেকে 'user' এবং 'globalSearch' লাইভ ডাটা রিড করা হলো
  const { user, globalSearch } = useApp();

  // ১. অথেনটিকেশন সেফগার্ড লগইন লক
  if (!user) return <Login />;

  return (
    <div className="relative flex h-screen w-screen bg-[#FCFCFD] text-[#101828] font-sans antialiased overflow-hidden">
      
      {/* গ্লোবাল ট্র্যানজিশন প্রোগ্রেস লোডার */}
      {navigation.state === "loading" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-xs transition-all">
          <Loader />
        </div>
      )}

      {/* মোবাইল স্ক্রিন ব্লার ওভারলে */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-slate-900/20 backdrop-blur-xs lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* বামদিকের মডার্ন সাইডবার */}
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        currentPath={location.pathname} 
      />

      {/* মেইন ড্যাশবোর্ড কন্টেন্ট বডি এরিয়া */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* টপ গ্লোবাল হেডার */}
        <Header 
          setIsSidebarOpen={setIsSidebarOpen} 
          currentPath={location.pathname} 
        />

        {/* 🧩 ডাইনামিক ভিউ কন্টেইনার */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[#FCFCFD]">
          <Outlet context={globalSearch} /> 
        </main>
        
      </div>
    </div>
  );
};

export default MainLayout;
