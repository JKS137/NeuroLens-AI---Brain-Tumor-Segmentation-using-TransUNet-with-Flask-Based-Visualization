import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Mock Segmentation API
  app.post("/api/segment", async (req, res) => {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // In a real app, this would call a Python service or run a model
    // Here we return mock metadata and a success signal
    res.json({
      success: true,
      scanId: `SCAN-${Math.floor(Math.random() * 10000)}`,
      metrics: {
        diceScore: 0.942,
        iou: 0.887,
        volumeCm3: 12.4,
        inferenceMs: 140
      },
      findings: "Focal lesion detected in the left temporal lobe. Whole tumor volume is consistent with previous longitudinal data."
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NeuroLens AI Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
