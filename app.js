const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));

app.use('/peer-api', (req, res, next) => {
  req.headers['x-api-key'] = process.env.API_KEY;

  next();
}, createProxyMiddleware({
  target: process.env.PROD_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/peer-api': '',
  },
}));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});