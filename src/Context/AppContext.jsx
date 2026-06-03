import  { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Global Shared States Pipeline
  const [globalSearch, setGlobalSearch] = useState("");
  const [activeSubView, setActiveSubView] = useState("content"); // options: "content" | "profile"
  const [user, setUser] = useState({
    name: "Amina Rahman",
    email: "amina@devocare.com",
    role: "Super Admin",
    avatar: "https://unsplash.com"
  });

  const login = (email) => {
    setUser({
      name: "Amina Rahman",
      email: email,
      role: "Super Admin",
      avatar: "https://unsplash.com"
    });
    setActiveSubView("content");
  };

    const logout = () => {
    setUser(null);
    setGlobalSearch("");
    setActiveSubView("content");
    
    // 👑 ট্রেন্ডি ফিক্স: সাইন-আউট হওয়ার সাথে সাথে ব্রাউজারের ইউআরএল বারকে রি-সেট করে মেইন রুটে "/" নিয়ে আসবে
    window.history.pushState({}, "", "/"); 
  };


  return (
    <AppContext.Provider value={{ 
      globalSearch, setGlobalSearch, 
      activeSubView, setActiveSubView, 
      user, setUser, login, logout 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
