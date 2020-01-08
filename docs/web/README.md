# webpack学习笔记

> 2019.11.03 网易云课堂笔记

webpack是用nodejs开发的一个前端打包工具，webpack根据其配置参数进行对应的打包工作。<br />js规范主要有三类 commonjs、AMD、ES6Module，而webpack是使用nodejs开发的，nodejs遵循commonjs规范所以webpack的配置也需要遵循commonjs规范。

![](./img/webpack.png)

# 核心配置项
loader的配置options可以放在独立的.babelrc文件中减少webpack.config.js内容。
```javascript
//webpack.config.js文件
module.exports = {
	entry: {
  	app:'./app.js'
  },
  output: {
    path:__disname,
  	filename: '[name].[hash:8].js'
  },
  module: {
  	rules: [
      {
      	test: /\.js$/,
        use: {
        	loader: 'babel-loader',
          options: { //babel-loader配置 当配置比较对的时候可以独立到.babelrc文件去
          	presets: [ //babel-preset配置
            	['@babel/preset-env',{
              	targets: { //babel-preset-env配置
                	browsers: ['>!%'] //编译成大于市场1%使用的浏览器
                  //node: '10' //以兼容node版本10进行打包
                  //chrome: '59' //以兼容chrome版本59进行打包
                }
              }]
            ]
          }
        }
      }
    ]
  }
}
```
babel-loader配置也可以独立放在一个文件里面但是名字必须是".babelrc"

```javascript
//webpack.config.js文件
module.exports = {
	entry: {
  	app:'./app.js'
  },
  output: {
    path:__disname,
  	filename: '[name].[hash:8].js'
  },
  module: {
  	rules: [
      {
      	test: /\.js$/,
        use: {
        	loader: 'babel-loader',//babel-loader配置 当配置比较对的时候可以独立到.babelrc文件去
        }
      }
    ]
  }
}
```

```json
//.babelrc文件
{
  //babel-loader配置
  "presets": [ //babel-preset配置 ES6语法转换不包含ES6方法
    ['@babel/preset-env',{
      "targets": { //babel-preset-env配置
        "browsers": ['>!%'] //编译成大于市场1%使用的浏览器
        //"node": '10' //以兼容node版本10进行打包
        //"chrome": '59' //以兼容chrome版本59进行打包
      }
    }]
  ],
  "plugins": [ 
    ['@babel/transform-runtime'] //ES6方法转换
  ]
}
```
 


## entry
> 打包入口文件



## output
> 打包输出文件



## module
> 打包规则


### 常见转换loader

#### babel-loader
> ES6语法转换但是不能转换ES6方法,方法转换需要另一个loader,babel-polyfill


#### babel-preset-xxx
> ES6转换规则配合babel-loader使用。babel-preset有个核心配置target一般用来指定转换规则

- 常见规则:

babel-preset-es2015<br />babel-preset-es2016<br />babel-preset-es2017<br />babel-reset-env(通常采用这种)<br />babel-preset-stage<br />

- babel-preset核心配置target:

以browsers(浏览器)为目标(通常使用这个)
```javascript
//webpack.config.js文件中
presets: [ //babel-preset配置
            	['@babel/preset-env',{
              	targets: { //babel-preset-env配置
                	browsers: ['>!%'] //编译成大于市场1%使用的浏览器
                }
              }]
            ]
```

以node的版本为目标
```javascript
//webpack.cofig.js文件中
presets: [ //babel-preset配置
            	['@babel/preset-env',{
              	targets: { //babel-preset-env配置
                	node: '10' //以兼容node版本10进行打包
                }
              }]
            ]
```

以特定的浏览器为目标

```javascript
//webpack.config.js文件中
presets: [ //babel-preset配置
            	['@babel/preset-env',{
              	targets: { //babel-preset-env配置
                	chrome: '59' //以兼容chrome版本59进行打包
                }
              }]
            ]
```


#### babel-polyfill
> ES6方法转换方式一 一般项目开发使用 生成一个全局对象

使用直接在入口引入使用

```javascript
#方式一在app.js入口引入
import 'babel-polfill'

#方式二在webpack.config.js入口配置
entry:{
	app: ['babel-polfill','./app.js']
}
```


#### babel-plugin-transform-runtime 和babel-runtime
> ES6方法转换方式二 一般框架开发使用 生成一个局部对象


```json
//.babelrc文件中
{
	"plugins": [ 
    ['@babel/transform-runtime'] //ES6方法转换
  ]
}
```


#### typescript和ts-loader
> ts-loader配置tsconfig.json


```javascript
//webpack.config.js文件
module:{
	rules:[
    {
    	test:/\.tsx?$/,
      use:'ts-loader'
    }
  ]
}
```

```json
//tsconfig.json文件
{
	"CompilerOptions":{
  	"module":"commonjs",
    "target":"es5"
  },
  "exclude":["./mode_modules"]
}
```


#### css-loader和style-loader
> css编译 加载时css-loader需要在style-loader之前，所以在webpack.config.js中style-loader要写在css-loader之前因为数组是从后向前加载的。

**css-loader**<br />module: 是否使用css模块化<br />minimize: webpack3及以前的css压缩<br />alias: webpack3及以前的css中的全局别名

**style-loader**<br />insertAt: style标签插入在那一块区域<br />insertInto: 插入指定的dom<br />singleton: 是否合并为一个style标签<br />transform: 在浏览器环境下，插入style到页面前，用js对css进行操作

```javascript
//webpack.config.js
module: {
	rules: [
  	test: /\.css$/,
    use: [
    {
    	loader:'style-loader',
    	options:{
    		insertInto:"#mydiv",//将style插入到指定位置
    		singletion:true //多个style合并为一个文件
    	}
    },
      {
      	loader:'css-loader',//因为css-loader要在style-loaer之前加载所以放在后面 这里后面的先加载
      }
		]
  ]
}
```


#### less和less-loader


#### sass-loader和node-sass




## plugins
> webpack插件




#### extract-text-webpack-plugin
> css提取为单独的文件
> 把use改为使用extract-text-webpack-plugin
> 把extract-text-webpack-plugin加入到plugins里面


webpack4需要指定版本和安装局部webpack<br /> npm install extract-text-webpack-plugin@next  webpack --save

```javascript
//webpack.config.js
module: {
	rules: [
  	test: /\.css$/,
    use: extractTextCss.extract({
    	fallback:{
    		loader:'style-loader',
    		options:{
    			singletion:true,
    			transfrom:'./transfrom.js'
    		}
    	},
        use:[
          {
            loader:'style-loader',
            options:{
              insertInto:"#mydiv",//将style插入到指定位置
              singletion:true //多个style合并为一个文件
            }
          },
          {
            loader:'css-loader',//因为css-loader要在style-loaer之前加载所以放在后面 这里后面的先加载
          }
        ]
    })
  ]
}
```

