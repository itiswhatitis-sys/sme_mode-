import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { MainLayout } from "@/components/layout/main-layout";
import { SnackProvider } from "@/app/SnackProvider"; // 👈 import SnackProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SME Hiring Platform",
  description: "A platform for SMEs to manage their hiring process",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SnackProvider> 
            <MainLayout>{children}</MainLayout>
            <Toaster />
          </SnackProvider>
        </ThemeProvider>
        <div className="fixed bottom-3 right-3 z-50 p-1 px-2 text-xs text-neutral-600 dark:text-[#9CA3AF]  backdrop-blur-[2px] ">
              Powered By Interain AI
            </div>
      </body>
    </html>
  );
}
