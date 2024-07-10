export const API_METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
};

export const ENDPOINTS = {
  login: "/auth/customer/authorize",
  adminLogin: "http://localhost:3000/auth",
  logout: "/api/profile/logout",
  getCaptcha: '/api/auth/get/captcha',
  validateCaptcha:'/api/auth/verify/captcha'
}
