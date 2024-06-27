import { api } from "../configs/api";
import * as Yup from "yup";

export async function login(data) {
  try {
    const response = await api.post("auth/login", data);
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
