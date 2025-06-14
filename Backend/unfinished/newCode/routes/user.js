const express = require('express');
const router = express.Router();
const authService = require('./service');
const { successResponse, errorResponse } = require('../utils/response');
const { validateToken } = require('../utils/auth');

// Ping 路由
router.post('/ping', (req, res) => {
    try {
        const result = authService.ping();
        successResponse(res, result);
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
});

// 用户注册路由
router.post('/reg', async (req, res) => {
    try {
        const result = await authService.register(req.body.regPack);
        successResponse(res, result);
    } catch (error) {
        const statusMap = {
            'MISSING_PARAM': 404,
            'USER_EXISTS': 400
        };
        errorResponse(res, statusMap[error.message] || 500, 
            error.message === 'MISSING_PARAM' ? 
            '请求参数错误或缺失必填字段' : '用户已存在');
    }
});

// 用户登录路由
router.post('/login', async (req, res) => {
    try {
        const result = await authService.login(req.body.pack);
        successResponse(res, result);
    } catch (error) {
        const statusMap = {
            'MISSING_PARAM': 404,
            'INVALID_CREDENTIALS': 401
        };
        errorResponse(res, statusMap[error.message] || 500, 
            error.message === 'MISSING_PARAM' ? 
            '请求参数错误或缺失必填字段' : '用户ID或密码错误');
    }
});

// 用户功能请求路由
router.post('/act', validateToken, async (req, res) => {
    try {
        const result = await authService.action(req.body.pack, req.userId);
        successResponse(res, result);
    } catch (error) {
        const statusMap = {
            'MISSING_PARAM': 404,
            'INVALID_TOKEN': 401
        };
        errorResponse(res, statusMap[error.message] || 500, 
            error.message === 'MISSING_PARAM' ? 
            '请求参数错误或缺失必填字段' : '无效令牌');
    }
});

module.exports = router;