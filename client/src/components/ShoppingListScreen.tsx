import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Alert,
  CircularProgress,
  Chip,
  Divider,
  Paper,
  IconButton,
  Tooltip,
  Badge,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { RootState, AppDispatch } from "../store/store";
import { fetchCategories, fetchProductsByCategory } from "../store/productsSlice";
import { addToCart, updateQuantity, removeFromCart } from "../store/cartSlice";
import { styles } from "./ShoppingListScreen.styles";
import {
  SHOPPING_LIST,
  CATEGORIES,
  PRODUCTS,
  QUANTITY,
  ADD_TO_CART,
  SHOPPING_CART,
  REMOVE_PRODUCT,
  TOTAL,
  CLOSE,
  CONTINUE_TO_ORDER,
  ITEMS,
} from "../Common/CommonConstants";

function ShoppingListScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { categories, products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );
  const { items: cartItems } = useSelector((state: RootState) => state.cart);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [flyingItem, setFlyingItem] = useState<{
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);
  const [animateFlying, setAnimateFlying] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    dispatch(fetchProductsByCategory(categoryId));
    setQuantities({});
  };

  const handleQuantityChange = (productId: number, value: string) => {
    const quantity = parseInt(value) || 0;
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };

  const handleAddToCart = (productId: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const product = products.find((p) => p.id === productId);
    const quantity = quantities[productId] || 1;

    if (product && quantity > 0) {
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
      }, 1100);

      const existingItem = cartItems.find((item) => item.id === productId);

      if (existingItem) {
        // Update existing item quantity
        dispatch(updateQuantity({ id: productId, quantity }));
      } else {
        // Add new item to cart
        const category = categories.find((c) => c.id === product.categoryId);
        dispatch(
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            categoryName: category?.name || "",
          }),
        );
      }
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
    setQuantities((prev) => ({ ...prev, [productId]: 0 }));
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Box>
      <Typography variant='h4' gutterBottom sx={styles.mainTitle}>
        {SHOPPING_LIST}
      </Typography>

      {error && (
        <Alert severity='error' sx={styles.errorAlert}>
          {error}
        </Alert>
      )}

      {/* Categories Section */}
      <Paper elevation={2} sx={styles.categoriesPaper}>
        <Typography variant='h5' gutterBottom sx={styles.sectionTitle}>
          {CATEGORIES}
        </Typography>
        {loading && !categories.length ? (
          <CircularProgress />
        ) : (
          <Box sx={styles.categoriesBox}>
            {categories.map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                onClick={() => handleCategorySelect(category.id)}
                color={selectedCategory === category.id ? "primary" : "default"}
                variant={selectedCategory === category.id ? "filled" : "outlined"}
                sx={styles.categoryChip}
              />
            ))}
          </Box>
        )}
      </Paper>

      {/* Products Section */}
      {selectedCategory && (
        <Paper elevation={2} sx={styles.productsPaper}>
          <Typography variant='h5' gutterBottom sx={styles.sectionTitle}>
            {PRODUCTS}
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card>
                    <CardContent>
                      <Typography variant='h6' gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography color='text.secondary' gutterBottom>
                        {product.description}
                      </Typography>
                      <Typography variant='h6' color='primary' gutterBottom>
                        ₪{product.price.toFixed(2)}
                      </Typography>
                      <Box sx={styles.productBox}>
                        <TextField
                          type='number'
                          label={QUANTITY}
                          size='small'
                          value={quantities[product.id] || ""}
                          onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                          inputProps={{ min: 1 }}
                          sx={styles.quantityField}
                        />
                        <Button
                          variant='contained'
                          onClick={(e) => handleAddToCart(product.id, e)}
                          disabled={!quantities[product.id] || quantities[product.id] <= 0}
                          fullWidth
                        >
                          {ADD_TO_CART}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      )}

      {/* Floating Cart Button */}
      <Tooltip title={SHOPPING_CART} arrow>
        <Fab
          color='primary'
          aria-label='cart'
          sx={{ position: "fixed", top: 16, left: 16 }}
          onClick={() => setCartModalOpen(true)}
        >
          <Badge badgeContent={getTotalItems()} color='error'>
            <ShoppingCartIcon />
          </Badge>
        </Fab>
      </Tooltip>

      {/* Cart Modal */}
      <Dialog
        open={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        maxWidth='sm'
        fullWidth
        sx={styles.cartModal}
      >
        <DialogTitle sx={styles.cartModalTitle}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant='h6'>{SHOPPING_CART}</Typography>
            <IconButton
              edge='end'
              color='inherit'
              onClick={() => setCartModalOpen(false)}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={styles.cartModalContent}>
          <Divider sx={{ mb: 2 }} />
          {cartItems.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography>
                  {item.name} - {QUANTITY}: {item.quantity} - ₪
                  {(item.price * item.quantity).toFixed(2)}
                </Typography>
                <Tooltip title={REMOVE_PRODUCT} arrow>
                  <IconButton
                    size='small'
                    color='error'
                    onClick={() => handleRemoveFromCart(item.id)}
                    aria-label={REMOVE_PRODUCT}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Typography variant='h6'>
            {TOTAL}: {getTotalItems()} {ITEMS} - ₪{getTotalPrice()}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCartModalOpen(false)}>{CLOSE}</Button>
          <Button
            variant='contained'
            color='primary'
            startIcon={<ShoppingCartIcon />}
            disabled={cartItems.length === 0}
            onClick={() => {
              setCartModalOpen(false);
              navigate("/order-summary");
            }}
          >
            {CONTINUE_TO_ORDER}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Flying Animation */}
      {flyingItem && (
        <Box
          sx={{
            ...(animateFlying ? styles.flyingItemAnimated : styles.flyingItemInitial),
            left: animateFlying ? flyingItem.endX : flyingItem.startX,
            top: animateFlying ? flyingItem.endY : flyingItem.startY,
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 40, color: "primary.main" }} />
        </Box>
      )}
    </Box>
  );
}

export default ShoppingListScreen;
