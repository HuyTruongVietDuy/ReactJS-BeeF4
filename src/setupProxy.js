const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/shop", // Địa chỉ route bạn muốn proxy
    createProxyMiddleware({
      target: "http://newhostname:3000", // Địa chỉ của máy chủ mới bạn muốn chuyển tiếp yêu cầu đến
      changeOrigin: true,
    })
  );
};
