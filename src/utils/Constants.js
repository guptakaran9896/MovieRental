export const API_METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
};
const baseUrl = "https://moviemagnet-kh3v.onrender.com";
export const ENDPOINTS = {
  login: "/auth/customer/authorize",
  adminLogin: `${baseUrl}/auth`,
  rentMovie: `${baseUrl}/rental`,
  getmovies: `${baseUrl}/movie`,
  logout: "/api/profile/logout",
  getCaptcha: "/api/auth/get/captcha",
  validateCaptcha: "/api/auth/verify/captcha",
};
