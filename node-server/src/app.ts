import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import orderRoutes from "./routes/orderRoutes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/requestLogger";
import {
  sanitizeInput,
  validateContentLength,
} from "./middleware/securityMiddleware";
import { generalLimiter, readLimiter } from "./middleware/rateLimiter";

const app = express();

// Security headers middleware - should be first
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Only allow client app
    credentials: true,
  }),
);

// Body parser with size limit to prevent large payload attacks
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Content length validation
app.use(validateContentLength);

// Sanitize user input to prevent NoSQL injection
app.use(sanitizeInput);


// Rate limiting middleware
app.use(generalLimiter); // General rate limiting for all routes
app.use(readLimiter); // Additional rate limiting for read operations

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
