require('./index.css')
require('../../page/common/nav/index')
require('../../page/common/header/index')

const navSide = require('../../page/common/nav-side/index')
const tools = require('../../util/tools')
const user = require('../../service/user-service')
const templateIndex = require('./index.string')

const page = {
    init: function(){
        this.onLoad()
        this.bindEvent()
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo()
    },
    bindEvent: function () {
        const that = this
        /* 点击提交按钮后 */
        $(document).on('click', '.btn-submit', function () {
            const userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            },
            validateResult = that.validateForm(userInfo)  /* 验证字段 */
            if(validateResult.status) {
                user.updateUserInfo(userInfo, function(res, msg) {
                    tools.successTips(msg)
                    window.location.href = './user-center.html'
                }, function(errMsg) {
                    tools.errorTips(errMsg)
                })
            } else {
                tools.errorTips(validateResult.msg)
            }
        })
    },
    // 加载用户信息
    loadUserInfo : function(){
        let userHtml = ''
        user.getUserInfo(function(res){
            userHtml = tools.renderHtml(templateIndex, res)
            $('.panel-body').html(userHtml)
        }, function(errMsg){
            tools.errorTips(errMsg)
        })
    },
    /* 字段验证 */
    validateForm: function(formData) {
        const result = {
            status: false,
            msg: ''
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
$(function(){
    page.init()
});