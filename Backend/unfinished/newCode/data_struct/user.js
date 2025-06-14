
/*UserBriefSessionRecord:
type: object
description: 一个列表包含了用户某次询问的大致记录
properties:
  createTime: 
    type: integer
    format: int64
  typeID: 
    type: integer
  sessionID:
    description: 用于查询输入输出记录和音频，方式userUUID_sessionID
    type: string
  sessionHash:
    description: 对该对象+输入输出记录的hash
    type: string
*/

    export function createNewUser(platformData) {
      // 当前时间戳（用于多个字段）
      const now = Date.now(); 
      return {
        username: platformData.username,
        image: 'https://default.image.url',
        userVipLevel:0,
        userVipEndDate:now,
        fromPlatformID:platformData.fromPlatformID,
        userPlatUid:platformData.userPlatUid,
        UserRemainingAmounts: new Array(3).fill(0),
        userSkins: new Array(10).fill(false),
        userHistoryList: [],
        currentStepId:0,
        userRegTime: now
      };
    }

/*
fromServer:
  description: 是否是服务器发给用户的消息
  type: boolean
createTime:
  type: integer
  format: int64
message:
  type: string
*/

    export function createNewRecord(typeID,userId) {
      // 当前时间戳（用于多个字段）
      const now = Date.now(); 
      return {//will have _id
        userId:userId,
        createTime: now,
        typeID: typeID,
        sessionHash: null,
        audioDownloadUrl: null,
        textRecord:[]
      };
    }

