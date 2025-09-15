import * as cheerio from "cheerio";

export async function scrape(urls: string[]): Promise<string> {
  let allText = "";

  for (const url of urls) {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MyScraper/1.0)"
      }
    });
    const html = await res.text();

    const $ = cheerio.load(html);

    // Extract all paragraphs and join into one string
    const pageText = $("p")
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(p => p.length > 0) // skip empty paragraphs
      .join("\n\n"); // separate paragraphs by double newlines

    // Append page content + source marker
    allText += pageText + `\n\n--- Extracted from: ${url} ---\n\n`;
  }

  return allText.trim(); // remove leading/trailing whitespace
}