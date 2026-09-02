import { Paper, Typography, Divider, TextField, Button, CircularProgress } from "@mui/material";
import { Controller, Control, FieldErrors } from "react-hook-form";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IFormData } from "../../Interfaces";
import {
  CUSTOMER_DETAILS,
  FULL_NAME,
  ADDRESS,
  EMAIL,
  CONFIRM_ORDER,
  SENDING,
} from "../../Common/CommonConstants";

interface CustomerDetailsFormProps {
  control: Control<IFormData>;
  errors: FieldErrors<IFormData>;
  submitting: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  styles: any;
}

export function CustomerDetailsForm({
  control,
  errors,
  submitting,
  onSubmit,
  styles,
}: CustomerDetailsFormProps) {
  return (
    <Paper elevation={2} sx={styles.customerInfoPaper}>
      <Typography
        variant='h5'
        gutterBottom
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontWeight: 600,
        }}
      >
        {CUSTOMER_DETAILS}
      </Typography>
      <Divider sx={styles.divider} />
      <form onSubmit={onSubmit}>
        <Controller
          name='fullName'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label={FULL_NAME}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              sx={styles.textField}
            />
          )}
        />
        <Controller
          name='address'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label={ADDRESS}
              error={!!errors.address}
              helperText={errors.address?.message}
              sx={styles.textField}
            />
          )}
        />
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label={EMAIL}
              type='email'
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={styles.emailField}
            />
          )}
        />
        <Button
          type='submit'
          variant='contained'
          size='large'
          fullWidth
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={20} /> : <CheckCircleIcon />}
          sx={{
            ...styles.submitButton,
            backgroundColor: "#667eea",
            color: "white",
            "&:hover": {
              backgroundColor: "#5568d3",
            },
          }}
        >
          {submitting ? SENDING : CONFIRM_ORDER}
        </Button>
      </form>
    </Paper>
  );
}
