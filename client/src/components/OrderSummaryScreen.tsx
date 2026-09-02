import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, Button, Alert } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { nodeHttpClient } from "../api/axios";
import { RootState, AppDispatch } from "../store/store";
import { clearCart } from "../store/cartSlice";
import { styles } from "./OrderSummaryScreen.styles.ts";
import {
  EMPTY_CART,
  ORDER_SUBMISSION_FAILED,
  ORDER_SUMMARY,
  BACK_TO_SHOPPING,
} from "../Common/CommonConstants";
import { IFormData } from "../Interfaces";
import { orderFormValidationSchema } from "../Utils/yupValidations";
import { EmptyCartView } from "../Pages/OrderSummary/EmptyCartView";
import { OrderSuccessView } from "../Pages/OrderSummary/OrderSuccessView";
import { OrderItemsTable } from "../Pages/OrderSummary/OrderItemsTable";
import { CustomerDetailsForm } from "../Pages/OrderSummary/CustomerDetailsForm";

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
    return <EmptyCartView onBackToShopping={() => navigate("/")} styles={styles} />;
  }

  if (success) {
    return <OrderSuccessView styles={styles} />;
  }

  return (
    <Box>
      <Typography
        variant="h4"
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
        variant="outlined"
        startIcon={<ArrowForwardIcon />}
        onClick={() => navigate("/")}
        sx={styles.backButtonWithMargin}
      >
        {BACK_TO_SHOPPING}
      </Button>

      {errorMessage && (
        <Alert severity="error" sx={styles.errorAlert}>
          {errorMessage}
        </Alert>
      )}

      {/* Order Items */}
      <OrderItemsTable cartItems={cartItems} getTotalPrice={getTotalPrice} styles={styles} />

      {/* Customer Information Form */}
      <CustomerDetailsForm
        control={control}
        errors={errors}
        submitting={submitting}
        onSubmit={handleSubmit(onSubmit)}
        styles={styles}
      />
    </Box>
  );
}

export default OrderSummaryScreen;
