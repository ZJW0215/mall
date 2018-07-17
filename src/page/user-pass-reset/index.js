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
    data: {
        username: '',
        question: '',
        answer: '',
        token: '',
    },
    init: function() {
        this.onLoad()
        this.bindEvent()
    },
    /* 首次进入时加载第一个问题 */
    onLoad: function() {
        this.loadStepUsername()
    },
    bindEvent: function() {
        const that = this
        /* 输入用户名的下一步按钮事件处理 */
        $('#submit-username').click(function() {
            const username = $.trim($('#username').val())
            /* 如果用户名存在 */
            if(username) {
                user.getQuestion(username, function(res) {
                    that.data.username = username
                    that.data.question = res
                    that.loadStepQuestion()
                }, function(errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('请输入用户名')
            }
        })
        /* 输入密码提示问题的下一步按钮事件处理 */
        $('#submit-question').click(function() {
            const answer = $.trim($('#answer').val())
            /* 如果密码提示问题存在 */
            if(answer) {
                /* 检查密码提示问题答案 */
                user.checkAnswer({
                    username: that.data.username,
                    question: that.data.question,
                    answer: answer
                }, function(res) {
                    that.data.answer = answer
                    that.data.token = res
                    that.loadStepPassword()
                }, function(errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('请输入密码提示问题答案')
            }
        })
        /* 输入新密码的下一步按钮事件处理 */
        $('#submit-password').click(function() {
            const password = $.trim($('#password').val())
            /* 如果密码不为空且长度不少于6位 */
            if(password && password.length >= 6) {
                /* 检查密码 */
                user.resetPassword({
                    username: that.data.username,
                    passwordNew: password,
                    forgetToken: that.data.token
                }, function(res) {
                    window.location.href = './result.html?type=pass-reset'
                }, function(errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('请输入密码提示问题答案')
            }
        })
    },
    /* 加载输入用户名 */
    loadStepUsername: function() {
        $('.step-username').show()
    },
    /* 加载密码提示问题 */
    loadStepQuestion: function() {
        /* 清除错误提示 */
        formError.hide()
        /* 显示下一步的问题 */
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question)
    },
    /* 加载输入新密码 */
    loadStepPassword: function() {
        /* 清除错误提示 */
        formError.hide();
        /* 显示新密码输入框 */
        $('.step-question').hide()
            .siblings('.step-password').show();
    }
}
$(function() {
    page.init()
})