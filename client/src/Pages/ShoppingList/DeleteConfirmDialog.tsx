import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { CONFIRM_DELETE_PRODUCT, YES, NO } from "../../Common/CommonConstants";

interface DeleteConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmDialog({ open, onConfirm, onCancel }: DeleteConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth='xs'
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          direction: "rtl",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 600,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {CONFIRM_DELETE_PRODUCT}
      </DialogTitle>
      <DialogActions sx={{ justifyContent: "center", pb: 3, gap: 2 }}>
        <Button
          onClick={onCancel}
          variant='outlined'
          sx={{
            borderColor: "#667eea",
            color: "#667eea",
            "&:hover": {
              borderColor: "#5568d3",
              backgroundColor: "rgba(102, 126, 234, 0.08)",
            },
          }}
        >
          {NO}
        </Button>
        <Button
          onClick={onConfirm}
          variant='contained'
          sx={{
            backgroundColor: "#667eea",
            color: "white",
            "&:hover": {
              backgroundColor: "#5568d3",
            },
          }}
        >
          {YES}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
