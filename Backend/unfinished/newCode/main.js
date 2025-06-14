const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const API_PREFIX = '';
const server = express();

// 使用body-parser中间件解析JSON请求体
server.use(bodyParser.json());

// 挂载路由，并添加前缀 /private/admin
server.use('/private/admin', adminRouter);
server.use('/user', userRouter);

const PORT = 80;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});