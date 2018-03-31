const path = require('path')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const { WebPlugin } = require('web-webpack-plugin')
module.exports = {
  entry: {
    app: './main.js' //app的javascript执行入口文件
  },
  output: {
    filename: '[name]_[chunkhash:8].js',//为输出的文件名称加上Hash值
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        // 排除node_modules目录下的文件
        // 该目录下的文件都是采用ES5语法，没必要再通过Babel转换
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.css$/, //增加对css文件的支持
        // 提取出Chunk中的css代码到单独的文件中
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize'] //压缩CSS代码
        })
      }
    ]
  },
  plugins: [
    // 一个WebPlugin对应一个html文件
    new WebPlugin({
      template: './template.html', //html模块文件所在的文件路径
      filename: 'index.html', //输出的html的文件名称
    }),
    new ExtractTextPlugin({
      filename: `[name]_[contenthash].css` //为输出的css文件名称加上hash值
    }),
    new DefinePlugin({
    //   定义NODE_ENV环境变量为production，以去除源码中只有开发时才需要的部分
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // 压缩输出的javascript代码
    new UglifyJsPlugin({
    //   最紧凑的输出
      beautify: false,
    //   删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJS删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所以的`console`语句，可以兼容IE浏览器
        drop_console: true,
        // 内嵌已定义但是只用到了一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量取引用的静态值
        reduce_vars: true
      }
    })
  ]
}