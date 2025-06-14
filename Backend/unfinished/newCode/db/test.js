// 1. 引入初始化模块
const { initDB, getCollection } = require('./mongo');
const util = require('./util');
async function run() {
  try {
    const db = await initDB(); 
    var data = await util.addNewUser({
        username:"e",
        fromPlatformID: 1,          // 平台ID
        userPlatUid: "abc123" // 平台用户ID
      })
    console.log(data)
    console.log(await util.findAllUser())
  } finally {
  }

  const { closeDB } = require('./mongo');
  await closeDB();
}
run();