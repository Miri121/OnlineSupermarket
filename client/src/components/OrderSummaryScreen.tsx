import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { nodeHttpClient } from "../api/axios";
import { RootState, AppDispatch } from "../store/store";
import { clearCart } from "../store/cartSlice";
import { styles } from "./OrderSummaryScreen.styles";
import {
  REQUIRED_FIELD,
  INVALID_EMAIL_FORMAT,
  FULL_NAME,
  ADDRESS,
  EMAIL,
  EMPTY_CART,
  EMPTY_CART_MESSAGE,
  BACK_TO_SHOPPING,
  ORDER_SUBMISSION_FAILED,
  ORDER_SENT_SUCCESSFULLY,
  ORDER_THANK_YOU,
  ORDER_SUMMARY,
  ORDER_ITEMS,
  CUSTOMER_DETAILS,
  CONFIRM_ORDER,
  SENDING,
  PRODUCT,
  CATEGORY,
  PRICE,
  QUANTITY,
  TOTAL,
} from "../Common/CommonConstants";

function OrderSummaryScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items: cartItems } = useSelector((state: RootState) => state.cart);

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = REQUIRED_FIELD;
    }

    if (!formData.address.trim()) {
      newErrors.address = REQUIRED_FIELD;
    }

    if (!formData.email.trim()) {
      newErrors.email = REQUIRED_FIELD;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = INVALID_EMAIL_FORMAT;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage(EMPTY_CART);
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const orderData = {
        fullName: formData.fullName,
        address: formData.address,
        email: formData.email,
        products: cartItems.map((item) => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          categoryName: item.categoryName,
        })),
        totalAmount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        orderDate: new Date().toISOString(),
      };

      await nodeHttpClient.post("/orders", orderData);

      setSuccess(true);
      dispatch(clearCart());

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setErrorMessage(ORDER_SUBMISSION_FAILED);
      console.error("Order submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  if (cartItems.length === 0 && !success) {
    return (
      <Box>
        <Alert severity='warning' sx={styles.emptyCartAlert}>
          {EMPTY_CART_MESSAGE}
        </Alert>
        <Button
          variant='contained'
          startIcon={<ArrowForwardIcon />}
          onClick={() => navigate("/")}
          sx={styles.backButton}
        >
          {BACK_TO_SHOPPING}
        </Button>
      </Box>
    );
  }

  if (success) {
    return (
      <Box sx={styles.successBox}>
        <CheckCircleIcon color='success' sx={styles.successIcon} />
        <Typography variant='h4' gutterBottom>
          {ORDER_SENT_SUCCESSFULLY}
        </Typography>
        <Typography variant='body1' color='text.secondary' gutterBottom>
          {ORDER_THANK_YOU}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        {ORDER_SUMMARY}
      </Typography>

      <Button
        variant='outlined'
        startIcon={<ArrowForwardIcon />}
        onClick={() => navigate("/")}
        sx={styles.backButtonWithMargin}
      >
        {BACK_TO_SHOPPING}
      </Button>

      {errorMessage && (
        <Alert severity='error' sx={styles.errorAlert}>
          {errorMessage}
        </Alert>
      )}

      {/* Order Items */}
      <Paper elevation={2} sx={styles.orderItemsPaper}>
        <Typography variant='h5' gutterBottom>
          {ORDER_ITEMS}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{PRODUCT}</TableCell>
                <TableCell>{CATEGORY}</TableCell>
                <TableCell align='right'>{PRICE}</TableCell>
                <TableCell align='right'>{QUANTITY}</TableCell>
                <TableCell align='right'>{TOTAL}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.categoryName}</TableCell>
                  <TableCell align='right'>₪{item.price.toFixed(2)}</TableCell>
                  <TableCell align='right'>{item.quantity}</TableCell>
                  <TableCell align='right'>₪{(item.price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} align='right'>
                  <Typography variant='h6'>{TOTAL}:</Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='h6'>₪{getTotalPrice()}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Customer Information Form */}
      <Paper elevation={2} sx={styles.customerInfoPaper}>
        <Typography variant='h5' gutterBottom>
          {CUSTOMER_DETAILS}
        </Typography>
        <Divider sx={styles.divider} />
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={FULL_NAME}
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            error={!!errors.fullName}
            helperText={errors.fullName}
            sx={styles.textField}
          />
          <TextField
            fullWidth
            label={ADDRESS}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            error={!!errors.address}
            helperText={errors.address}
            multiline
            rows={2}
            sx={styles.textField}
          />
          <TextField
            fullWidth
            label={EMAIL}
            type='email'
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
            sx={styles.emailField}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            fullWidth
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={20} /> : <CheckCircleIcon />}
            sx={styles.submitButton}
          >
            {submitting ? SENDING : CONFIRM_ORDER}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default OrderSummaryScreen;
