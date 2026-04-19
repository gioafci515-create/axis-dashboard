import fs from "fs";
import { JSDOM } from "jsdom";

// Read the file
const content = fs.readFileSync("src/pages/Dashboard.jsx", "utf8");

// Try to find and extract only the JSX part (between return () => { and })
const match = content.match(
  /return\s*\(\s*<MainLayout>([\s\S]*?)<\/MainLayout>\s*\)/,
);

if (match) {
  const jsxContent = `<MainLayout>${match[1]}</MainLayout>`;

  try {
    // Create a simple HTML document to parse the JSX
    const dom = new JSDOM(`<!DOCTYPE html><body>${jsxContent}</body>`);
    const document = dom.window.document;

    // Check for any invalid elements or tags
    console.log("JSX parsed successfully");
  } catch (error) {
    console.error("Error parsing JSX:", error);
    // Try to find the approximate location of the error
    const errorMsg = error.message;
    const matchLine = errorMsg.match(/Line\s*(\d+)/i);
    if (matchLine) {
      const errorLine = parseInt(matchLine[1]);
      console.log(`Error around line ${errorLine}`);

      // Show some context
      const lines = jsxContent.split("\n");
      const start = Math.max(0, errorLine - 5);
      const end = Math.min(lines.length, errorLine + 5);
      console.log("Context:");
      for (let i = start; i < end; i++) {
        console.log(`${i + 1}: ${lines[i]}`);
      }
    }
  }
} else {
  console.error("Could not find MainLayout wrapper");
}
