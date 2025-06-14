const { MongoClient } = require('mongodb');

// 1. 配置系统（支持环境变量覆盖）
const config = {
  url: process.env.MONGODB_URI || '在此输入db 访问url',
  dbName: process.env.MONGODB_DB || 'testdb',
  maxPoolSize: parseInt(process.env.MONGODB_POOL_SIZE) || 5
};

// 2. 连接池单例管理
let _client = null;
let _db = null;

// 3. 核心初始化方法
async function initDB() {
  if (_client) return _db; // 返回已存在的连接


  try {
    _client = new MongoClient(config.url, {
      poolSize: config.poolSize,
      useNewUrlParser: config.useNewUrlParser,
      useUnifiedTopology: config.useUnifiedTopology
    });

    await _client.connect();
    _db = _client.db(config.dbName);
    
    console.log(`✅ MongoDB connected to ${config.dbName}`);

    console.log(`✅ MongoDB index created`);
    return _db;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err; // 抛出异常供调用方处理
  }
}

// 4. 安全关闭连接
async function closeDB() {
  if (_client) {
    await _client.close();
    _client = null;
    _db = null;
    console.log('📴 MongoDB connection closed');
  }
}

// 5. 获取集合的快捷方法
function getCollection(collectionName) {
  if (!_db) throw new Error('DB not initialized. Call initDB() first');
  return _db.collection(collectionName);
}

module.exports = {
  initDB,
  closeDB,
  getCollection,
  config // 可选：暴露配置用于调试
};