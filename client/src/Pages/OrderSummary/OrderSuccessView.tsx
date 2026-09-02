import { Box, Paper, Typography, Fade, Zoom, Slide } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { ORDER_SENT_SUCCESSFULLY, ORDER_THANK_YOU } from "../../Common/CommonConstants";

interface OrderSuccessViewProps {
  styles: any;
}

export function OrderSuccessView({ styles }: OrderSuccessViewProps) {
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
