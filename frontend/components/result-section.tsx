"use client"
import { ImageIcon, Loader2, Newspaper } from "lucide-react"
import { MarkdownRenderer } from "./mardown"
import { ChartComponent } from "./charts"

interface ResultSectionProps {
    isLoading: boolean
    resultLoaded: boolean
    chunks: ContentItem[]
}

export function ResultSection({
    isLoading,
    resultLoaded,
    chunks
}: ResultSectionProps) {
    const safeChunks = chunks || [];
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-center h-full">
                {isLoading ? (
                    <div className="flex items-center justify-center p-8 pt-24">
                        <div className="text-center">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                            <p className="text-sm text-muted-foreground">Generating Report...</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        {safeChunks
                            .slice() // shallow copy
                            .sort((a, b) => a.order - b.order) // sort ascending
                            .map((item, index) =>
                                item.type === "markdown" ? (
                                    <div key={index}>
                                        <MarkdownRenderer content={item} className="pb-8" />
                                    </div>
                                ) : (
                                    <div key={index} className="flex items-center justify-center">
                                        <ChartComponent chart={item} className="size-[50%] py-8" />
                                    </div>
                                )
                            )}
                    </div>
                )}
            </div>
        </div>
    )
}