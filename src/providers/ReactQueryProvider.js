"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { DarkModeProvider } from "@/context/DarkModeContext";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AutContext";
import { AvatarProvider } from "@/context/AvatarContext";

export default function ReactQueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <DarkModeProvider>
        <AvatarProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
        </AvatarProvider>
      </DarkModeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}