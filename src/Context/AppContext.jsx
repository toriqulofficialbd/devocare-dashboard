import  { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
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
