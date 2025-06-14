// adminService.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'hihihi';

// 模拟数据（实际应通过Dao层获取）
const mockAdmin = {
  userID: 'admin123',
  loginPwd: 'securepassword'
};

const mockGlobalBasicInfo = {
  totalUserNum: 1000,
  currentUserNum: 500
};

// Ping服务
exports.pingService = () => {
  return { status: 'success', message: 'pang' };
};

// 登录服务
exports.loginService = (adminLoginPack) => {
  if (!adminLoginPack) throw new Error('MISSING_PARAM');
  
  if (adminLoginPack.userID !== mockAdmin.userID || 
    adminLoginPack.loginPwd !== mockAdmin.loginPwd) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const token = jwt.sign(
    { id: adminLoginPack.userID }, 
    SECRET_KEY, 
    { expiresIn: '10m' }
  );

  return {
    status: 'success',
    message: '用户登录成功',
    token: token,
    data: mockGlobalBasicInfo
  };
};

// 动作请求服务
exports.actionService = (actionPack) => {
  if (!actionPack || !actionPack.AdminSubmittedToken?.access_token) {
    throw new Error('MISSING_PARAM');
  }

  try {
    jwt.verify(actionPack.AdminSubmittedToken.access_token, SECRET_KEY);
    return { status: 'success', message: '用户请求成功', data: {} };
  } catch (err) {
    throw new Error('INVALID_TOKEN');
  }
};