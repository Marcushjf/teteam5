"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useReports } from "@/context/Report";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import PromptingIsAllYouNeed from "./coolLogo";
import { deleteReport } from "@/lib/report.handler";

export function AppSidebar() {

  const { reports, setReports } = useReports()
  const router = useRouter()
  const handleDelete = async (id: number) => {
    const result = await deleteReport(id.toString())
    if (result.success) {
      setReports(prevReports => prevReports.filter(report => report.id !== id));
    }
  }

  return (
    <Sidebar variant="inset" className="bg-secondary pt-6">
      <SidebarHeader className="">
        <PromptingIsAllYouNeed />
      </SidebarHeader>
      <SidebarContent className="gap-0 bg-secondary py-8 px-2">
        <div >
          Reports
        </div>
        {reports.length > 0 ? (
          <div className="py-6 flex flex-col gap-3">
            {reports.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-background/20 border border-gray-200 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                onClick={() => { router.push(`/report/${item.id}`) }}
              >
                <span className="text-sm font-medium truncate flex-1">
                  {item.title}
                </span>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-secondary cursor-pointer"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation(); // stop the click from bubbling up
                        handleDelete(item.id);
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        ) : (
          // Render when no reports
          <div className="flex flex-col items-center justify-center gap-2">
            <div>No report available</div>
          </div>
        )}

      </SidebarContent>
      <SidebarFooter>
        <div>VOTE FOR TEAM 5</div>
      </SidebarFooter>
    </Sidebar>
  );
}

