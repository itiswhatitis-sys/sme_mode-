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
      </body>
    </html>
  );
}
