require('./index.css')
const tools = require('../../../util/tools')
const templateIndex = require('./index.string')

const navSide = {
    option: {
        name: '',
        navList: [
            {name: 'user-center', desc: '个人中心', href: './user-center.html'},
            {name: 'order-list', desc: '我的订单', href: './order-list.html'},
            {name: 'pass-update', desc: '修改密码', href: './pass-update.html'},
            {name: 'about', desc: '关于我们', href: './about.html'},
        ]
    },
    init: function(option) {
        /* 当用户输入了option时，要合并默认选项 */
        $.extend(this.option, option)
        this.renderNav()
    },
    renderNav: function () {
        const len = this.option.navList.length
        /* 计算active的li的数据 */
        for(let i = 0; i < len; i ++){
            if(this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true
            }
        }
        /* 渲染HTML */
        const html = tools.renderHtml(templateIndex, {
            navList:this.option.navList
        })
        /* 放入容器 */
        $('.nav-side').html(html)
    }
}

module.exports = navSide