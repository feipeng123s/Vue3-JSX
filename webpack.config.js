const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 9000,
        // https: true
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html')
        }),

    ],
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"]
              }
            }
          },
          {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@vue/babel-preset-jsx"]
              }
            }
          },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader", "postcss-loader"]
          },
          {
            test: /\.less$/i,
            use: [
              {
                loader: "style-loader",
              },
              {
                loader: "css-loader",
              },
              {
                loader: "less-loader",
                options: {
                  lessOptions: {
                    strictMath: true,
                  },
                },
              },
            ]
          },
          {
            test: /\.(eot|woff2?|ttf|svg)$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  name: "[name]-[hash:5].min.[ext]",
                  limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                  publicPath: "fonts/",
                  outputPath: "fonts/"
                }
              }
            ]
          }
        ]
    }
}