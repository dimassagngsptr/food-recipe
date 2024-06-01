import { api } from "./api";
import * as Yup from "yup";

export async function register(data) {
  try {
    const response = await api.post("/v1/auth/register", data);
    return response;
  } catch (error) {
    return error;
  }
}

export const validateRegister = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Name must contain only letters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  phone: Yup.number().required("Phone number is required"),
  password: Yup.string()
    .min(8, "minimum 8 characters long")
    .matches(
      /[!@#$%^&*(),.?":{}|<>_-]/,
      "Password must contain 1 special character"
    )
    .matches(/[0-9]/, "Password must contain at least 1 digit of number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords doesnt match")
    .required("Confirm Password is required")
    .required("Confirm Password is required"),
});
