interface ChartType {
    id: number
    order: number
    type: "bar" | "pie";
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor?: string[];
        }[];
    };
}

interface MarkdownType {
    id: number
    order: number
    type: "markdown";
    data: string;
}

type ContentItem = ChartType | MarkdownType;

interface Report {
  id: number;
  title: string;
  createdAt: string
  updatedAt: string
  contentItems: ContentItem[];
}