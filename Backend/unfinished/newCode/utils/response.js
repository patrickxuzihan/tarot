// 响应工具函数（带增强的错误处理）
function successResponse(res, data = {}) {
  try {
    // 添加请求追踪ID（用于分布式追踪）
    const requestId = res.locals.requestId || crypto.randomUUID();
    
    res.status(200).json({
      status: 'success',
      timestamp: new Date().toISOString(),
      requestId,
      ...data
    });
  } catch (error) {
    // 处理序列化错误
    console.error(`[${new Date().toISOString()}] 响应序列化失败:`, error);
    res.status(500).json({
      status: 'error',
      code: 'RESPONSE_SERIALIZATION_FAILED',
      message: '服务器响应序列化失败',
      timestamp: new Date().toISOString()
    });
  }
}

function errorResponse(res, statusCode, message, options = {}) {
  // 参数验证
  if (typeof statusCode !== 'number' || statusCode < 400 || statusCode >= 600) {
    console.error(`[${new Date().toISOString()}] 无效的状态码: ${statusCode}`);
    statusCode = 500;
    message = '服务器内部错误';
  }

  // 错误分类处理
  let errorCode = 'UNKNOWN_ERROR';
  if (statusCode >= 400 && statusCode < 500) {
    errorCode = options.code || 'CLIENT_ERROR';
  } else if (statusCode >= 500) {
    errorCode = options.code || 'SERVER_ERROR';
  }

  // 构建错误响应
  const response = {
    status: 'error',
    code: errorCode,
    message,
    timestamp: new Date().toISOString(),
    requestId: res.locals.requestId || 'N/A'
  };

  // 添加调试信息（仅限开发环境）
  if (process.env.NODE_ENV !== 'production') {
    response.debug = {
      stack: options.stack || new Error().stack,
      context: options.context || {}
    };
  }

  // 日志记录（区分环境）
  const logMessage = `[${response.timestamp}] [${response.requestId}] ${statusCode} ${errorCode}: ${message}`;
  if (statusCode >= 500) {
    console.error(logMessage, options.error || {});
  } else {
    console.warn(logMessage);
  }

  // 发送响应
  res.status(statusCode).json(response);
}

// 自定义错误类
class ApiError extends Error {
  constructor(statusCode, message, errorCode, context) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.context = context;
    this.timestamp = new Date().toISOString();
  }
  
  toResponse(res) {
    return errorResponse(
      res, 
      this.statusCode, 
      this.message, 
      {
        code: this.errorCode,
        context: this.context,
        stack: this.stack
      }
    );
  }
}

// 常用错误类型
const ERROR_TYPES = {
  // 客户端错误 (4xx)
  BAD_REQUEST: (message, context) => 
    new ApiError(400, message || '无效请求', 'BAD_REQUEST', context),
  
  UNAUTHORIZED: (message) => 
    new ApiError(401, message || '未授权访问', 'UNAUTHORIZED'),
  
  FORBIDDEN: (message) => 
    new ApiError(403, message || '禁止访问', 'FORBIDDEN'),
  
  NOT_FOUND: (message) => 
    new ApiError(404, message || '资源未找到', 'RESOURCE_NOT_FOUND'),
  
  CONFLICT: (message) => 
    new ApiError(409, message || '资源冲突', 'RESOURCE_CONFLICT'),
  
  // 服务端错误 (5xx)
  INTERNAL_ERROR: (message) => 
    new ApiError(500, message || '服务器内部错误', 'INTERNAL_ERROR'),
  
  SERVICE_UNAVAILABLE: (message) => 
    new ApiError(503, message || '服务不可用', 'SERVICE_UNAVAILABLE'),
  
  // 业务逻辑错误
  VALIDATION_FAILED: (errors) => 
    new ApiError(422, '数据验证失败', 'VALIDATION_FAILED', { errors }),
  
  RATE_LIMITED: (retryAfter) => 
    new ApiError(429, '请求过于频繁', 'RATE_LIMITED', { retryAfter })
};

// 中间件：全局错误处理器
function globalErrorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return err.toResponse(res);
  }

  // 处理JWT验证错误
  if (err.name === 'UnauthorizedError') {
    return ERROR_TYPES.UNAUTHORIZED('无效的认证凭证').toResponse(res);
  }

  // 处理数据库错误
  if (err.name === 'MongoError' || err.name === 'SequelizeError') {
    console.error(`[DB Error] ${err.code}: ${err.message}`);
    return ERROR_TYPES.INTERNAL_ERROR('数据库操作失败').toResponse(res);
  }

  // 处理验证错误
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
    return ERROR_TYPES.VALIDATION_FAILED(errors).toResponse(res);
  }

  // 处理未知错误
  console.error(`[UNHANDLED ERROR] ${err.message}\n${err.stack}`);
  return ERROR_TYPES.INTERNAL_ERROR().toResponse(res);
}

module.exports = {
  successResponse,
  errorResponse,
  globalErrorHandler,
  ApiError,
  ERROR_TYPES
};