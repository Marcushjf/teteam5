import ReportResult from '@/components/reportResult';
import { ResultSection } from '@/components/result-section'
import { getReportById } from '@/lib/report.handler';
import { Newspaper } from 'lucide-react'
import React from 'react'

interface PageProps {
  params: {
    id: string; // the dynamic segment
  };
}

const page: React.FC<PageProps> = async ({ params }) => {
    const { id } = await params;
    const report = await getReportById(id)
    
    return (
        <div className="h-screen w-full flex overflow-hidden">
            <div className="flex-1 flex items-center justify-center p-6 max-h-screen">
                <ReportResult report={report.data}/>
            </div>
        </div>
    )
}

export default page