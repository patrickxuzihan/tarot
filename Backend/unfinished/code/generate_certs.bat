@echo off
REM 生成自签名 TLS 证书和私钥（需先安装 OpenSSL）
if not exist certs mkdir certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 ^
    -keyout certs\key.pem ^
    -out certs\cert.pem ^
    -config certs\openssl.cnf
echo generated: certs\cert.pem, certs\key.pem
pause