const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // установить target = http://localhost:5000 если запускать локально
  let target = process.env.REACT_APP_VERCEL_FUNCTIONS_URL;

  // Если приложение запущено локально, переопределяем target
  if (process.env.NODE_ENV === 'development') {
    target = 'http://localhost:5000';
  }

  app.use(
    '/api',
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
};