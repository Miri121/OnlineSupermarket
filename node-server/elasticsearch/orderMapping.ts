import { estypes } from "@elastic/elasticsearch";

export const orderMapping: estypes.MappingTypeMapping = {
  properties: {
    fullName: {
      type: "text",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
      },
    },
    address: {
      type: "text",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
      },
    },
    email: {
      type: "keyword",
    },
    products: {
      type: "nested",
      properties: {
        productId: {
          type: "integer",
        },
        productName: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
              ignore_above: 256,
            },
          },
        },
        quantity: {
          type: "integer",
        },
        price: {
          type: "scaled_float",
          scaling_factor: 100,
        },
        categoryName: {
          type: "keyword",
        },
      },
    },
    totalAmount: {
      type: "scaled_float",
      scaling_factor: 100,
    },
    orderDate: {
      type: "date",
    },
    createdAt: {
      type: "date",
    },
  },
};
