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
        /* username用户名验证
        *  失去焦点时进行验证
        */
        $('#username').blur(function() {
            const username = $.trim($(this).val())
            /* 如果用户名为空，则不做验证 */
            if(!username) {
                return
            }
            /* 异步验证username */
            user.checkUsername(username, function(res) {
                formError.hide()
            }, function(errMsg) {
                formError.show(errMsg)
            })

        })
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
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            phone: $.trim($('#phone').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val()),
        }
        /* 表单验证结果 */
        const validateResult = this.formValidate(formData)
        if(validateResult.status) {  //验证成功,进行登录
            user.register(formData, function(res) {
                window.location.href = './result.html?type=register'
            }, function(errMsg) {
                formError.show(errMsg)
            })
        } else {
            formError.show(validateResult.msg)
        }
    },
    /* 表单验证 */
    formValidate: function(formData) {
        const result = {
            status: false,
            msg: ''
        }
        /* 验证用户名不能为空 */
        if(!tools.validate(formData.username, 'request')) {
            result.msg = '用户名不能为空'
            return result
        }
        /* 验证密码不能为空 */
        if(!tools.validate(formData.password, 'request')) {
            result.msg = '密码不能为空'
            return result
        }
        /* 验证密码长度不能少于6位 */
        if(formData.password.length < 6) {
            result.msg = '密码不能少于6位'
            return result
        }
        /* 验证两次密码是否相同 */
        if(formData.password !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致'
            return result
        }
        /* 验证手机号 */
        if(!tools.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确'
            return result
        }
        /* 验证邮箱 */
        if(!tools.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确'
            return result
        }
        /* 验证密码提示问题不能为空 */
        if(!tools.validate(formData.question, 'request')) {
            result.msg = '密码提示问题不能为空'
            return result
        }
        /* 验证密码提示问题的答案不能为空 */
        if(!tools.validate(formData.answer, 'request')) {
            result.msg = '密码提示问题的答案不能为空'
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