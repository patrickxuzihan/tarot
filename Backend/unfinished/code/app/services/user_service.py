from typing import Any
from app.schemas.user import (
    UserRegisteringPack, UserLoginPack, UserBuyingBuyingPack, UserPostActionPack,
    UserBasicInfo, UserCurrentSession, ServerProvidedToken
)
from app.schemas.responses import DataErrorResponse

class UserService:
    def register(self, pack: UserRegisteringPack) -> Any:
        # TODO: 实现用户注册
        raise NotImplementedError

    def login(self, pack: UserLoginPack) -> Any:
        # TODO: 实现用户登录
        raise NotImplementedError

    def update_local(self, pack: UserPostActionPack) -> Any:
        # TODO: 实现更新本地数据
        raise NotImplementedError

    def purchase(self, pack: UserBuyingBuyingPack) -> Any:
        # TODO: 实现套餐购买逻辑
        raise NotImplementedError

    def action(self, pack: UserPostActionPack) -> Any:
        # TODO: 实现功能请求逻辑
        raise NotImplementedError