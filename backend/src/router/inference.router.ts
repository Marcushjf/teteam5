// src/routes/llm.routes.ts
import express from 'express';
import { inferModel, testModel, generateReport, generateReportLLM } from '../controller/inference.controller';

const router = express.Router();

router.post('/query', inferModel);
router.post('/generate', generateReport);
router.post('/llm', generateReportLLM);
router.get('/test', testModel)

export default router;