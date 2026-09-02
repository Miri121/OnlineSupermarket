import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  Fade,
  Zoom,
  Slide,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { nodeHttpClient } from "../api/axios";
import { RootState, AppDispatch } from "../store/store";
import { clearCart } from "../store/cartSlice";
import { styles } from "./OrderSummaryScreen.styles.ts";
import {
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
import { IFormData } from "../Interfaces";
import { orderFormValidationSchema } from "../Utils/yupValidations";

function OrderSummaryScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items: cartItems } = useSelector((state: RootState) => state.cart);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // React Hook Form setup with Yup validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(orderFormValidationSchema),
    defaultValues: {
      fullName: "",
      address: "",
      email: "",
    },
  });

  const onSubmit = async (formData: IFormData) => {
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
      }, 6000);
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
          sx={{
            ...styles.backButton,
            backgroundColor: "#667eea",
            color: "white",
            "&:hover": {
              backgroundColor: "#5568d3",
            },
          }}
        >
          {BACK_TO_SHOPPING}
        </Button>
      </Box>
    );
  }

  if (success) {
    return (
      <Box sx={styles.luxurySuccessContainer}>
        <Fade in={true} timeout={800}>
          <Paper elevation={0} sx={styles.luxurySuccessPaper}>
            {/* Success Icon with Animation */}
            <Zoom in={true} timeout={1000}>
              <Box sx={styles.iconWrapper}>
                <CheckCircleIcon sx={styles.luxurySuccessIcon} />
              </Box>
            </Zoom>

            {/* Main Success Message */}
            <Slide direction='up' in={true} timeout={800}>
              <Box>
                <Typography variant='h3' sx={styles.luxuryTitle}>
                  {ORDER_SENT_SUCCESSFULLY}
                </Typography>
              </Box>
            </Slide>

            {/* Thank You Message */}
            <Fade in={true} timeout={1000} style={{ transitionDelay: "400ms" }}>
              <Typography variant='h6' sx={styles.luxurySubtitle}>
                {ORDER_THANK_YOU}
              </Typography>
            </Fade>

            {/* Shipping Icon */}
            <Fade in={true} timeout={1000} style={{ transitionDelay: "600ms" }}>
              <Box sx={styles.shippingIconContainer}>
                <LocalShippingIcon sx={styles.shippingIcon} />
                <Typography variant='body2' sx={styles.shippingText}>
                  ההזמנה שלך בדרך אליך
                </Typography>
              </Box>
            </Fade>

            {/* Decorative Border */}
            <Box sx={styles.decorativeBorder} />
          </Paper>
        </Fade>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant='h4'
        gutterBottom
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontWeight: 600,
        }}
      >
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
        <Typography
          variant='h5'
          gutterBottom
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 600,
          }}
        >
          {ORDER_ITEMS}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "1.1rem", fontWeight: 600 }}>{PRODUCT}</TableCell>
                <TableCell sx={{ fontSize: "1.1rem", fontWeight: 600 }}>{CATEGORY}</TableCell>
                <TableCell align='right' sx={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  {PRICE}
                </TableCell>
                <TableCell align='right' sx={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  {QUANTITY}
                </TableCell>
                <TableCell align='right' sx={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  {TOTAL}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ fontSize: "1rem" }}>{item.name}</TableCell>
                  <TableCell sx={{ fontSize: "1rem" }}>{item.categoryName}</TableCell>
                  <TableCell align='right' sx={{ fontSize: "1rem" }}>
                    ₪{item.price.toFixed(2)}
                  </TableCell>
                  <TableCell align='right' sx={{ fontSize: "1rem" }}>
                    {item.quantity}
                  </TableCell>
                  <TableCell align='right' sx={{ fontSize: "1rem" }}>
                    ₪{(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} align='right'>
                  <Typography variant='h6'>{TOTAL}:</Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography
                    variant='h6'
                    sx={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 600,
                    }}
                  >
                    ₪{getTotalPrice()}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Customer Information Form */}
      <Paper elevation={2} sx={styles.customerInfoPaper}>
        <Typography
          variant='h5'
          gutterBottom
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 600,
          }}
        >
          {CUSTOMER_DETAILS}
        </Typography>
        <Divider sx={styles.divider} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='fullName'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={FULL_NAME}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                sx={styles.textField}
              />
            )}
          />
          <Controller
            name='address'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={ADDRESS}
                error={!!errors.address}
                helperText={errors.address?.message}
                sx={styles.textField}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={EMAIL}
                type='email'
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={styles.emailField}
              />
            )}
          />
          <Button
            type='submit'
            variant='contained'
            size='large'
            fullWidth
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={20} /> : <CheckCircleIcon />}
            sx={{
              ...styles.submitButton,
              backgroundColor: "#667eea",
              color: "white",
              "&:hover": {
                backgroundColor: "#5568d3",
              },
            }}
          >
            {submitting ? SENDING : CONFIRM_ORDER}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default OrderSummaryScreen;
