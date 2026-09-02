import { Box, Alert, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { EMPTY_CART_MESSAGE, BACK_TO_SHOPPING } from "../../Common/CommonConstants";

interface EmptyCartViewProps {
  onBackToShopping: () => void;
  styles: any;
}

export function EmptyCartView({ onBackToShopping, styles }: EmptyCartViewProps) {
  return (
    <Box>
      <Alert severity='warning' sx={styles.emptyCartAlert}>
        {EMPTY_CART_MESSAGE}
      </Alert>
      <Button
        variant='contained'
        startIcon={<ArrowForwardIcon />}
        onClick={onBackToShopping}
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
