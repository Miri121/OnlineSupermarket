import * as yup from "yup";
import {
  REQUIRED_FIELD,
  INVALID_EMAIL_FORMAT,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_LETTERS_ONLY,
  ADDRESS_MIN_LENGTH,
  ADDRESS_MAX_LENGTH,
} from "../Common/CommonConstants";

// Yup validation schema for order form
export const orderFormValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .required(REQUIRED_FIELD)
    .min(2, NAME_MIN_LENGTH)
    .max(50, NAME_MAX_LENGTH)
    .matches(/^[a-zA-Z\u0590-\u05FF\s]+$/, NAME_LETTERS_ONLY),
  address: yup
    .string()
    .trim()
    .required(REQUIRED_FIELD)
    .min(5, ADDRESS_MIN_LENGTH)
    .max(100, ADDRESS_MAX_LENGTH),
  email: yup.string().trim().required(REQUIRED_FIELD).email(INVALID_EMAIL_FORMAT),
});
