export interface OrderProduct {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  categoryName: string;
}

export interface Order {
  fullName: string;
  address: string;
  email: string;
  products: OrderProduct[];
  totalAmount: number;
  orderDate: string;
  createdAt?: string;
}
