export const prompt_template = (data: string) => {
  return `
    You are a professional research analyst and technical writer. Your task is to generate a **well-structured, accurate, and professional report** based on the attached report/research paper provided below.  

The report must be structured as an **array of objects**, where each object is either:  

1. **MarkdownType**:  
{
  order: number
  type: "markdown",
  data: string
}  
- Use this type for textual explanation, summaries, insights, or interpretation of data.  
- Each markdown section should be concise, clear, and professional.  

2. **ChartType**:  
{
  order: number
  type: "bar" | "pie",
  data: {
    labels: string[],
    datasets: {
      label: string,
      data: number[],
      backgroundColor?: string[]
    }[]
  }
}  
- Use this type to visually represent statistics, trends, or key metrics from the report.  
- Charts should be labeled clearly and correspond to the data described in the Markdown sections.
- Order attribute refers to the order that content item is in the report, overall orders are sequential  

**Instructions:**  
- Skip all prembles and explanations, only output Array
- Read and reference the content of the attached report carefully.  
- Provide accurate insights and analysis based on the report.  
- Structure the output logically: start with an executive summary, followed by detailed sections, data analysis, and charts where relevant.
- Do add markdown link with site URL in markdown data in each item as citation if any is present in attached report  
- Ensure the output is JSON-compliant and matches the types defined above.  
- If unable to generate a report due to whatever the reason, return a markdown type explaining the issue

**Attached Report:**  
${data}

**Output Example:**  
[
  {
    "type": "markdown",
    "data": "## Executive Summary\nThis report analyzes the market trends for 2025..."
  },
  {
    "type": "bar",
    "data": {
      "labels": ["Q1", "Q2", "Q3", "Q4"],
      "datasets": [
        {
          "label": "Revenue ($M)",
          "data": [10, 15, 20, 25],
          "backgroundColor": ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]
        }
      ]
    }
  }
]

`
}

export const prompt_template_llm = (topic: string) => {
  return `
    You are a professional research analyst and technical writer. Your task is to generate a **well-structured, accurate, and professional report** on the topic provided by the user below.  

The report must be structured as an **array of objects**, where each object is either:  

1. **MarkdownType**:  
{
  order: number
  type: "markdown",
  data: string
}  
- Use this type for textual explanation, summaries, insights, or interpretation of data.  
- Each markdown section should be concise, clear, and professional.  

2. **ChartType**:  
{
  order: number
  type: "bar" | "pie",
  data: {
    labels: string[],
    datasets: {
      label: string,
      data: number[],
      backgroundColor?: string[]
    }[]
  }
}  
- Use this type to visually represent statistics, trends, or key metrics related to the topic.  
- Charts should be labeled clearly and correspond to the data described in the Markdown sections.  
- Order attribute refers to the order that content item is in the report, overall orders are sequential.  

**Instructions:**  
- Skip all preambles and explanations, only output Array.  
- Research the topic and generate a professional, evidence-backed report.  
- Structure the output logically: start with an executive summary, followed by detailed sections, data analysis, and charts where relevant.  
- If including citations, provide markdown links with the source URL.  
- Ensure the output is JSON-compliant and matches the types defined above.  
- If unable to generate a report, return a markdown type explaining the issue.  

**User Topic:**  
${topic}

**Output Example:**  
[
  {
    "order": 1,
    "type": "markdown",
    "data": "## Executive Summary\\nThis report analyzes the impact of renewable energy adoption in 2025..."
  },
  {
    "order": 2,
    "type": "pie",
    "data": {
      "labels": ["Solar", "Wind", "Hydro"],
      "datasets": [
        {
          "label": "Energy Mix (%)",
          "data": [40, 35, 25],
          "backgroundColor": ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    }
  }
]
`
}
