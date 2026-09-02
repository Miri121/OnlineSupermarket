import { Request, Response, NextFunction } from "express";
import mongoSanitize from "express-mongo-sanitize";
import { body, validationResult, ValidationChain } from "express-validator";

/**
 * Sanitizes MongoDB query operators from user input
 * Prevents NoSQL injection attacks
 */
export const sanitizeInput = mongoSanitize({
  replaceWith: "_",
  onSanitize: ({ req, key }) => {
    console.warn(`Sanitized input detected in request: ${key}`);
  },
});

/**
 * Validates and sanitizes request body to prevent XSS and injection attacks
 */
export const validateOrderInput = [
  body("fullName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Customer name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Customer name must be between 2 and 100 characters")
    .matches(/^[a-zA-Z\s\u0590-\u05FF]+$/)
    .withMessage("Customer name can only contain letters and spaces"),

  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Valid email is required")
    .isLength({ max: 255 })
    .withMessage("Email must not exceed 255 characters"),

  body("address")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Customer address is required")
    .isLength({ min: 5, max: 300 })
    .withMessage("Address must be between 5 and 300 characters"),

  body("products").isArray({ min: 1 }).withMessage("Order must contain at least one product"),

  body("products.*.productId")
    .isInt({ min: 1 })
    .withMessage("Product ID must be a positive integer"),

  body("products.*.productName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ max: 200 })
    .withMessage("Product name must not exceed 200 characters"),

  body("products.*.quantity")
    .isInt({ min: 1, max: 1000 })
    .withMessage("Quantity must be between 1 and 1000"),

  body("products.*.price")
    .isFloat({ min: 0, max: 1000000 })
    .withMessage("Price must be a valid positive number"),

  body("products.*.categoryName")
    .optional()
    .trim()
    .escape()
    .isLength({ max: 100 })
    .withMessage("Category name must not exceed 100 characters"),

  body("totalAmount")
    .isFloat({ min: 0, max: 10000000 })
    .withMessage("Total amount must be a valid positive number"),

  body("orderDate").optional().isISO8601().withMessage("Order date must be a valid ISO 8601 date"),

  // Middleware to check validation results
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

/**
 * Additional body size limit to prevent payload attacks
 * This should be used with express.json({ limit: '10kb' })
 */
export const validateContentLength = (req: Request, res: Response, next: NextFunction) => {
  const contentLength = req.get("content-length");
  const maxSize = 100 * 1024; // 100KB

  if (contentLength && parseInt(contentLength) > maxSize) {
    return res.status(413).json({
      success: false,
      message: "Request payload too large",
    });
  }

  next();
};

