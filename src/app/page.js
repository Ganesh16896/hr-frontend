"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to another page, e.g., '/dashboard'
    router.push("/login");
  }, [router]);

  return null; // No need to render anything since we're redirecting
}
