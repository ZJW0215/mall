require('./index.css')
const tools = require('../../../util/tools')

/* 通用头部 */
const header = {
    init: function() {
        this.bindEvent()
        this.onLoad()
    },
    /* 组件加载时处理的事件 */
    onLoad: function() {
        const keyword = tools.getUrlParam('keyword')
        /* 如果keyword存在，则回填输入框 */
        if(keyword) {
            $('#search-input').val(keyword)
        }
    },
    bindEvent: function() {
        const that = this
        /* 点击搜索按钮后进行提交 */
        $('#search-btn').click(function() {
            that.searchCommit()
        })
        /* 点击回车后，进行搜索提交 */
        $('#search-input').keyup(function(e) {
            /* 回车键keyCode为13 */
            if(e.keyCode === 13) {
                that.searchCommit()
            }
        })
    },
    /* 搜索提交事件 */
    searchCommit: function() {
        const keyword = $.trim($('#search-input').val())
        /* 如果存在keyword，则跳转到list页面 */
        if(keyword) {
            window.location.href = './list.html?keyword=' + keyword
        } else {
            /* 如果keyword为空，则返回首页 */
            tools.skipHome()
        }
    }
}

header.init()