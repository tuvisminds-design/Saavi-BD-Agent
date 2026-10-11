import type { Metadata } from "next"
import { Fraunces, Source_Sans_3 } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

import "./globals.css"

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
})

const heading = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Saavi lead qualification desk",
  description:
    "Persona, qualification, and decision-maker summaries for Saavi. HR, CEO, and CFO at Indian companies inside the Moneycontrol ₹500–1,000 crore band.",
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
