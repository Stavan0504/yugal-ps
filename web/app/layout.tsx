import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import client from "@/lib/createClient";
import { query } from "@/lib/sanity/queries";
import type { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

  export const metadata: Metadata = {
    title: "Yugal App",
    description: "This is your yugal app",
  };


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        > */}
        <main className="h-screen">
          <div className="">{children}</div>
          <Toaster />
        </main>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
