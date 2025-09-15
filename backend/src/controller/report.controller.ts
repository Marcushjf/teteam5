import { Request, Response } from "express";
import reportService from "../service/reportDb.service";

// @desc    Get reports
// @route   GET /api/report/all
// @access  Public
export const getReports = async (req: Request, res: Response): Promise<void> => {
    try {
        const reports = await reportService.getReports();

        if (!reports) {
            res.status(404).json({ error: "No report found" });
            return;
        }

        res.status(200).json({ reports });
    } catch (error: any) {
        console.error("Error in getReport:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc    Get a report by ID
// @route   GET /api/report/:id
// @access  Public
export const getReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const reportId = Number(req.params.id);
        if (!reportId) {
            res.status(400).json({ error: "Report ID is required" });
            return;
        }

        const report = await reportService.getReportById(reportId);

        if (!report) {
            res.status(404).json({ error: "No report found" });
            return;
        }

        res.status(200).json({ report });
    } catch (error: any) {
        console.error("Error in getReport:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// @desc    Create a new report
// @route   POST /api/report
// @access  Public
export const createReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, contentItems } = req.body;

        if (!title) {
            res.status(400).json({ error: "Title is required" });
            return;
        }

        const newReport = await reportService.createReport(title, contentItems);

        res.status(201).json({ report: newReport });
    } catch (error: any) {
        console.error("Error in createReport:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc    Delete a report
// @route   DELETE /api/report/:id
// @access  Public
export const deleteReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const reportId = Number(req.params.id);
        if (!reportId) {
            res.status(400).json({ error: "Report ID is required" });
            return;
        }

        const deletedReport = await reportService.deleteReport(reportId);

        res.status(200).json({ success: true });
    } catch (error: any) {
        console.error("Error in deleteReport:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc    Update a content item
// @route   PUT /api/content-item/:id
// @access  Public
export const updateContentItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const contentItemId = Number(req.params.id);
        const { data } = req.body;

        if (!contentItemId) {
            res.status(400).json({ error: "Content Item ID is required" });
            return;
        }

        const updatedItem = await reportService.updateContentItem(contentItemId, data);

        res.status(200).json({ contentItem: updatedItem });
    } catch (error: any) {
        console.error("Error in updateContentItem:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
