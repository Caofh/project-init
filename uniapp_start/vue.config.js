


const path = require('path')


// 合并路径
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {

    // webpack 链接 API，用于生成和修改 webapck 配置
    chainWebpack: (config) => {
        // console.log(config.resolve.alias)

        config.module
        .rule('images')
        // .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/i)
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, {
            limit: 10240, // 小于10k，压缩图片 => base64
        }))

        // 配置别名
        config.resolve.alias
        .set('@', resolve('src')) // @ => 执行src目录




    },

}