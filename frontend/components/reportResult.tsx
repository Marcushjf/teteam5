"use client"

import { Download, Newspaper, Printer } from 'lucide-react'
import { ResultSection } from './result-section'
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from './ui/button';

interface reportResultProp {
    report: Report
}

const ReportResult = ({ report }: reportResultProp) => {
    const ref = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: ref,
    });
    return (
        <div className="max-w-[800px] w-full h-full">
            <div className="bg-secondary/70 backdrop-blur-sm border-0 p-8 rounded-xl flex flex-col h-full">
                <div className='flex justify-between items-start'>
                    <h3 className="text-lg font-semibold flex items-center gap-2 ps-12 pb-3">
                        <Newspaper className="w-5 h-5" />
                        {report.title}
                    </h3>
                    <Button variant={"secondary"} className='cursor-pointer hover:bg-primary/25' onClick={handlePrint}><Download /></Button>
                </div>


                <div className="flex-1 h-full max-h-[85%] overflow-auto  p-8" ref={ref}>
                    <div className="col-span-3 " >
                        <ResultSection
                            isLoading={false}
                            resultLoaded={true}
                            chunks={report.contentItems}
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
    )
}

export default ReportResult