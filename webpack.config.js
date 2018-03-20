var path = require('path');//配置好的默认路径
var webpack = require('webpack');//

module.exports = {
  //context: path.resolve(__dirname, 'app')设置根目录，默认以webpack所在目录做根目录
  entry: './src/main.js',//string、array、object['./app/entry1', './app/entry2']//{ a: './app/entry-a', b: ['./app/entry-b1', './app/entry-b2']}
  output: {
    path: path.resolve(__dirname, './dist'),//保存路径
    publicPath: '/dist/',//构建后的路径？？服务器地址下对应的js输出路径
    filename: 'build.js'//转换后的文件名
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.resolve(__dirname,'./src'),
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,//支持数组格式[/\.vue$/,/\.vue$/] exclude与include也是
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }

      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',//默认路径node_modules
    }
  },
  devServer: {
    contentBase: "./src",//配置 DevServer HTTP 服务器的文件根目录
    historyApiFallback: true,//使用与一个单页应用，如果有多个单页应用组成，则需要进行更多配置
    noInfo: true,//？？
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
