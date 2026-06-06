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
  
 
  const { user, globalSearch } = useApp();

  
  if (!user) return <Login />;

  return (
    <div className="relative flex h-screen w-screen bg-[#FCFCFD] text-[#101828] font-sans antialiased overflow-hidden">
      
      
      {navigation.state === "loading" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-xs transition-all">
          <Loader />
        </div>
      )}

      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-slate-900/20 backdrop-blur-xs lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        currentPath={location.pathname} 
      />

     
      <div className="flex flex-1 flex-col overflow-hidden">
        
        
        <Header 
          setIsSidebarOpen={setIsSidebarOpen} 
          currentPath={location.pathname} 
        />

        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[#FCFCFD]">
          <Outlet context={globalSearch} /> 
        </main>
        
      </div>
    </div>
  );
};

export default MainLayout;
