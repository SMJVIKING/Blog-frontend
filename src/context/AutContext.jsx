"use client";

import { getUserApi, logoutApi, signinApi, signupApi } from "@/services/authService";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

const initionalState = {
  user: null,
  isLoading: true,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "signin":
      return { isAuthenticated: true, user: action.payload };
    case "signup":
      return { isAuthenticated: true, user: action.payload };
    case "logout":
      return { isAuthenticated: false, user: action.payload };
    case "user/loaded":
      return { isAuthenticated: true, user: action.payload };
  }
};

export default function AuthProvider({ children }) {
  const router = useRouter();

  const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(
    authReducer,
    initionalState
  );

  async function signin(values) {
    dispatch({ type: "loading" });

    try {
      const { user, message } = await signinApi(values);
      dispatch({ type: "signin", payload: user });
      toast.success(message);
      router.push("/profile");
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsg });
      toast.error(errorMsg);
    }
  }

  async function signup(values) {
    dispatch({ type: "loading" });

    try {
      const { user, message } = await signupApi(values);
      dispatch({ type: "signup", payload: user });
      toast.success(message);
      router.push("/profile");
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsg });
      toast.error(errorMsg);
    }
  }

  async function logout() {
    dispatch({ type: "loading" });
  
    try {
      const response = await logoutApi();
      dispatch({ type: "logout" }); 
      toast.success(response.message);
      router.push("/signin");
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Something went wrong";
      dispatch({ type: "rejected", payload: errorMsg });
      toast.error(errorMsg);
    }
  }

  // get user data :
  async function getUser() {
    dispatch({ type: "loading" });

    try {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      const { user } = await getUserApi();
      dispatch({ type: "user/loaded", payload: user });
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsg });
    }
  }
  // =>
  // برای استفاده کردن از فانکشن بالایی نیازه که  اونو داخل ی یوزافکت بزاریم :
  // تو یوزافکت هم نمیشه ی فانکشن اویت رو فراخوانی کردو
  // و نمیشه ارو فانکشن داخل یوزافکت رو هم اسینک کرد
  // خب پس راه حل چیه ؟
  // باید داخلش ی اسینک فانکشن جدا تعریف کنی :
  useEffect(() => {
    async function fetchData() {
      await getUser();
    }
    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      // اینجا ما باید "استیت و دیسپچ" پاس بدیم ولی ب جای اینکه اینکارو کنیم و کلی
      // کد توی "کامپوننت ها تکراری" بشه => خود "ساین این و ساین اپو" میاریم اینجا مینویسیم و اونارو پاس میدیم
      value={{ user , isAuthenticated , isLoading , error , signin , signup , logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("not found Auth Context");
  return context;
}

// ------------------------------------------------------------------------------------

// نکته:

// solution 1: we need to use [state and dispatch] "everywhere" of componenets we need

// solution 2:
// we can write [SIGNIN and SIGNUP] component "here" instead of "they're components"
// and reapt and reapet = >
//  and we pass [this components] to 'AuthContext.provider' instead of [state, dispatch]