"use client"
import { useState, useEffect, useRef } from "react"
import { InputSection } from "./input-section"
import { ResultSection } from "./result-section"
import { Download, Newspaper } from "lucide-react"
import { generateReport, generateReportLLM, generateReportQuery } from "@/lib/inference.handler"
import { createReport } from "@/lib/report.handler"
import { useReports } from "@/context/Report"
import { useReactToPrint } from "react-to-print"
import { Button } from "./ui/button"

export function MainPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [showAnimation, setShowAnimation] = useState(false)
    const [progress, setProgress] = useState(0)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [chunkItems, setChunkItems] = useState<ContentItem[]>([])
    const { setReports } = useReports()
    const ref = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: ref,
    });

    useEffect(() => {
        return () => {

        }
    }, [isLoading])

    const onGenerate = async (title: string) => {
        setIsLoading(true)
        const result = await generateReport()
        if (result.success) {
            const savedb = await createReport(title, result.data)
            if (savedb.success) {
                setReports(prevReports => [
                    ...prevReports,
                    savedb.data
                ]);
                setChunkItems(result.data);
            }
        }
        setIsLoading(false)
    }

    const onTextGenerateNoScrape = async (title: string, prompt: string) => {
        setIsLoading(true)
        const result = await generateReportLLM(prompt)
        if (result.success) {
            const savedb = await createReport(title, result.data)
            if (savedb.success) {
                setReports(prevReports => [
                    ...prevReports,
                    savedb.data
                ]);
                setChunkItems(result.data);
            }
        }
        setIsLoading(false)
    }

    const onGenerateQuery = async (title: string, prompt :string, maxPages: number) => {
        setIsLoading(true)
        const result = await generateReportQuery(prompt, maxPages)
        if (result.success) {
            const savedb = await createReport(title, result.data)
            if (savedb.success) {
                setReports(prevReports => [
                    ...prevReports,
                    savedb.data
                ]);
                setChunkItems(result.data);
            }
        }
        setIsLoading(false)
    }

    return (
        <div className="h-screen grid grid-cols-7 overflow-hidden">
            <div className="flex-1 flex items-center justify-center p-8 max-h-screen col-span-5">
                <div className="max-w-[800px] w-full h-full">
                    <div className="bg-secondary/70 backdrop-blur-sm border-0 p-8 rounded-xl flex flex-col h-full">
                        <div className="flex justify-between ">
                            <h3 className="text-lg font-semibold flex items-center gap-2 ps-12 pb-3">
                                <Newspaper className="w-5 h-5" />
                                Report
                            </h3>
                            <Button variant={"ghost"} className='cursor-pointer hover:bg-primary/25' onClick={handlePrint}><Download /></Button>
                        </div>


                        <div className="flex-1 h-full max-h-[85%] overflow-auto p-8" ref={ref}>

                            <div className="col-span-3">
                                <ResultSection
                                    isLoading={isLoading}
                                    resultLoaded={imageLoaded}
                                    chunks={chunkItems}
                                />
                            </div>

                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-600/50">
                            <div className="flex items-center justify-center">
                                <div
                                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 cursor-pointer"
                                >
                                    <span>Team 5</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-2 flex flex-col justify-center items-center pe-8">
                <InputSection isLoading={isLoading} onGenerate={onGenerate} onTextGenerate={onGenerateQuery} onTextGenerateNoScrape={onTextGenerateNoScrape}/>
            </div>
        </div>
    )
}