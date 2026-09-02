import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";
import { IProduct } from "../../Interfaces";
import { PRODUCTS, QUANTITY, ADD_TO_CART } from "../../Common/CommonConstants";

interface ProductsSectionProps {
  products: IProduct[];
  loading: boolean;
  inputQuantities: { [key: number]: number };
  onQuantityChange: (productId: number, value: string) => void;
  onAddToCart: (productId: number, event: React.MouseEvent<HTMLButtonElement>) => void;
  styles: any;
}

export function ProductsSection({
  products,
  loading,
  inputQuantities,
  onQuantityChange,
  onAddToCart,
  styles,
}: ProductsSectionProps) {
  return (
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
                      onChange={(e) => onQuantityChange(product.id, e.target.value)}
                      inputProps={{ min: 1 }}
                      sx={styles.quantityField}
                    />
                    <Button
                      variant='contained'
                      onClick={(e) => onAddToCart(product.id, e)}
                      disabled={!inputQuantities[product.id] || inputQuantities[product.id] <= 0}
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
  );
}
