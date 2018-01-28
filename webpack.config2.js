/*
    主题：plugin学习
    时间：20180128
*/

/*
   plugin是用来扩展webpack功能的，通过在构建流程里注入钩子实现
   本次代码是通过plugin把注入到bundle.js文件里的CSS提取到单独的文件中
   使用插件：ExtractTextPlugin
*/
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    // javascript 执行入口文件
    entry: './src/main.js',
    output: {
        // 把所有依赖的模板合并输出一个bundle.js文件
        filename: 'bundle.js',
        // 输出文件都放到dist目录下
        path: path.resolve(__dirname + "/dist")
    },
    module: {
        rules: [
            {
                // 用正则匹配要用该loader转换的CSS文件
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    // 转换.css文件需要使用的Loader
                    use: ['css-loader'],
                })
            }
        ]
    }, 
    plugins: [
        new ExtractTextPlugin({
            // 从.js文件中提取出来的.css文件的名称
            // 通过插件的filename属性，告诉插件输出的css文件名称是通过[name]_[contenthash:8].css 字符串模版生成的，
            // 里面的 [name] 代表文件名称， [contenthash:8] 代表根据文件内容算出的8位 hash 值
            filename: `style.css`
        })
    ],
    watch: true,
    watchOptions: {
        ignored: /node_modules|dist|build|dosc|css/
    }
} 