import express, { Request, Response } from "express";
import { config } from "./config/server.config";
import extractRoutes from "./router/extract.router"

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express + TypeScript!");
});
app.use("/api/generate", extractRoutes)

// Start server
app.listen(config.port, async () => {
  console.log(`🚀 Server running at http://localhost:${config.port}`);
});
