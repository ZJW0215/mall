const Hogan = require('hogan.js') /* 渲染html模板使用的插件 */
/* 为获取服务器地址做扩展 */
const conf = {
    serverHost: ''
}

const tools = {
    /* 请求后端数据 */
    request: function(param) {
        const that = this
        $.ajax({
            type: param.method || 'GET',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function(res) {
                /* 请求成功 返回回调，返回数据和信息*/
                if(res.status === 0) {
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                /* 为进行登录，要强制进行登录 */
                else if(res.status === 10) {
                    that.doLogin()
                }
                /* 请求数据错误 */
                else if(res.status === 1) {
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            /* 请求失败，如404,503等 */
            error: function(err) {
                typeof param.error === 'function' && param.error(err.statusText)
            }
        })
    },
    /* 获取服务器地址 */
    getServerUrl: function(path) {
        return conf.serverHost + path
    },
    /* 获取url参数 */
    getUrlParam: function(name) {
        /* ^&匹配&，如果不是就结束 */
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        const result = window.location.search.substr(1).match(reg)
        return result ? decodeURIComponent(result[2]) : null
    },
    /* 渲染html模板 */
    renderHtml: function(htmlTemplate, data) {
        /* hogan先编译后渲染 */
        const template = Hogan.compile(htmlTemplate)
        const result = template.render(data)
        return result
    },
    /* 操作成功提示 */
    successTips: function(msg) {
        alert(msg || '操作成功')
    },
    /* 操作出错提示 */
    errorTips: function(msg) {
        alert(msg || '有地方不对哦！')
    },
    /* 字段验证，支持非空、手机、邮箱的判断 */
    validate: function(valValue, type) {
        const value = $.trim(valValue)
        /* 非空验证 */
        if(type === 'request') {
            /* !!将一个值快速转化为布尔值 */
            return !!value
        }
        /* 手机验证 */
        if(type === 'phone') {
            return /^1\d{10}$/.test(value)
        }
        /* 邮箱验证 */
        if(type === 'email') {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)
        }
    },
    /* 进行登录操作 */
    doLogin: function() {
        /* 对url进行编码，保证安全 */
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href)
    },
    /* 跳转到主页 */
    skipHome: function () {
        window.location.href = './index.html'
    }
}

module.exports = tools

