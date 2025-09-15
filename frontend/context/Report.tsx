"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ReportContextType {
  reports: Report[];
  setReports: React.Dispatch<React.SetStateAction<Report[]>>;
  getReportTitle: (reportId: number) => string | undefined;
  getContentItem: (reportId: number, itemId: number) => ContentItem | undefined;
  contentItemExists: (reportId: number, itemId: number) => boolean;
  updateContentItemData: (itemId: number, newData: string) => boolean;
}

interface ReportProviderProps {
  children: ReactNode;
  initialReports?: Report[];
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider: React.FC<ReportProviderProps> = ({ children, initialReports = [] }) => {
  const [reports, setReports] = useState<Report[]>(initialReports);

  // Get report title by ID
  const getReportTitle = (reportId: number): string | undefined => {
    return reports.find((report) => report.id === reportId)?.title;
  };

  // Get a specific content item from a report
  const getContentItem = (reportId: number, itemId: number): ContentItem | undefined => {
    const report = reports.find((r) => r.id === reportId);
    return report?.contentItems.find((item) => item.id === itemId);
  };

  // Check if a content item exists within a report
  const contentItemExists = (reportId: number, itemId: number): boolean => {
    const report = reports.find((r) => r.id === reportId);
    return !!report?.contentItems.some((item) => item.id === itemId);
  };

  const updateContentItemData = (itemId: number, newData: string): boolean => {
    let updateSuccessful = false;
    
    setReports(prevReports => {
      return prevReports.map(report => {
        return {
          ...report,
          contentItems: report.contentItems.map(item => {
            if (item.id !== itemId) return item;
            
            // Ensure we're updating a markdown type content item
            if (item.type === 'markdown') {
              updateSuccessful = true;
              return {
                ...item,
                data: newData,
              };
            }
            
            return item;
          })
        };
      });
    });
    console.log("done")

    return updateSuccessful;
  };

  return (
    <ReportContext.Provider
      value={{ reports, setReports, getReportTitle, getContentItem, contentItemExists, updateContentItemData }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = (): ReportContextType => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReports must be used within a ReportProvider");
  }
  return context;
};
