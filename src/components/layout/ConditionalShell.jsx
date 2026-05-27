"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ConditionalShell({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";

  if (isHome) {
    return (
      <main className="min-h-screen">{children}</main>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-16 pb-16 md:pb-0">{children}</main>
      <Footer />
    </>
  );
}
