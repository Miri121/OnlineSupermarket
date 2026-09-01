import { Request, Response } from "express";
import orderService from "../services/orderService";
import { asyncHandler } from "../middleware/asyncHandler";

/**
 * Create a new order
 * POST /api/orders
 */
export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const result = await orderService.createOrder(req.body);

  res.status(201).json({
    message: "Order created successfully",
    orderId: result.orderId,
    order: result.order,
  });
});

/**
 * Get all orders
 * GET /api/orders
 */
export const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  const result = await orderService.getAllOrders();

  res.json(result);
});

/**
 * Get order by ID
 * GET /api/orders/:id
 */
export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await orderService.getOrderById(id);

  res.json(order);
});

/**
 * Search orders by email
 * GET /api/orders/search/email/:email
 */
export const searchOrdersByEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await orderService.searchOrdersByEmail(email);

  res.json(result);
});
