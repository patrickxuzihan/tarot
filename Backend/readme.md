更新nodejs+mongodb骨架
通过main.js开启http服务
完成基本数据库代码
已经测试数据库（db/test
使用前填入mongo的‘在此输入db 访问url’

表单内容：
{
  "_id": {
    "$oid": "684c694ad22235b72e7908a6"
  },
  "username": null,
  "image": "https://default.image.url",
  "userVipLevel": 0,
  "userVipEndDate": 1749838154484,
  "fromPlatformID": null,
  "userPlatUid": null,
  "UserRemainingAmounts": [
    0,
    0,
    0
  ],
  "userSkins": [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  "userHistoryList": [],
  "currentStepId": 0,
  "userRegTime": 1749838154484
}


旧版：
windows使用时运行run.bat，会自动安装python相关依赖并运行服务端

后端采用python fastapi，数据库待定

docs里有各种接口的初始定义

程序入口是main.py，将不同指令分发给routers中的admin和user，
schemas里是接口互动用的json格式对象，
certs里装着https的证书，
删除原有certs内容后generate certificate可以生成新的证书。

需要完成services中的具体功能实现，还有数据库的选择，

初步预选是postgresql（高性能）或者mongodb（高灵活）
亦可以选择在服务器上运行数据库server或者使用现有云数据库