import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { ICartItem } from "../../Interfaces";
import {
  SHOPPING_CART,
  REMOVE_PRODUCT,
  QUANTITY,
  TOTAL,
  ITEMS,
  CLOSE,
  CONTINUE_TO_ORDER,
} from "../../Common/CommonConstants";

interface CartModalProps {
  open: boolean;
  cartItems: ICartItem[];
  onClose: () => void;
  onRemoveFromCart: (productId: number) => void;
  onContinueToOrder: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => string;
  styles: any;
}

export function CartModal({
  open,
  cartItems,
  onClose,
  onRemoveFromCart,
  onContinueToOrder,
  getTotalItems,
  getTotalPrice,
  styles,
}: CartModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth sx={styles.cartModal}>
      <DialogTitle sx={styles.cartModalTitle}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant='h6'>{SHOPPING_CART}</Typography>
          <IconButton edge='end' color='inherit' onClick={onClose} aria-label='close'>
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
                  onClick={() => onRemoveFromCart(item.id)}
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
        <Button onClick={onClose}>{CLOSE}</Button>
        <Button
          variant='contained'
          startIcon={<ShoppingCartIcon />}
          disabled={cartItems.length === 0}
          onClick={onContinueToOrder}
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
  );
}
