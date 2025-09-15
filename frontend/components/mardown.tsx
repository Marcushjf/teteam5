"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MoreHorizontal, FileText, MessageCircle, Loader2, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useReports } from "@/context/Report";
import { modelInference } from "@/lib/inference.handler";
import { updateContent } from "@/lib/report.handler";

interface MarkdownRendererProps {
    content: MarkdownType;
    className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
    content,
    className,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isExplaining, setIsExplaining] = useState(false);
    const [explanation, setExplanation] = useState<string>("");
    const [showExplanation, setShowExplanation] = useState(false);
    const [currentContent, setCurrentContent] = useState(content.data);
    const { updateContentItemData } = useReports()

    const streamContent = (fullText: string, setContent: (text: string) => void, delay = 20) => {
        let index = 0;
        const interval = setInterval(() => {
            index += 1;
            setContent(fullText.slice(0, index));
            if (index >= fullText.length) {
                clearInterval(interval);
            }
        }, delay);
    };


    const handleSummarize = async () => {
        setIsLoading(true);
        try {
            const result = await modelInference(
                `
                    You are an expert content summarizer. Your task is to take the following markdown document and produce a **concise, accurate, and professional summary**, while **retaining the original markdown structure** (headings, lists, code blocks, formatting).  

    Do not change the markdown syntax. Return the output **as a markdown string only**, without extra commentary or explanation.

    Here is the document to summarize:

    """
    {{MARKDOWN_DOCUMENT_HERE}}
    """

    Output the summarized markdown:
    ${content.data}
                `
            );

            if (result.success) {
                const update = await updateContent(content.id.toString(), result.data)
                if (update.success) {
                    setCurrentContent(""); // clear first
                    streamContent(result.data, setCurrentContent, 15); // stream at 15ms per char
                    updateContentItemData(content.id, result.data)
                }
                else {
                    throw new Error(update.data)
                }
            }
            else {
                throw new Error(result.data)
            }

        } catch (error) {
            console.error('Error summarizing content:', error);
            // Optionally revert to original content on error
            setCurrentContent(content.data);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExplain = async () => {
        setIsExplaining(true);
        setShowExplanation(true);

        try {
            const result = await modelInference(
                `
                    You are an expert content explainer. Your task is to analyze the following markdown document and provide a clear, concise explanation that helps readers understand:
                    
                    1. The main concepts and ideas presented
                    2. The context and significance of the content
                    3. Any technical terms or complex ideas in simpler language
                    
                    Structure your explanation clearly with headings if needed. Skip preamble and jump straight to explaining, keep your explanantion short and concise
                    
                    Here is the document to explain:
                    
                    """
                    ${currentContent}
                    """
                    
                    Provide your explanation:
                `
            );

            if (result.success) {
                setExplanation(""); // clear first
                streamContent(result.data, setExplanation, 0.02); // stream at 15ms per char
            } else {
                throw new Error(result.data);
            }

        } catch (error) {
            console.error('Error explaining content:', error);
            setExplanation("Sorry, there was an error generating the explanation. Please try again.");
        } finally {
            setIsExplaining(false);
        }
    };

    const closeExplanation = () => {
        setShowExplanation(false);
        setExplanation("");
    };

    const shouldShowButton = isHovered || isDropdownOpen;

    // Loading component
    const LoadingIndicator = () => (
        <div className="flex items-center justify-center p-8">
            <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Summarizing content...</p>
            </div>
        </div>
    );

    // Explanation Modal
    const ExplanationModal = () => (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background border border-border rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground">Content Explanation</h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={closeExplanation}
                        className="h-8 w-8 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {isExplaining ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center">
                                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                                <p className="text-sm text-muted-foreground">Analyzing and explaining content...</p>
                            </div>
                        </div>
                    ) : (
                        <div className="prose prose-invert max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {explanation}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div
                className={`relative prose prose-invert ${className} p-4 rounded-md border border-transparent hover:border-primary transition-all duration-200`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Menu Button */}
                {shouldShowButton && !isLoading && (
                    <div className="absolute top-2 right-2 z-10">
                        <DropdownMenu onOpenChange={setIsDropdownOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm border-border hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-36">
                                <DropdownMenuItem onClick={handleSummarize} className="cursor-pointer">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Summarize
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleExplain} className="cursor-pointer">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Explain
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}

                {/* Content - either loading or markdown */}
                {isLoading ? (
                    <LoadingIndicator />
                ) : (
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ node, ...props }) => (
                                <h1 className="text-3xl font-bold my-4" {...props} />
                            ),
                            h2: ({ node, ...props }) => (
                                <h2 className="text-2xl font-semibold my-3" {...props} />
                            ),
                            h3: ({ node, ...props }) => (
                                <h3 className="text-xl font-semibold my-2" {...props} />
                            ),
                            p: ({ node, ...props }) => <p className="my-2" {...props} />,
                            ul: ({ node, ...props }) => (
                                <ul className="list-disc list-inside ml-5 my-2" {...props} />
                            ),
                            ol: ({ node, ...props }) => (
                                <ol className="list-decimal list-inside ml-5 my-2" {...props} />
                            ),
                            li: ({ node, ...props }) => <li className="my-1" {...props} />,
                        }}>
                        {currentContent}
                    </ReactMarkdown>
                )}
            </div>

            {/* Explanation Modal */}
            {showExplanation && <ExplanationModal />}
        </>
    );
};