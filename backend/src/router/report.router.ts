// src/routes/report.routes.ts
import express from "express";
import { 
  getReport, 
  createReport, 
  deleteReport, 
  updateContentItem,
  getReports
} from "../controller/report.controller";

const router = express.Router();

// Reports
router.get("/all", getReports);
router.get("/:id", getReport);       // Get a single report

router.post("/", createReport);      // Create a new report
router.delete("/:id", deleteReport); // Delete a report

// Content Items
router.put("/content-item/:id", updateContentItem); // Update a content item

export default router;