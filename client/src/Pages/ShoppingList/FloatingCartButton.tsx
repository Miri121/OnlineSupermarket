import { Fab, Tooltip, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SHOPPING_CART } from "../../Common/CommonConstants";

interface FloatingCartButtonProps {
  totalItems: number;
  onClick: () => void;
}

export function FloatingCartButton({ totalItems, onClick }: FloatingCartButtonProps) {
  return (
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
        onClick={onClick}
      >
        <Badge badgeContent={totalItems} color='error'>
          <ShoppingCartIcon />
        </Badge>
      </Fab>
    </Tooltip>
  );
}
