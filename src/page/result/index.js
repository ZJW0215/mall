require('./index.css')
require('../common/nav-simple/index')
const tools = require('../../util/tools')

$(function() {
    const type = tools.getUrlParam('type') || 'default'
    const $element= $('.' + type + '-success')
    $element.show()
})