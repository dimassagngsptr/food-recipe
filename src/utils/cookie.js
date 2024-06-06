import Cookies from "js-cookie";

export const setCookie = (token, refreshToken) => {
  Cookies.set("token", token);
  Cookies.set("refreshToken", refreshToken);
};

export const getCookie = () => {
  const token = Cookies.get("token");
  const refreshToken = Cookies.get("refreshToken");
  return { token, refreshToken };
};

export const deleteCookie = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
};

export function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(";").forEach((cookie) => {
      const [name, value] = cookie.split("=").map((item) => item.trim());
      cookies[name] = decodeURIComponent(value);
    });
  }
  return cookies;
}
