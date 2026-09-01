 import { elasticsearchClient, getIndexName } from "../../elasticsearch/elasticsearch";
import { Order } from "../types/order";
import { AppError } from "../middleware/errorHandler";
import logger from "../utils/logger";

export class OrderService {
  /**
   * Create a new order
   */
  async createOrder(orderData: Order): Promise<{ orderId: string; order: Order }> {
    // Validate required fields
    if (!orderData.fullName || !orderData.address || !orderData.email) {
      throw new AppError("Missing required fields: fullName, address, and email are required", 400);
    }

    if (!orderData.products || orderData.products.length === 0) {
      throw new AppError("Order must contain at least one product", 400);
    }

    // Add timestamp
    orderData.createdAt = new Date().toISOString();

    // Save to Elasticsearch
    const result = await elasticsearchClient.index({
      index: getIndexName(),
      document: orderData,
      refresh: "true", // Make the document immediately searchable
    });

    logger.info("Order created successfully", {
      orderId: result._id,
      email: orderData.email,
      totalAmount: orderData.totalAmount,
    });

    return {
      orderId: result._id,
      order: orderData,
    };
  }

  /**
   * Get all orders
   */
  async getAllOrders(): Promise<{ total: any; orders: any[] }> {
    const result = await elasticsearchClient.search({
      index: getIndexName(),
      body: {
        query: {
          match_all: {},
        },
        sort: [
          {
            createdAt: {
              order: "desc",
            },
          },
        ],
      },
    });

    const orders = result.hits.hits.map((hit: any) => ({
      id: hit._id,
      ...hit._source,
    }));

    logger.info("Orders fetched", { count: orders.length });

    return {
      total: result.hits.total,
      orders,
    };
  }

  /**
   * Get order by ID
   */
  async getOrderById(id: string): Promise<any> {
    try {
      const result = await elasticsearchClient.get({
        index: getIndexName(),
        id,
      });

      logger.info("Order fetched by ID", { orderId: id });

      return {
        id: result._id,
        ...(result._source as Order),
      };
    } catch (error: any) {
      if (error.meta?.statusCode === 404) {
        throw new AppError("Order not found", 404);
      }
      throw error;
    }
  }

  /**
   * Search orders by email
   */
  async searchOrdersByEmail(email: string): Promise<{ total: any; orders: any[] }> {
    const result = await elasticsearchClient.search({
      index: getIndexName(),
      body: {
        query: {
          term: {
            email: email,
          },
        },
        sort: [
          {
            createdAt: {
              order: "desc",
            },
          },
        ],
      },
    });

    const orders = result.hits.hits.map((hit: any) => ({
      id: hit._id,
      ...hit._source,
    }));

    logger.info("Orders searched by email", { email, count: orders.length });

    return {
      total: result.hits.total,
      orders,
    };
  }
}

export default new OrderService();
