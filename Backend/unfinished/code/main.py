from fastapi import FastAPI

from app.routers import admin, user

app = FastAPI(title="My API")

# 注册路由
app.include_router(admin.router, prefix="/private", tags=["admin"])
app.include_router(user.router, prefix="", tags=["user"])