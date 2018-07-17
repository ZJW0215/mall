require('./index.css')
require('../../page/common/nav/index')
require('../../page/common/header/index')

const navSide = require('../../page/common/nav-side/index')
const tools = require('../../util/tools.js')
const user = require('../../service/user-service')
const templateIndex = require('./index.string')

const page = {
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo : function(){
        let userHtml = '';
        user.getUserInfo(function(res){
            userHtml = tools.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            tools.errorTips(errMsg);
        });
    }
};
$(function(){
    page.init();
});