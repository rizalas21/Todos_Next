"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import { AddTodo } from "./AddTodo";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideBar = pathname === "/signin" || pathname === "/register";

  return (
    <SessionProvider>
      {!hideBar && <Navbar />}
      {children}
      {!hideBar && <Footer />}
    </SessionProvider>
  );
}
