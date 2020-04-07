
const webpack = require('webpack')

const processEnv = process.env.VUE_APP_ENV; // 区分环境(值：production、development、test)
const isPro = processEnv === 'production'; // 判断production环境

const outputDir = 'dist'; // 输出文件目录（默认dist）
const assetsDir = ''; // 配置放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录

// 区分环境选择cdn地址
let publicPath = '' // 静态资源引用路径
let fontPublicPath = '' // 字体图标引用的cdn路径
let imgPublicPath = '' // css引用图片的cdn路径（c2c/static/img）
if (processEnv === 'production') {
    publicPath = 'https://abc.com/c2c/shop' // 正式环境静态资源css、js等cdn路径
    fontPublicPath = `https://abc.com/c2c/shop/${assetsDir ? assetsDir + '/' : '/'}fonts` // 正式环境字体图标引用的cdn路径
    imgPublicPath = `https://abc.com/c2c/shop/${assetsDir ? assetsDir + '/' : '/'}/img` // 正式环境css引用图片的cdn路径
} else if (processEnv === 'test') {
    // publicPath = './' // 正式环境静态资源css、js等cdn路径
    publicPath = 'https://bcd.com/c2c/shop/dist' // 测试环境静态资源css、js等cdn路径
    fontPublicPath = ''
    imgPublicPath = ''
} else {
    publicPath = '/'
    fontPublicPath = ''
    imgPublicPath = ''
}

const devServerHost = 'localhost';
const devServerPort = '8080'; // 端口号
const devServerOpen = true; // 热启动后自动打开浏览器

module.exports = {

    // 配置生成dist里面static的cdn资源路径（测试环境为./，正式环境走cdn路径）
    publicPath: publicPath,

    // 输出文件目录（默认dist）
    outputDir,

    // 配置放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir,

    lintOnSave: false, // 禁止eslint
    devServer: {
        host: devServerHost,
        port: devServerPort,
        open: devServerOpen, // 构建完成自动打开浏览器
    },

    //  webpack 配置，键值对象时会合并配置，为方法时会改写配置
    configureWebpack: config => {
        // 扩展资源，不将部分资源js等打入包内引用cdn资源
        let externals = {
            // 'swiper': 'Swiper',
        };
        config.externals = externals;

        //警告 webpack 的性能提示
        config.performance = {
            hints: isPro ? 'warning' : false, // 本地开发不显示警告
            // 入口起点的最大体积
            maxEntrypointSize: 512000, // 500kib
            // 生成文件的最大体积
            maxAssetSize: 307200, // 300kib
            // 只给出 js 文件的性能提示
            assetFilter(assetFilename) {
                return assetFilename.endsWith('.js');
            }
        };
    },

    // webpack 链接 API，用于生成和修改 webapck 配置
    chainWebpack: (config) => {
        // 取消 chunks，每个页面只对应一个单独的 JS / CSS
        config.optimization.splitChunks({
            cacheGroups: {}
        });

        // 全局配置node_modules中的模块，使用时无需引入
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            $: "n-zepto",
            Zepto: "n-zepto",
            "window.Zepto": "n-zepto"
        }]);

        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, {
                limit: 10240, // 小于10k，压缩图片 => base64
                // limit: 3000,
                publicPath: imgPublicPath,
                name: `[name].[hash:8].[ext]`
            }))

        // 设置fonts字体文件引用的路径
        config.module
            .rule('fonts')
            .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
            .use('url-loader')
            .loader('file-loader')
            .tap(options => Object.assign(options, {
                limit: 5000,
                publicPath: fontPublicPath,
                name: '[name].[hash:8].[ext]'
            }))


        // npm run report；打印app.js的模块报告，查看各个模块；
        if (processEnv === 'report') {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        }

    },

    // css配置处理
    css: {
        // 是否使用css分离插件 ExtractTextPlugin；true：页面css独立分割，false：页面css同一打包；
        extract: true,
        // 开启 CSS source maps（默认false）线上关闭，测试和本地开启
        sourceMap: isPro ? false : true,
        // css预设器配置项
        loaderOptions: {
            sass: {
                // sass的公共方法和变量，需要预编译；
                prependData: `
                    @import "@/assets/css/global.scss";
                    @import "@/assets/css/func.scss";
                `
            },
            postcss: {
                plugins: [
                    // 浏览器自动加前缀
                    require('autoprefixer')({
                        overrideBrowserslist: [
                            "Android 4.0",
                            "iOS 7",
                            "Chrome > 31",
                            "ff > 31",
                            "ie >= 8"
                        ]
                    }),
                ]
            }

        },
        // 启用 CSS modules for all css / pre-processor files.
        requireModuleExtension: false
    },

    // 构建时开启多进程处理 babel 编译
    parallel: require('os').cpus().length > 1,

    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        },

    },

    // 第三方插件配置
    pluginOptions: {
        // ...
    }

}