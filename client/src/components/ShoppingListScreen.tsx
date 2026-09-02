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
import AddIcon from "@mui/icons-material/Add";
import { RootState, AppDispatch } from "../store/store";
import { fetchCategories, fetchProductsByCategory } from "../store/productsSlice";
import { addToCart, removeFromCart } from "../store/cartSlice";
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
    dispatch(removeFromCart(productId));
    setInputQuantities((prev) => ({ ...prev, [productId]: 0 }));
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
                variant={selectedCategory === category.id ? "filled" : "outlined"}
                sx={{
                  ...styles.categoryChip,
                  ...(selectedCategory === category.id && {
                    backgroundColor: "#667eea",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#5568d3",
                    },
                  }),
                  ...(selectedCategory !== category.id && {
                    borderColor: "#667eea",
                    color: "#667eea",
                    "&:hover": {
                      borderColor: "#764ba2",
                      backgroundColor: "rgba(102, 126, 234, 0.08)",
                    },
                  }),
                }}
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
                      <Typography
                        variant='h6'
                        gutterBottom
                        sx={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          fontWeight: 600,
                        }}
                      >
                        ₪{product.price.toFixed(2)}
                      </Typography>
                      <Box sx={styles.productBox}>
                        <TextField
                          type='number'
                          label={QUANTITY}
                          size='small'
                          value={inputQuantities[product.id] || ""}
                          onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                          inputProps={{ min: 1 }}
                          sx={styles.quantityField}
                        />
                        <Button
                          variant='contained'
                          onClick={(e) => handleAddToCart(product.id, e)}
                          disabled={
                            !inputQuantities[product.id] || inputQuantities[product.id] <= 0
                          }
                          fullWidth
                          sx={{
                            backgroundColor: "#667eea",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#5568d3",
                            },
                          }}
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
          aria-label='cart'
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            backgroundColor: "#8a5ec4",
            color: "white",
            "&:hover": {
              backgroundColor: "#764ba2",
            },
          }}
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
            startIcon={<ShoppingCartIcon />}
            disabled={cartItems.length === 0}
            onClick={() => {
              setCartModalOpen(false);
              navigate("/order-summary");
            }}
            sx={{
              backgroundColor: "#667eea",
              color: "white",
              "&:hover": {
                backgroundColor: "#5568d3",
              },
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
          <AddIcon
            sx={{
              fontSize: 56,
              color: "#C0C0C0",
              filter:
                "drop-shadow(0 0 10px rgba(192, 192, 192, 0.9)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.6))",
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default ShoppingListScreen;
