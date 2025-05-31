from pydantic import BaseModel
from typing import Any

class UserRegisteringPack(BaseModel):
    requireTime: int
    userName: str
    validateCredential: str
    credentialType: str
    password: str
    userEmail: str | None = None
    userPhoneNumber: int | None = None
    userWechatId: str | None = None

class UserLoginPack(BaseModel):
    requireTime: int
    userID: str
    userIDType: str
    loginPwd: str
    loginPwdType: str

class UserSubmittedToken(BaseModel):
    access_token: str
    token_type: str
    userUUID: str

class UserBuyingBuyingPack(BaseModel):
    requireTime: int
    purchesType: int
    purchesMonth: int
    UserSubmittedToken: UserSubmittedToken
    additionalData: dict[str, Any] | None = None

class UserPostActionPack(BaseModel):
    requireTime: int
    actionType: int
    UserSubmittedToken: UserSubmittedToken
    additionalData: dict[str, Any] | None = None
    message: str | None = None

class UserBasicInfo(BaseModel):
    userUUID: str
    userName: str
    userEmail: str | None

class UserCurrentSession(BaseModel):
    UserCurrentSession: Any
    currentStepId: int

class ServerProvidedToken(BaseModel):
    access_token: str
    expires_in: int

    class Config:
        from_attributes = True