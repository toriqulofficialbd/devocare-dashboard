import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        console.log("Fetching translations for:", language); 
        const response = await fetch(`/locales/${language}.json`);
        const data = await response.json();
        console.log("Fetched Data:", data); 
        setTranslations(data);
      } catch (error) {
        console.error("Error loading translation:", error);
      }
    };

    if (language) {
      fetchTranslations(); 
    }
  }, [language]); 
  
  useEffect(() => {
    if (language === "bn") {
      document.title = "স্নেহনীড় ড্যাশবোর্ড ";
    } else {
      document.title = "DevoCare";
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
