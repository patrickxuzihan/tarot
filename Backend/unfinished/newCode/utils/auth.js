const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'hihihi';

function validateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: '未提供认证令牌'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // 实际应用中应检查令牌是否在有效令牌列表中
    req.userId = decoded.userId;
    next();
    
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: '令牌已过期'
      });
    }
    
    res.status(401).json({
      status: 'error',
      message: '无效的认证令牌'
    });
  }
}

module.exports = { validateToken };