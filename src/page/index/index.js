require('./index.css')
require('../../page/common/nav/index')
require('../../page/common/header/index')
require('../../util/slider/index')

const navSide = require('../../page/common/nav-side/index')
const templateBanner = require('./index.string')
const tools = require('../../util/tools')

$(function() {
    /* 渲染banner */
    const bannerHtml = tools.renderHtml(templateBanner)
    $('.banner-con').html(bannerHtml)
    /* 初始化banner */
    const slider = $('.banner').unslider({
        dots: true
    })

    /* 前一张、后一张图片按钮事件绑定 */
    $('.banner-con .banner-arrow').click(function() {
        const forward = $(this).hasClass('prev') ? 'prev' : 'next'
        slider.data('unslider')[forward]()
    })

})