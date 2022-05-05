const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.uomg.com/api/',
      changeOrigin: true,
    })
  );
  app.use(
    '/qzone',
    createProxyMiddleware({
      target: 'http://qlogo2.store.qq.com/qzone',
      changeOrigin: true,
    })
  );
};