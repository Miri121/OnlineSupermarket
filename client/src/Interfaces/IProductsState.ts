import { ICategory } from "./ICategory";
import { IProduct } from "./IProduct";

// Products state interface
export interface IProductsState {
  categories: ICategory[];
  products: IProduct[];
  loading: boolean;
  error: string | null;
}
