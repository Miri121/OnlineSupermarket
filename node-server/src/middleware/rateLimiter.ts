import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

/**
 * General rate limiter for all API endpoints
 * Limits each IP to 100 requests per 15 minutes
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many requests from this IP, please try again after 15 minutes.",
      retryAfter: res.getHeader("RateLimit-Reset"),
    });
  },
});

/**
 * Strict rate limiter for order creation endpoints
 * Limits each IP to 10 order submissions per hour
 */
export const orderCreationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: {
    success: false,
    message: "Too many orders submitted from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "You have exceeded the order submission limit. Please try again after 1 hour.",
      retryAfter: res.getHeader("RateLimit-Reset"),
    });
  },
});

/**
 * More lenient rate limiter for read operations (GET requests)
 * Limits each IP to 200 requests per 15 minutes
 */
export const readLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: "Too many read requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req: Request) => {
    // Only apply to GET requests
    return req.method !== "GET";
  },
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many requests from this IP, please slow down.",
      retryAfter: res.getHeader("RateLimit-Reset"),
    });
  },
});
