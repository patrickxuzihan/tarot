from fastapi import APIRouter, HTTPException
from typing import Any

from app.schemas.user import (
    UserRegisteringPack, UserLoginPack,
    UserPostActionPack, UserBuyingBuyingPack,
    UserBasicInfo, UserCurrentSession
)
from app.schemas.responses import DataErrorResponse
from app.schemas.user import ServerProvidedToken
from app.services.user_service import UserService

router = APIRouter(prefix="/user", tags=["user"])
service = UserService()

@router.post(
    "/register",
    response_model=Any,
    responses={404: {"model": DataErrorResponse}})
def register_user(pack: UserRegisteringPack):
    """用户发起注册请求"""
    return service.register(pack)

@router.post(
    "/login",
    response_model=Any,
    responses={404: {"model": DataErrorResponse}})
def login_user(pack: UserLoginPack):
    """用户发起登录请求"""
    return service.login(pack)

@router.post(
    "/updateLocal",
    response_model=Any,
    responses={404: {"model": DataErrorResponse}})
def update_local(pack: UserPostActionPack):
    """用户发起更新本地数据请求"""
    return service.update_local(pack)

@router.post(
    "/purches",
    response_model=Any,
    responses={404: {"model": DataErrorResponse}})
def purchase(pack: UserBuyingBuyingPack):
    """用户发起套餐购买请求"""
    return service.purchase(pack)

@router.post(
    "/action",
    response_model=Any,
    responses={404: {"model": DataErrorResponse}})
def user_action(pack: UserPostActionPack):
    """用户发起功能请求"""
    return service.action(pack)

@router.get(
    "/ping",
    response_model=Any,
    responses={404: {"model": DataErrorResponse}}
)
def ping():
    """管理员健康检查接口"""
    return {"message": "pong"}