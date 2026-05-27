import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import ConditionalShell from "@/components/layout/ConditionalShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "RACE50 - The Champions Tournament",
  description:
    "Pick your horses. Earn points. Dominate the leaderboard. Free horse racing tournament platform with live races and competitive rankings.",
  keywords: ["horse racing", "tournament", "race50", "competition", "leaderboard", "free", "champions"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-brand-dark text-zinc-100 min-h-screen`}
      >
        <Providers>
          <ConditionalShell>{children}</ConditionalShell>
        </Providers>
      </body>
    </html>
  );
}
