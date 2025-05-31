FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . /app
# 使用 SSL 启动
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "443", \
     "--ssl-certfile", "certs/cert.pem", \
     "--ssl-keyfile", "certs/key.pem"]