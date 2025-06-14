// service.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'hihihi';

// 模拟数据库（实际项目应替换为真实数据库）
const mockUsers = new Map();
const mockTokens = new Map();

class AuthService {
    // Ping 服务
    ping() {
        return { status: 'success', message: 'pang' };
    }

    // 用户注册服务
    register(regPack) {
        // 参数验证
        if (!regPack || !regPack.time || !regPack.name || !regPack.cred || !regPack.credID || !regPack.pwd) {
            throw new Error('MISSING_PARAM');
        }

        // 检查用户是否已存在
        if (mockUsers.has(regPack.cred)) {
            throw new Error('USER_EXISTS');
        }

        // 创建用户
        const userId = `usr_${Date.now()}`;
        const userData = {
            uid: userId,
            name: regPack.name,
            email: regPack.email || '',
            plat: regPack.plat || 0,
            platUID: regPack.platUID || '',
            regTime: Date.now(),
            pwd: regPack.pwd
        };
        mockUsers.set(regPack.cred, userData);

        // 生成令牌
        const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
        const tokenId = Date.now();
        mockTokens.set(tokenId, { userId, token });

        // 构建响应数据
        return {
            msg: '用户注册登录成功',
            tok: {
                tok: token,
                tokID: tokenId,
                expIn: 3600
            },
            data: this._buildUserData(userId, regPack.name, regPack.email)
        };
    }

    // 用户登录服务
    login(pack) {
        // 参数验证
        if (!pack || !pack.time || !pack.uid || !pack.uidID || !pack.pwd || !pack.pwdID) {
            throw new Error('MISSING_PARAM');
        }

        // 查找用户
        let user;
        for (const [cred, userData] of mockUsers) {
            if (userData.uid === pack.uid) {
                user = userData;
                break;
            }
        }

        // 验证用户
        if (!user || user.pwd !== pack.pwd) {
            throw new Error('INVALID_CREDENTIALS');
        }

        // 生成令牌
        const token = jwt.sign({ userId: user.uid }, SECRET_KEY, { expiresIn: '1h' });
        const tokenId = Date.now();
        mockTokens.set(tokenId, { userId: user.uid, token });

        // 构建响应数据
        return {
            msg: '用户登录成功',
            tok: {
                tok: token,
                tokID: tokenId,
                expIn: 3600
            },
            data: this._buildUserData(user.uid, user.name, user.email)
        };
    }

    // 用户功能请求服务
    action(pack, userId) {
        // 参数验证
        if (!pack || !pack.time || !pack.act || !pack.UsrSentTok) {
            throw new Error('MISSING_PARAM');
        }

        // 根据action执行逻辑
        let resultData = {};
        switch (pack.act) {
            case 1: resultData = this._generateRankData(); break;
            case 2: resultData = this._generateGameHistory(); break;
            default: resultData = { action: pack.act, status: 'executed' };
        }

        // 生成新令牌
        const newToken = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
        const newTokenId = Date.now();
        mockTokens.set(newTokenId, { userId, token: newToken });

        return {
            msg: '用户请求成功',
            token: {
                tok: newToken,
                tokID: newTokenId,
                expIn: 3600
            },
            data: resultData
        };
    }

    // 内部方法：构建用户数据
    _buildUserData(uid, name, email = '') {
        return {
            pub: {
                time: Date.now(),
                thm: Math.floor(Math.random() * 10) + 1,
                ix1: 1.0,
                ix2: 1.5,
                ver: 1012
            },
            plat: {
                uid,
                name,
                image: "",
                email,
                platID: 0,
                usrPlatUID: "",
                regTime: Date.now(),
                ban: false,
                banUntil: 0,
                illActNum: 0,
                illActList: ""
            },
            stat: {
                lv: 1,
                nGame: 0,
                nWin: 0,
                tPlay: 0
            },
            proop: {
                gold: 100,
                gem: 10,
                tools: [0, 0, 0]
            }
        };
    }

    // 内部方法：生成排行榜数据
    _generateRankData() {
        return {
            time: Date.now(),
            dayWin: [
                { uid: "usr1", name: "玩家A", img: "", value: 12 },
                { uid: "usr2", name: "玩家B", img: "", value: 10 }
            ],
            speed: [
                {
                    uid: "usr3", name: "玩家C", img: "", value: 98,
                    game: { id: 101, seed: "seed123", time: Date.now() }
                }
            ]
        };
    }

    // 内部方法：生成游戏历史
    _generateGameHistory() {
        return [
            { act: 1, data: { move: "left" } },
            { act: 2, data: { move: "jump" } }
        ];
    }
}

module.exports = new AuthService();