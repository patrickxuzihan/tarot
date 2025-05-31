from app.schemas.admin import AdminLoginPack, AdminPostActionPack, ServerProvidedToken, GlobalBasicInfo
from app.schemas.responses import DataErrorResponse

class AdminService:
    def login(self, pack: AdminLoginPack) -> ServerProvidedToken:
        # TODO: 实现登录验证
        raise NotImplementedError

    def post_action(self, pack: AdminPostActionPack) -> GlobalBasicInfo:
        # TODO: 实现管理员功能请求
        raise NotImplementedError