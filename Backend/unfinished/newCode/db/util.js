// 1. 引入初始化模块
const { initDB, getCollection} = require('./mongo');
const { ObjectId } = require('mongodb');
const {createNewUser,createNewRecord
} = require('../data_struct/user')


async function addNewUser(platformData){
  await initDB(); 
  const players = getCollection('user'); 
  const result = await players.insertOne(createNewUser(platformData));
  return result.insertedId;
}

async function findAllUser() {
  await initDB(); 
  const user = getCollection('user'); 
  const result = await user.find({});
  return result.toArray();
}

async function findUserByID(_id) {
  await initDB(); 
  const user = getCollection('user'); 
  const result = await user.findOne({'_id':_id});
  return result;
}
async function findUserByPlatUid(platUid,platID) {
  await initDB(); 
  const user = getCollection('user'); 
  const result = await user.findOne({
    'userPlatUid':platUid,'fromPlatformID':platID});
  return result;
}

async function addNewSesson(typeId){
  await initDB(); 
  const players = getCollection('sesson'); 
  const result = await players.insertOne(createNewRecord(typeId));
  return result.insertedId;
}

async function findAllSesson() {
  await initDB(); 
  const user = getCollection('sesson'); 
  const result = await user.find({});
  return result.toArray();
}




module.exports = {
  addNewUser,findAllUser,findUserByID,findUserByPlatUid,
  addNewSesson,findAllSesson
};
// 5. 关闭连接（通常在进程退出时）
process.on('SIGINT', async () => {
  const { closeDB } = require('../db/mongodb');
  await closeDB();
  process.exit(0);
});