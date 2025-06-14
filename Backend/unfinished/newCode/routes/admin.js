// adminRoute.js
const express = require('express');
const router = express.Router();
const {
  pingService,
  loginService,
  actionService
} = require('./adminService'); // 导入服务层

// Ping路由
router.post('/ping', (req, res) => {
  try {
    const result = pingService();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// 登录路由
router.post('/login', (req, res) => {
  try {
    const result = loginService(req.body.UserLoginPack);
    res.status(200).json(result);
  } catch (error) {
    const statusMap = {
      'MISSING_PARAM': 404,
      'INVALID_CREDENTIALS': 401
    };
    res.status(statusMap[error.message] || 500).json({
      status: 'error',
      message: error.message === 'MISSING_PARAM' ? 
        '请求参数错误或缺失必填字段' : '管理员ID或密码错误'
    });
  }
});

// 动作请求路由
router.post('/action', (req, res) => {
  try {
    const result = actionService(req.body.UserPostActionPack);
    res.status(200).json(result);
  } catch (error) {
    const statusMap = {
      'MISSING_PARAM': 404,
      'INVALID_TOKEN': 401
    };
    res.status(statusMap[error.message] || 500).json({
      status: 'error',
      message: error.message === 'MISSING_PARAM' ? 
        '请求参数错误或缺失必填字段' : '无效或过期的令牌'
    });
  }
});

module.exports = router;