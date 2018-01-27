/*
    主题：loader学习
    时间：20180127
*/

/*
    webpack不原生支持解析CSS文件。要支持非javascript类型文件
    需要使用webpack的loader机制，将css文件转换成js文件
*/
const webpack = require('webpack');
const path = require('path');
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
                // loader的执行顺序是由后到前的，如下先css-loader,后style-loader
                use: ['style-loader','css-loader']
            }
        ]
    }, 
    watch: true,
    watchOptions: {
        ignored: /node_modules|dist|build|dosc|css/
    }
}
// console.log(path.resolve(__dirname)+"/dist");  