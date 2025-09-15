import { Request, Response } from 'express';
import { bedrockClient } from '../service/bedrock.service';
import { prompt_template, prompt_template_llm } from "../util/prompt_templates"
import { fakeData } from '../util/fakeData';
import { callScraper } from '../service/crawler.service';

// @desc    Query Claude model
// @route   POST /api/model/query
// @access  Private
export const inferModel = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            res.status(400).json({ success: false, error: 'Prompt is required' });
            return
        }

        const response = await bedrockClient.invoke(prompt)

        if (!response.message) {
            res.status(400).json({ success: false, error: 'Failed to get a response from model' })
            return
        }

        res.status(200).json({
            response: response.message,
        })

    } catch (error: any) {
        console.error('Error invoking model:', error);
        res.status(500).json({
            error: 'Internal server error while querying.',
        });
    }
};

// @desc    Generate report based on user_query
// @route   POST /api/model/user
// @access  Private
export const generateReport = async (req: Request, res: Response) => {
    try {
        const { prompt, maxPages } = req.body;
        console.log("generating base on query ", prompt)

        if (!prompt) {
            res.status(400).json({ success: false, error: 'Prompt is required' });
            return
        }

        const data = await callScraper(prompt, maxPages)

        if (data.success) {
            console.log("Got scraped data ...")
            const response = await bedrockClient.invoke(prompt_template(data.data.response))

            if (!response.message) {
                res.status(400).json({ success: false, error: 'Failed to get a response from model' })
                return
            }

            res.status(200).json({
                response: JSON.parse(response.message),
            })
        }
        else {
            throw new Error("Error scraping data")
        }



    } catch (error: any) {
        console.error('Error invoking model:', error);
        res.status(500).json({
            error: 'Internal server error while querying.',
        });
    }
};

// @desc    Generate report based on LLM
// @route   POST /api/model/llm
// @access  Private
export const generateReportLLM = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;
        console.log("generating base on llm ", prompt)

        if (!prompt) {
            res.status(400).json({ success: false, error: 'Prompt is required' });
            return
        }

        const response = await bedrockClient.invoke(prompt_template_llm(prompt))

        if (!response.message) {
            res.status(400).json({ success: false, error: 'Failed to get a response from model' })
            return
        }

        res.status(200).json({
            response: JSON.parse(response.message),
        })

    } catch (error: any) {
        console.error('Error invoking model:', error);
        res.status(500).json({
            error: 'Internal server error while querying.',
        });
    }
};

// @desc    Query Claude model
// @route   GET /api/model/test
// @access  Private
export const testModel = async (req: Request, res: Response) => {
    try {
        console.log("testing ...")

        const response = await bedrockClient.invoke(prompt_template(fakeData))

        if (!response.message) {
            res.status(400).json({ success: false, error: 'Failed to get a response from model' })
            return
        }

        res.status(200).json({
            response: JSON.parse(response.message),
        })

    } catch (error: any) {
        console.error('Error invoking model:', error);
        res.status(500).json({
            error: 'Internal server error while querying.',
        });
    }
};