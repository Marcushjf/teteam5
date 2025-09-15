// src/routes/llm.routes.ts
import express from 'express';
import { generateReport } from '../controller/extract.controller';

const router = express.Router();

router.post('/', generateReport);

export default router;