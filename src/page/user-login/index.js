require('../common/nav-simple/index')
require('./index.css')
const tools = require('../../util/tools')
const user = require('../../service/user-service')
/* 表单里的错误提示 */
const formError = {
    show: function(errMsg) {
        $('.error-item').show().find('.error-msg').text(errMsg)
    },
    hide: function() {
        $('.error-item').hide().find('.error-msg').text('')
    }
}

const page = {
    init: function() {
        this.bindEvent()
    },
    bindEvent: function() {
        const that = this
        /* 点击登录事件处理 */
        $('#submit').click(function() {
            that.submit()
        })
        /* 点击回车后进行提交 */
        $('.user-content').keyup(function(e) {
            if(e.keyCode === 13) {
                that.submit()
            }
        })
    },
    /* 表单提交 */
    submit: function() {
        const formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        }
        /* 表单验证结果 */
        const validateResult = this.formValidate(formData)
        if(validateResult.status) {  //验证成功,进行登录
            user.login(formData, function(res) {
                window.location.href = tools.getUrlParam('redirect') || './index.html'
            }, function(errMsg) {
                formError.show(errMsg)
            })
        } else {
            formError.show(validateResult.msg)
        }
    },
    /* 表单验证 */
    formValidate: function(formdata) {
        const result = {
            status: false,
            msg: ''
        }
        if(!tools.validate(formdata.username, 'request')) {
            result.msg = '用户名不能为空'
            return result
        }
        if(!tools.validate(formdata.password, 'request')) {
            result.msg = '密码不能为空'
            return result
        }
        result.status = true
        result.msg = '验证通过'
        return result
    }
}
$(function() {
    page.init()
})