"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Upload, Sparkles, Edit, Zap, Shuffle, Type } from "lucide-react"
import { cn } from "@/lib/utils"

interface InputSectionProps {
  onGenerate: (title: string) => void,
  onTextGenerate: (title: string, prompt: string, maxPages: number) => void,
  onTextGenerateNoScrape: (title: string, prompt: string) => void,
  isLoading: boolean
}

export function InputSection({
  onGenerate,
  onTextGenerate,
  onTextGenerateNoScrape,
  isLoading
}: InputSectionProps) {
  const [activeTab, setActiveTab] = useState<'default' | 'text'>('text')
  const [textInput, setTextInput] = useState('')
  const [title, setTitle] = useState('')
  const [includePieChart, setIncludePieChart] = useState(false)
  const [includeBarGraph, setIncludeBarGraph] = useState(false)
  const [numberOfSources, setNumberOfSources] = useState(3)
  const [scrapeMode, setScrapeMode] = useState(false)

  const handleTextGenerate = () => {
    if (textInput.trim()) {
      if (scrapeMode) {
        onTextGenerate(title, textInput, numberOfSources)
      } else {
        onTextGenerateNoScrape(title, textInput)
      }
    }
  }

  const handleDefaultGenerate = () => {
    onGenerate(title)
  }

  return (
    <div className="w-full h-fit rounded-2xl border bg-secondary/70 flex flex-col justify-between p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2 ">
          <Zap className="w-5 h-5" />
          Input
        </h3>

        {/* Tab buttons */}
        <div className="flex bg-secondary rounded-lg p-1">
          <button
            onClick={() => setActiveTab('default')}
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-colors",
              activeTab === 'default'
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary-foreground/10"
            )}
          >
            <Upload className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-colors",
              activeTab === 'text'
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary-foreground/10"
            )}
          >
            <Type className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="py-8 space-y-6">
        {/* Title input - present in both tabs */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            className="w-full px-3 py-2 rounded-lg border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          />
        </div>

        {/* Tab-specific content */}
        <div className="h-40">
          {activeTab === 'default' ? (
            <div className="text-muted-foreground text-center h-full flex flex-col items-center justify-center">
              <Upload className="w-8 h-8 mb-2 opacity-50" />
              <p>Default input method</p>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="block text-sm font-medium mb-2">Prompt</label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter your text here..."
                className="w-full h-20 resize-none rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              />
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="scrape-mode"
                    checked={scrapeMode}
                    onCheckedChange={setScrapeMode}
                  />
                  <label htmlFor="scrape-mode" className="text-sm font-medium cursor-pointer">
                    Scrape mode
                  </label>
                </div>
                {scrapeMode && (
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Number of sources</label>
                    <input
                      type="number"
                      min="3"
                      max="10"
                      value={numberOfSources}
                      onChange={(e) => {
                        const value = parseInt(e.target.value)
                        if (value >= 3 && value <= 10) {
                          setNumberOfSources(value)
                        }
                      }}
                      className="w-20 px-3 py-1 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Chart options - present in both tabs */}
        <div>
          <label className="block text-sm font-medium mb-2 pt-8">Chart Options</label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includePieChart}
                onChange={(e) => setIncludePieChart(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm">Include Pie Chart</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeBarGraph}
                onChange={(e) => setIncludeBarGraph(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm">Include Bar Graph</span>
            </label>
          </div>
        </div>
      </div>

      <div className="">
        <Button
          onClick={activeTab === 'default' ? handleDefaultGenerate : handleTextGenerate}
          disabled={isLoading || (activeTab === 'text' && !textInput.trim()) || (!title)}
          className="w-full h-12 text-base font-semibold hover:bg-primary/25 rounded cursor-pointer"
        >
          {isLoading ? (
            <><div>Generating</div></>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Report
            </>
          )}
        </Button>
      </div>


    </div>
  )
}