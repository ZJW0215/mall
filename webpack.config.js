const webpack = require('webpack')
const path = require('path')
/* 生成html页面插件 */
const HTMLWebpackPlugin = require('html-webpack-plugin')
/* 对css文件进行单独打包 */
const MiniCssExtract = require('mini-css-extract-plugin')

/* 获取html-webpack-plugin的参数 */
const getHtmlTemplate = function(name, title) {
    return {
        template: path.join(__dirname, './src/view/' + name + '.html'),
        filename: 'view/'+ name + '.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['commons', name]
    }
}

/* webpack环境变量配置 dev，online*/
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

/* webpack config*/
const config = {
    entry: {
        'commons': path.join(__dirname, './src/page/common/index.js'),
        'index': path.join(__dirname, './src/page/index/index.js'),
        'list': path.join(__dirname, './src/page/list/index.js'),
        'user-login': path.join(__dirname, './src/page/user-login/index.js'),
        'user-register': path.join(__dirname, './src/page/user-register/index.js'),
        'user-pass-reset': path.join(__dirname, './src/page/user-pass-reset/index.js'),
        'user-center': path.join(__dirname, './src/page/user-center/index.js'),
        'user-center-update': path.join(__dirname, './src/page/user-center-update/index.js'),
        'result': path.join(__dirname, './src/page/result/index.js'),
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/',
        filename: 'js/[name].js'
    },
    /* 加载外部的变量或者模块 */
    externals: {
        'jquery': 'window.jQuery'
    },
    resolve: {
      extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(__dirname, './node_modules')
                ]
            },
            {
                test: /\.css$/,
                loader: [
                    MiniCssExtract.loader,
                    'css-loader'
                ],

            },
            {
                /* 对以为结尾或者带参数的图片处理 */
                test: /\.(gif|jpg|svg|png|woff|ttf|eot)\??.*$/,
                loader: ['url-loader?limit=100&name=resource/[name].[ext]'],
            },
            {
                test: /.string$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        /* 生成html页面同时将前面的entry注入到html页面中，路径、名字都是配置中的 */
        new HTMLWebpackPlugin(getHtmlTemplate('index', '首页')),
        new HTMLWebpackPlugin(getHtmlTemplate('list', '商品列表页')),
        new HTMLWebpackPlugin(getHtmlTemplate('user-login', '用户登录')),
        new HTMLWebpackPlugin(getHtmlTemplate('user-register', '用户注册')),
        new HTMLWebpackPlugin(getHtmlTemplate('user-pass-reset', '找回密码')),
        new HTMLWebpackPlugin(getHtmlTemplate('user-center', '个人中心')),
        new HTMLWebpackPlugin(getHtmlTemplate('user-center-update', '修改跟人信息')),
        new HTMLWebpackPlugin(getHtmlTemplate('result', '操作结果')),
        /* 提取公共模块 */
        new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                /* split 公共代码块到commons.js文件中 */
                commons: {
                    name: 'commons',
                    priority: 10,
                    // enforce: true
                }
                // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css`
                // 没找到可打包文件的话，则没有。
                // css需要依赖 `ExtractTextPlugin`
                // vendor: {
                //     test: /node_modules\//,
                //     name: 'page/vendor',
                //     priority: 10,
                //     enforce: true
                // },
            }
        }),
        /* 对css进行单独打包 */
        new MiniCssExtract({
            filename: 'css/[name].css'
        })
    ]
}

// if(WEBPACK_ENV === 'dev') {
//     config.entry.commons.push('webpack-dev-server/client?http://localhost:8088')
// }

module.exports = config