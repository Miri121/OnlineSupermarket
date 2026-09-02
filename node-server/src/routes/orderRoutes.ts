import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  searchOrdersByEmail,
} from "../controllers/orderController";
import { validateOrderInput } from "../middleware/securityMiddleware";
import { orderCreationLimiter } from "../middleware/rateLimiter";

const router = Router();

// Create a new order - with strict rate limiting and input validation
router.post("/", orderCreationLimiter, validateOrderInput, createOrder);

// Get all orders
router.get("/", getAllOrders);

// Search orders by email (must be before /:id to avoid conflicts)
router.get("/search/email/:email", searchOrdersByEmail);

// Get order by ID
router.get("/:id", getOrderById);

export default router;
