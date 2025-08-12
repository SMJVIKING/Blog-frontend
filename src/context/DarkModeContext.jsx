"use client";

import useLocalStorageState from "@/hooks/useLocalStorageState";
import { createContext, useContext, useEffect } from "react";

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    "isDarkMoode",
    false // مقدار پیشفرض امن برای سرور
  );

  // بعداً مقدار اولیه رو توی useEffect آپدیت کن
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("isDarkMoode");
  
      if (storedValue === null) {
         // این بخش تم سایت رو مطابق با تم سیستم ست میکنه ینی دارک باشه دارک و بالعکس
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkMode(prefersDark);
      }
    }
  }, []);
  
  

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");

  return context;
}


// steps:
// 1.create context
// 2.call provider method of context
// 3.get values
// 4.create a custom hook to => we can use context eveywhere

// (prefers-color-scheme:dark) =>
//  پراپرتی خود مرورگر ک نشون میده تم دارک داره یا لایت

// =>نکته مهم اینه ک اینا حتما باید داخل پرانتز باشن