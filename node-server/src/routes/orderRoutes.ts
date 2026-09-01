import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  searchOrdersByEmail,
} from "../controllers/orderController";

const router = Router();

// Create a new order
router.post("/", createOrder);

// Get all orders
router.get("/", getAllOrders);

// Search orders by email (must be before /:id to avoid conflicts)
router.get("/search/email/:email", searchOrdersByEmail);

// Get order by ID
router.get("/:id", getOrderById);

export default router;
