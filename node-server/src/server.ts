import dotenv from "dotenv";
import app from "./app";
import { initializeElasticsearch } from "./elasticsearch/elasticsearch";
import logger from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || 3001;

// Initialize Elasticsearch and start server
const startServer = async () => {
  try {
    await initializeElasticsearch();
    logger.info("Elasticsearch initialized successfully");

    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason: Error, promise: Promise<any>) => {
  logger.error("Unhandled Rejection at:", { promise, reason: reason.message, stack: reason.stack });
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error: Error) => {
  logger.error("Uncaught Exception:", { message: error.message, stack: error.stack });
  // Exit the process as the app is in an undefined state
  process.exit(1);
});

startServer();
