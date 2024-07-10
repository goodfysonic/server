const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Chỉ cho phép nguồn này
    credentials: true // Cho phép credentials (cookies, headers...)
}));

// Proxy configuration
const API_SERVICE_URL = "https://rem.dbwebb.se/api";

// Proxy endpoints
app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // Gỡ bỏ '/api' khi chuyển tiếp
    },
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
        proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
    }
}));

// Route for testing if the server is working
app.get('/test', (req, res) => {
    res.send('Proxy server is running!');
});

app.get('/', (req, res) => {
  res.send('Proxy server is running and ready to forward requests!');
});

const PORT = 3001; 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
