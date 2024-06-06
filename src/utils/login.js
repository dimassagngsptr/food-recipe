import { api } from "../pages/api/api";
import * as Yup from "yup";

export async function login(data) {
  try {
    const response = await api.post("/v1/auth/login", data);
    return response;
  } catch (error) {
    return error;
  }
}

export const validateLogin = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  password: Yup.string().required("Password is required"),
});
