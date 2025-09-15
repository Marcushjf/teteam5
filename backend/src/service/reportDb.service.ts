import prisma from "../config/db.config";

// Create a new report with optional content items
const createReport = async (title: string, contentItems?: any[]) => {
  return await prisma.report.create({
    data: {
      title,
      contentItems: {
        create: contentItems ?? [],
      },
    },
    include: {
      contentItems: true,
    },
  });
};

// Get all reports
const getReports = async () => {
  return await prisma.report.findMany({
    orderBy: { createdAt: "desc" },
    include: { contentItems: true },
  });
};

// Get a single report by ID
const getReportById = async (reportId: number) => {
  return await prisma.report.findUnique({
    where: { id: reportId },
    include: { contentItems: true },
  });
};

// Delete a report (cascades to contentItems if relation is set properly)
const deleteReport = async (reportId: number) => {
  return await prisma.report.delete({
    where: { id: reportId },
  });
};

// Update a content item by ID
const updateContentItem = async (
  contentItemId: number,
  data?: any
) => {
  return await prisma.contentItem.update({
    where: { id: contentItemId },
    data: {
      data,
    },
  });
};

export default {
  createReport,
  getReports,
  getReportById,
  deleteReport,
  updateContentItem,
};