import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Alert } from "@mui/material";
import { RootState, AppDispatch } from "../store/store";
import { fetchCategories, fetchProductsByCategory } from "../store/productsSlice";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { styles } from "./ShoppingListScreen.styles.ts";
import { SHOPPING_LIST } from "../Common/CommonConstants";
import { CategoriesSection } from "../Pages/ShoppingList/CategoriesSection";
import { ProductsSection } from "../Pages/ShoppingList/ProductsSection";
import { CartModal } from "../Pages/ShoppingList/CartModal";
import { DeleteConfirmDialog } from "../Pages/ShoppingList/DeleteConfirmDialog";
import { FloatingCartButton } from "../Pages/ShoppingList/FloatingCartButton";
import { FlyingAnimation } from "../Pages/ShoppingList/FlyingAnimation";

function ShoppingListScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { categories, products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );
  const { items: cartItems } = useSelector((state: RootState) => state.cart);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [inputQuantities, setInputQuantities] = useState<{ [key: number]: number }>({});
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [flyingItem, setFlyingItem] = useState<{
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);
  const [animateFlying, setAnimateFlying] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    dispatch(fetchProductsByCategory(categoryId));
    setInputQuantities({});
  };

  const handleQuantityChange = (productId: number, value: string) => {
    const quantity = parseInt(value) || 0;
    setInputQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };

  const handleAddToCart = (productId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const product = products.find((p) => p.id === productId);
    const inputQty = inputQuantities[productId] || 1;

    if (product && inputQty > 0) {
      // Get button position for animation start
      const buttonRect = event.currentTarget.getBoundingClientRect();
      const startX = buttonRect.left + buttonRect.width / 2;
      const startY = buttonRect.top + buttonRect.height / 2;

      // Cart icon is fixed at top: 16px, left: 16px (plus half the FAB size ~28px)
      const endX = 16 + 28;
      const endY = 16 + 28;

      setFlyingItem({
        id: productId,
        startX,
        startY,
        endX,
        endY,
      });
      setAnimateFlying(false);

      // Start animation after a brief delay
      setTimeout(() => setAnimateFlying(true), 10);

      // Clear animation after it completes
      setTimeout(() => {
        setFlyingItem(null);
        setAnimateFlying(false);
      }, 1600);

      // Add to cart (handles both new items and incrementing existing items)
      const category = categories.find((c) => c.id === product.categoryId);
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: inputQty,
          categoryName: category?.name || "",
        }),
      );

      // Input field stays the same - don't update it
      // The cart quantity will increase, but the input remains unchanged
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    setProductToDelete(productId);
    setDeleteConfirmOpen(true);
  };

  const confirmRemoveFromCart = () => {
    if (productToDelete !== null) {
      dispatch(removeFromCart(productToDelete));
      setInputQuantities((prev) => ({ ...prev, [productToDelete]: 0 }));
    }
    setDeleteConfirmOpen(false);
    setProductToDelete(null);
  };

  const cancelRemoveFromCart = () => {
    setDeleteConfirmOpen(false);
    setProductToDelete(null);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={styles.mainTitle}>
        {SHOPPING_LIST}
      </Typography>

      {error && (
        <Alert severity="error" sx={styles.errorAlert}>
          {error}
        </Alert>
      )}

      {/* Categories Section */}
      <CategoriesSection
        categories={categories}
        loading={loading}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        styles={styles}
      />

      {/* Products Section */}
      {selectedCategory && (
        <ProductsSection
          products={products}
          loading={loading}
          inputQuantities={inputQuantities}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCart}
          styles={styles}
        />
      )}

      {/* Floating Cart Button */}
      <FloatingCartButton totalItems={getTotalItems()} onClick={() => setCartModalOpen(true)} />

      {/* Cart Modal */}
      <CartModal
        open={cartModalOpen}
        cartItems={cartItems}
        onClose={() => setCartModalOpen(false)}
        onRemoveFromCart={handleRemoveFromCart}
        onContinueToOrder={() => {
          setCartModalOpen(false);
          navigate("/order-summary");
        }}
        getTotalItems={getTotalItems}
        getTotalPrice={getTotalPrice}
        styles={styles}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteConfirmOpen}
        onConfirm={confirmRemoveFromCart}
        onCancel={cancelRemoveFromCart}
      />

      {/* Flying Animation */}
      {flyingItem && (
        <FlyingAnimation
          startX={flyingItem.startX}
          startY={flyingItem.startY}
          endX={flyingItem.endX}
          endY={flyingItem.endY}
          isAnimating={animateFlying}
          styles={styles}
        />
      )}
    </Box>
  );
}

export default ShoppingListScreen;
