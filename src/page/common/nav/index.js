require('./index.css')
const tools = require('../../../util/tools')
const user = require('../../../service/user-service')

const nav = {
    init: function() {
        this.bindEvent()
        this.loadUserInfo()
        // this.loadCartCount()
        return this
    },
    bindEvent: function() {
        // 登录点击事件
        $('.js-login').click(function(){
            tools.doLogin()
        })
        // 注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html'
        })
        // 退出点击事件
        $('.js-logout').click(function(){
            user.logout(function(res){
                window.location.reload()
            }, function(errMsg){
                tools.errorTips(errMsg)
            })
        })
    },
    /* 加载用户信息 */
    loadUserInfo : function(){
        user.checkLogin(function(res){
            $('.user.not-login').hide()
                .siblings('.user.login').show()
                .find('.username').text(res.username)
        }, function(errMsg){
            // do nothing
        })
    },
    // 加载购物车数量
    // loadCartCount : function(){
    //     _cart.getCartCount(function(res){
    //         $('.nav .cart-count').text(res || 0)
    //     }, function(errMsg){
    //         $('.nav .cart-count').text(0)
    //     })
    // }
}

module.exports = nav.init()