const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  const serverProxyUrl = process.env.HTTP_PROXY;
  console.log(`USING PROXY: ${serverProxyUrl}`);
  app.use(createProxyMiddleware('/api', { target: serverProxyUrl }));
};
