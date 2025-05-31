from pydantic import BaseModel

class DataErrorResponse(BaseModel):
    message: str = "请求参数错误或缺失必填字段"