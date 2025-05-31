from pydantic import BaseModel
from typing import List

class AdminLoginPack(BaseModel):
    userID: str
    loginPwd: str

class AdminSubmittedToken(BaseModel):
    access_token: str

class AdminPostActionPack(BaseModel):
    requireTime: int
    command: str
    AdminSubmittedToken: AdminSubmittedToken

class GlobalBasicInfo(BaseModel):
    totalUserNum: int
    currentUserNum: int
    totalVipNums: List[int]
    currentVipNums: List[int]
    useagePercentage: float

class ServerProvidedToken(BaseModel):
    access_token: str
    expires_in: int

    class Config:
        from_attributes = True