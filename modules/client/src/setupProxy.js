const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const serverProxyUrl = process.env.HTTP_PROXY;
  console.log(`Using server proxy: ${serverProxyUrl}`);
  app.use(createProxyMiddleware('/api', { target: serverProxyUrl }));
};
