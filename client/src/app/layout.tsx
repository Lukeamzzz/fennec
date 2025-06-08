import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fennec",
  description: "Real Estate Intelligence Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const nonce = headers().get('x-nonce')
  
  return (
    <html lang="en">
      <head>
        {/* Solo si necesitas usar scripts inline */}
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
