export const generateReport = async () => {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
        const response = await fetch(`${backend_url}/api/model/test`, {
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
        return { success: true, data: report.response }
    } catch (error: any) {
        console.error("Error fetching note:", error);
        return { success: false, data: error.message };
    }
};

export const modelInference = async (prompt :string) => {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
        const response = await fetch(`${backend_url}/api/model/query`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: prompt }),
            cache: "no-store"
        });

        if (!response.ok) {
            const data = await response.json();
            return { success: false, data: data.error };
        }

        const result = await response.json();
        return { success: true, data: result.response }
    } catch (error: any) {
        console.error("Error fetching note:", error);
        return { success: false, data: error.message };
    }
};

export const generateReportQuery = async (prompt :string, maxPages :number = 5) => {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
        const response = await fetch(`${backend_url}/api/model/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: prompt, maxPages: maxPages }),
            cache: "no-store"
        });

        if (!response.ok) {
            const data = await response.json();
            return { success: false, data: data.error };
        }

        const result = await response.json();
        return { success: true, data: result.response }
    } catch (error: any) {
        console.error("Error fetching note:", error);
        return { success: false, data: error.message };
    }
};

export const generateReportLLM = async (prompt :string) => {
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
        const response = await fetch(`${backend_url}/api/model/llm`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: prompt }),
            cache: "no-store"
        });

        if (!response.ok) {
            const data = await response.json();
            return { success: false, data: data.error };
        }

        const result = await response.json();
        return { success: true, data: result.response }
    } catch (error: any) {
        console.error("Error fetching note:", error);
        return { success: false, data: error.message };
    }
};