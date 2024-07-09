export const API_METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
};

export const ENDPOINTS = {
  login: "/auth/customer/authorize",
  adminLogin: "/api/auth/admin/login",
  logout: "/api/profile/logout",
  getCaptcha: '/api/auth/get/captcha',
  validateCaptcha:'/api/auth/verify/captcha'
}
