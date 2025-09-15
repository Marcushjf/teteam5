import { Request, Response } from 'express';
import { callEndpoint } from '../service/lambda.service';
import { scrape } from '../util/extract.util';

// @desc    Generate a report
// @route   POST /api/generate
// @access  Private
export const generateReport = async (req: Request, res: Response) => {
    try {
        const { prompt, maxPages } = req.body;

        if (!prompt) {
            res.status(400).json({ success: false, error: 'Prompt is required' });
            return
        }

        const response = await callEndpoint(prompt, maxPages)

        if (!response.success) {
            res.status(400).json({ success: false, error: 'Failed to get a response from endpoint' })
            return
        }

        const result = await scrape(response.data.sites)
        res.status(200).json({
            response: result,
        })

    } catch (error: any) {
        console.error('Error invoking model:', error);
        res.status(500).json({
            error: 'Internal server error while querying.',
        });
    }
};