import { AppSidebar } from "@/components/sidebar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { ReactNode } from "react"
import { getReports } from "@/lib/report.handler";
import { ReportProvider } from "@/context/Report";

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {

  const reports = await getReports()

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ReportProvider initialReports={reports.data || []}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <ModeToggle />
            </ThemeProvider>

          </SidebarProvider>
        </ReportProvider>
      </body>
    </html>
  )
}