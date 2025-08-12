"use client";

import { useRouter } from "next/navigation";

export default function useMoveBack() {
  const router = useRouter();

  return () => {
    if (typeof window !== "undefined") {
      router.back();
    }
  };
}
