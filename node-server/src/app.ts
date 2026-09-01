import express, { Request, Response } from "express";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Only allow client app
    credentials: true,
  }),
);
app.use(express.json());

// Request logging middleware
app.use(requestLogger);

// Routes
app.use("/api/orders", orderRoutes);

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", message: "Server is running" });
});

// 404 handler - must be after all routes
app.use(notFoundHandler);

// Global error handler - must be last
app.use(errorHandler);

export default app;
