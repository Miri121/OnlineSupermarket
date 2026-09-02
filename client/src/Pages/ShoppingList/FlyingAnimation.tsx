import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface FlyingAnimationProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isAnimating: boolean;
  styles: any;
}

export function FlyingAnimation({
  startX,
  startY,
  endX,
  endY,
  isAnimating,
  styles,
}: FlyingAnimationProps) {
  return (
    <Box
      sx={{
        ...(isAnimating ? styles.flyingItemAnimated : styles.flyingItemInitial),
        left: isAnimating ? endX : startX,
        top: isAnimating ? endY : startY,
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
  );
}
