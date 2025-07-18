import type React from "react"
import "./globals.css"
import { Fira_Code } from "next/font/google" // Removed Inter import
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/footer"
import { SystemLog } from "@/components/system-log"

// Only Fira Code is imported and used for both sans and mono variables
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-mono" })

export const metadata = {
  title: "Evilkop Sentinels - Digital Portfolio",
  description: "Portfolio of a cybersecurity enthusiast, reverse engineer, and developer",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={`${firaCode.variable} font-sans`}>
        {" "}
        {/* Apply firaCode variable to font-sans */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="relative flex-grow">{children}</main>
            <Toaster />
            <Footer />
            <SystemLog />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
