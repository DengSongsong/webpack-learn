/*
    主题：loader学习
    时间：20170127
*/
const webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname + "/dist")
    },
    module: {
        rules: [
            {
                test: /\.css/,
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