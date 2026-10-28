import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

import "./globals.css"

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const heading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Saavi prospecting",
  description:
    "HR heads for Saavi corporate gifting. LinkedIn profiles are pasted by a person.",
  applicationName: "Saavi",
  appleWebApp: {
    capable: true,
    title: "Saavi",
    statusBarStyle: "default",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#392616",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", sans.variable, heading.variable)}
    >
      <body className="font-sans">
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      </body>
    </html>
  )
}
