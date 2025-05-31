from fastapi import APIRouter, HTTPException
from app.schemas.admin import AdminLoginPack, AdminPostActionPack
from app.schemas.responses import DataErrorResponse
from app.schemas.admin import ServerProvidedToken, GlobalBasicInfo
from app.services.admin_service import AdminService
from typing import Any

router = APIRouter(prefix="/admin", tags=["admin"])
service = AdminService()

@router.post(
    "/login", 
    response_model=ServerProvidedToken,
    responses={404: {"model": DataErrorResponse}})
def login_admin(pack: AdminLoginPack):
    """管理员发起登录请求"""
    return service.login(pack)

@router.post(
    "/action", 
    response_model=GlobalBasicInfo,
    responses={404: {"model": DataErrorResponse}})
def admin_action(pack: AdminPostActionPack):
    """管理员发起功能请求"""
    return service.post_action(pack)

@router.get(
    "/ping",
    response_model=Any,
    responses={404: {"model": DataErrorResponse}}
)
def ping():
    """管理员健康检查接口"""
    return {"message": "pong"}