export const getReports = async () => {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
        const response = await fetch(`${backend_url}/api/report/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });

        if (!response.ok) {
            const data = await response.json();
            return { success: false, data: data.error };
        }

        const report = await response.json();
        return { success: true, data: report.reports }
    } catch (error: any) {
        console.error("Error fetching note:", error);
        return { success: false, data: error.message };
    }
};

export const getReportById = async (id : string) => {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
        const response = await fetch(`${backend_url}/api/report/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });

        if (!response.ok) {
            const data = await response.json();
            return { success: false, data: data.error };
        }

        const report = await response.json();
        return { success: true, data: report.report }
    } catch (error: any) {
        console.error("Error fetching note:", error);
        return { success: false, data: error.message };
    }
};

//update note
export const updateContent = async (id : string, content: string) => {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
        

        const response = await fetch(`${backend_url}/api/report/content-item/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: content }),
            cache: "no-store"
        });

        if (!response.ok) {
            const data = await response.json();
            console.error(data.error || "Failed to fetch note");
            return {success : false, data: data.error};
        }

        const note = await response.json();
        return {success : true, data: note}
    } catch (error:any) {
        console.error("Error fetching note:", error);
        return {success : false, data: error.message};
    }
}

export const createReport = async (title: string, contentItems : ContentItem[]) => {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
        const response = await fetch(`${backend_url}/api/report`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: title, contentItems: contentItems }),
            cache: "no-store"
        });

        if (!response.ok) {
            const data = await response.json();
            return { success: false, data: data.error };
        }

        const result = await response.json();
        return { success: true, data: result.report }
    } catch (error: any) {
        console.error("Error fetching report:", error);
        return { success: false, data: error.message };
    }
};

export const deleteReport = async (id: string) => {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {

        const response = await fetch(`${backend_url}/api/report/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const data = await response.json();
            console.error(data.error || "Failed to delete report");
            return {success : false, data: data.error};
        }

        const result = await response.json();
        return result
    } catch (error:any) {
        console.error("Error fetching reports:", error);
        return {success : false, data: error.message};
    }
}