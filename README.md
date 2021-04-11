# 不使用Vue CLI搭建Vue JSX项目

## 初始化npm

```sh
npm init
```

## 安装npm依赖

### vue

```shell
npm i vue@next
```

### webpack

```shell
npm i webpack --save-dev
npm i webpack-cli --save-dev
```

在项目根目录创建`webpack.config.js`配置文件

```js
module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.js'
    },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    }
}
```

### webpack-dev-server

```shell
npm i webpack-dev-server html-webpack-plugin --save-dev
```

在webpack配置中加入以下节点：

```js
devServer: {
  contentBase: path.resolve(__dirname, 'dist'),
  compress: true,
  port: 9000
},
plugins: [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'index.html')
  }),

],
```

### babel

官网推荐的与webpack搭配的babel配置：

```shell
npm install --save-dev babel-loader @babel/core
npm install @babel/preset-env --save-dev
```

在webpack配置中加入以下内容：

```js
{
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
```

新建babel配置文件`babel.config.json`，加入以下配置：

```json
{
  "presets": ["@babel/preset-env"]
}
```

#### @vue/babel-preset-jsx

```shell
npm install @vue/babel-preset-jsx --save-dev
```

babel配置文件中新增presets

```json
{
  "presets": ["@vue/babel-preset-jsx"]
}
```

#### @vue/babel-plugin-jsx

该插件用于自动注入h函数

```shell
npm install @vue/babel-plugin-jsx -D
```

babel配置文件中加入以下配置：

```json
{
  "plugins": ["@vue/babel-plugin-jsx"]
}
```

在webpack中配置jsx的loader：

```js
module: {
  rules: [
    {
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@vue/babel-preset-jsx"]
        }
      }
    }
  ]
}
```





