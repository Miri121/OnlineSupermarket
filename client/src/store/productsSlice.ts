import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../api/axios";
import { IProductsState } from "../Interfaces";

const initialState: IProductsState = {
  categories: [],
  products: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  const response = await httpClient.get("/categories");
  return response.data;
});

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (categoryId: number) => {
    const response = await httpClient.get(`/products/category/${categoryId}`);
    return response.data;
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productsSlice.reducer;
