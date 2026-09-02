export const styles = {
  emptyCartAlert: { mb: 2 },
  backButton: { "& .MuiButton-startIcon": { marginLeft: 1 } },
  backButtonWithMargin: { mb: 3, "& .MuiButton-startIcon": { marginLeft: 1 } },
  successBox: { textAlign: "center", py: 5 },
  successIcon: { fontSize: 80, mb: 2 },
  errorAlert: { mb: 2 },
  orderItemsPaper: { p: 3, mb: 3 },
  customerInfoPaper: { p: 3 },
  divider: { mb: 3 },
  textField: {
    mb: 2,
    "& .MuiInputBase-input": {
      textAlign: "right",
      direction: "rtl",
    },
  },
  emailField: {
    mb: 3,
    "& .MuiInputBase-input": {
      textAlign: "right",
      direction: "rtl",
    },
  },
  submitButton: {
    "& .MuiButton-startIcon": { marginLeft: 1 },
  },

  // Luxury Success Page Styles
  luxurySuccessContainer: {
    minHeight: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: 3,
    position: "relative",
    overflow: "hidden",
    padding: "40px 20px",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
      animation: "shimmer 3s ease-in-out infinite",
    },
    "@keyframes shimmer": {
      "0%, 100%": { opacity: 0.5 },
      "50%": { opacity: 1 },
    },
  },

  luxurySuccessPaper: {
    background:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)",
    backdropFilter: "blur(20px)",
    borderRadius: 4,
    padding: "60px 40px",
    maxWidth: 600,
    width: "90%",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 30px 90px rgba(0, 0, 0, 0.3), 0 0 80px rgba(255, 215, 0, 0.2)",
    border: "2px solid rgba(255, 215, 0, 0.3)",
    overflow: "visible",
  },

  starsContainer: {
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    gap: 2,
    zIndex: 10,
  },

  star1: {
    fontSize: 35,
    color: "#FFD700",
    filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))",
    animation: "twinkle 2s ease-in-out infinite",
    "@keyframes twinkle": {
      "0%, 100%": { opacity: 1, transform: "scale(1)" },
      "50%": { opacity: 0.5, transform: "scale(0.8)" },
    },
  },

  star2: {
    fontSize: 45,
    color: "#FFD700",
    filter: "drop-shadow(0 0 12px rgba(255, 215, 0, 0.9))",
    animation: "twinkle 2s ease-in-out infinite 0.3s",
    "@keyframes twinkle": {
      "0%, 100%": { opacity: 1, transform: "scale(1)" },
      "50%": { opacity: 0.5, transform: "scale(0.8)" },
    },
  },

  star3: {
    fontSize: 35,
    color: "#FFD700",
    filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))",
    animation: "twinkle 2s ease-in-out infinite 0.6s",
    "@keyframes twinkle": {
      "0%, 100%": { opacity: 1, transform: "scale(1)" },
      "50%": { opacity: 0.5, transform: "scale(0.8)" },
    },
  },

  iconWrapper: {
    display: "inline-block",
    position: "relative",
    marginBottom: 3,
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 140,
      height: 140,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0) 70%)",
      animation: "pulse 2s ease-in-out infinite",
    },
    "@keyframes pulse": {
      "0%, 100%": { transform: "translate(-50%, -50%) scale(1)", opacity: 0.5 },
      "50%": { transform: "translate(-50%, -50%) scale(1.1)", opacity: 0.8 },
    },
  },

  luxurySuccessIcon: {
    fontSize: 100,
    color: "#4CAF50",
    filter: "drop-shadow(0 4px 20px rgba(76, 175, 80, 0.5))",
    animation: "bounce 1s ease-in-out",
    "@keyframes bounce": {
      "0%": { transform: "scale(0) rotate(-180deg)" },
      "50%": { transform: "scale(1.1) rotate(0deg)" },
      "70%": { transform: "scale(0.95) rotate(0deg)" },
      "100%": { transform: "scale(1) rotate(0deg)" },
    },
  },

  luxuryTitle: {
    fontWeight: 700,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: 2,
    fontFamily: "'Arial', sans-serif",
    textShadow: "0 2px 10px rgba(102, 126, 234, 0.3)",
    letterSpacing: "0.5px",
  },

  decorativeLine: {
    width: 120,
    height: 4,
    background: "linear-gradient(90deg, transparent, #FFD700, transparent)",
    margin: "0 auto 20px",
    borderRadius: 2,
    boxShadow: "0 2px 10px rgba(255, 215, 0, 0.5)",
  },

  luxurySubtitle: {
    color: "#555",
    fontWeight: 400,
    marginBottom: 4,
    lineHeight: 1.8,
    fontSize: "1.1rem",
  },

  shippingIconContainer: {
    display: "inline-flex",
    alignItems: "center",
    gap: 1.5,
    padding: "16px 32px",
    background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.05) 100%)",
    borderRadius: 8,
    border: "1px solid rgba(255, 215, 0, 0.3)",
    marginTop: 2,
  },

  shippingIcon: {
    fontSize: 32,
    color: "#667eea",
    animation: "slide 2s ease-in-out infinite",
    "@keyframes slide": {
      "0%, 100%": { transform: "translateX(0)" },
      "50%": { transform: "translateX(10px)" },
    },
  },

  shippingText: {
    fontWeight: 600,
    color: "#667eea",
    fontSize: "1rem",
  },

  decorativeBorder: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 6,
    background: "linear-gradient(90deg, #667eea, #FFD700, #764ba2, #FFD700, #667eea)",
    backgroundSize: "200% 100%",
    animation: "gradientShift 3s linear infinite",
    "@keyframes gradientShift": {
      "0%": { backgroundPosition: "0% 50%" },
      "100%": { backgroundPosition: "200% 50%" },
    },
  },
};
