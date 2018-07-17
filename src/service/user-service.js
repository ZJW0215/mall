const tools = require('../util/tools')

const user = {
    /* 用户登录 */
    login: function(userInfo, resolve, reject) {
        tools.request({
            url: tools.getServerUrl('/user/login.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },
    /* 用户名检测 */
    checkUsername: function(username, resolve, reject) {
        tools.request({
            url: tools.getServerUrl('/user/check_valid.do'),
            method: 'POST',
            data: {
                type: 'username',
                str: username
            },
            success: resolve,
            error: reject
        })
    },
    /* 用户注册 */
    register: function(userInfo, resolve, reject) {
        tools.request({
            url: tools.getServerUrl('/user/register.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },
    /* 检查登录状态 */
    checkLogin : function(resolve, reject){
        tools.request({
            url: tools.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    /* 获取用户密码提示问题 */
    getQuestion : function(username, resolve, reject){
        tools.request({
            url: tools.getServerUrl('/user/forget_get_question.do'),
            data: {
                username: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    /* 忘记密码时，检查密码提示问题答案 */
    checkAnswer: function(userInfo, resolve, reject) {
        tools.request({
            url: tools.getServerUrl('/user/forget_check_answer.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },
    /* 重置密码 */
    resetPassword: function(userInfo, resolve, reject) {
        tools.request({
            url: tools.getServerUrl('/user/forget_reset_password.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },
    /* 加载用户信息 */
    getUserInfo : function(resolve, reject){
        tools.request({
            url: tools.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    /* 更新个人中心信息 */
    updateUserInfo: function(userInfo, resolve, reject) {
        tools.request({
            url: tools.getServerUrl('/user/update_information.do'),
            method: 'POST',
            date: userInfo,
            success: resolve,
            error: reject
        });
    },
    /* 退出登录 */
    logout : function(resolve, reject){
        tools.request({
            url: tools.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }

}

module.exports = user