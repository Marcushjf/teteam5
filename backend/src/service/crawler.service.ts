import { config } from "../config/server.config";

export async function callScraper(prompt: string = "GET some data about te connectivity, better be digital data from open source website", maxPages: number = 3) {

  const body = {
    prompt: prompt,
    maxPages: maxPages,
  };

  try {
    const response = await fetch(config.lambda_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {success:true, data:data}
  } catch (error: any) {
    console.error("Error calling endpoint:", error.message);
    return {success:false, data:error.message}
  }
}