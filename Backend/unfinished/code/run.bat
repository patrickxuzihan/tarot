@echo off
REM 开发环境 HTTPS 启动脚本
REM 如果使用虚拟环境，请先激活
if exist .venv\Scripts\activate.bat (
    call .venv\Scripts\activate.bat
)

REM 安装依赖（首次运行时）
if exist requirements.txt (
    pip install --no-cache-dir -r requirements.txt
)

REM 检查证书是否存在
if not exist certs\cert.pem (
    echo error: certs\cert.pem DNE, please generate and place certificate
    goto pause
)
if not exist certs\key.pem (
    echo error: certs\key.pem DNE, please generate and place private key
    goto pause
)

REM 启动 Uvicorn 服务（HTTPS）
uvicorn main:app --reload --host 0.0.0.0 --port 443 --ssl-certfile certs\cert.pem --ssl-keyfile certs\key.pem

:pause
pause
```batch
@echo off
REM 开发环境 HTTPS 启动脚本
REM 如果使用虚拟环境，请先激活
if exist .venv\Scripts\activate.bat (
    call .venv\Scripts\activate.bat
)

REM 安装依赖（首次运行时）
if exist requirements.txt (
    pip install --no-cache-dir -r requirements.txt
)

REM 启动 Uvicorn 服务（HTTPS）
uvicorn main:app --reload --host 0.0.0.0 --port 443 --ssl-certfile certs\cert.pem --ssl-keyfile certs\key.pem

pause