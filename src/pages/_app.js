import "@/styles/globals.css";
import { api } from "./api/api";
import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function App({ Component, pageProps }) {
  // const token = useLocalStorage("token");
  // const getUser = async () => {
  //   try {
  //     const response = await api.get("/v1/users/profile", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);
  return <Component {...pageProps} />;
}
