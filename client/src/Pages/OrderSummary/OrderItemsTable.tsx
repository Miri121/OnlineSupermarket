import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { ICartItem } from "../../Interfaces";
import {
  ORDER_ITEMS,
  PRODUCT,
  CATEGORY,
  PRICE,
  QUANTITY,
  TOTAL,
} from "../../Common/CommonConstants";

interface OrderItemsTableProps {
  cartItems: ICartItem[];
  getTotalPrice: () => string;
  styles: any;
}

export function OrderItemsTable({ cartItems, getTotalPrice, styles }: OrderItemsTableProps) {
  return (
    <Paper elevation={2} sx={styles.orderItemsPaper}>
      <Typography
        variant="h5"
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
              <TableCell align="right" sx={{ fontSize: "1.1rem", fontWeight: 600 }}>
                {PRICE}
              </TableCell>
              <TableCell align="right" sx={{ fontSize: "1.1rem", fontWeight: 600 }}>
                {QUANTITY}
              </TableCell>
              <TableCell align="right" sx={{ fontSize: "1.1rem", fontWeight: 600 }}>
                {TOTAL}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ fontSize: "1rem" }}>{item.name}</TableCell>
                <TableCell sx={{ fontSize: "1rem" }}>{item.categoryName}</TableCell>
                <TableCell align="right" sx={{ fontSize: "1rem" }}>
                  ₪{item.price.toFixed(2)}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: "1rem" }}>
                  {item.quantity}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: "1rem" }}>
                  ₪{(item.price * item.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right">
                <Typography variant="h6">{TOTAL}:</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography
                  variant="h6"
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
  );
}
