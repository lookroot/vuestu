# 使用webpack打包vue项目
紧接上一节 这一节我们使用 webpack来打包vue项目,还记得之前都是使用直接引入源文件的方式使用vue吗，学完这一节后就不再需要了

整个流程下来的话就和上面的 `vue-simple` 的功能差不多了，希望大家认真学习

## 初始化项目

首先新建一个空文件夹`webpackforvue`,然后控制台使用命令`npm init`初始化一个项目

安装相应的模块，首先是安装vue到本地，这次开始我们将会一直使用npm来安装vue了，在前面的课程中，我们都是使用的直接加载源文件的方式

```powershell
cnpm i vue --save
```

然后安装webpack需要的包，这里和上一节的差不多，增加了一点，大家看仔细了哈

```shell
安装 webpack ， webpack-cli和 webpack-dev-server到当前项目
cnpm i webpack webpack-dev-server  webpack-cli --save-dev
安装vue加载器
cnpm i vue-loader vue-template-compiler --dev
安装html页面打包插件
cnpm i html-webpack-plugin --dev
安装babel转化包
cnpm i install babel-loader@7 --dev
核心api包
cnpm i babel-core --dev
vue提供的规则包
cnpm i @vue/cli-plugin-babel  --dev  

```

## 配置文件

这里我们直接把上一节的`webpack.config.js`复制过来，增加`vue`的处理规则

```javascript
 module: {
     rules: [
         //css
         { test: /\.css$/, use: ['style-loader', 'css-loader'] },
         //less
         { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
         //babel转化
         { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
         // 处理.vue文件
         { test: /\.vue$/, use: 'vue-loader' }
     ]
 },
```

引入 `vue`处理模块

```javascript
const VueLoaderPlugin = require('vue-loader/lib/plugin');
```

然后在插件中使用

```javascript
 plugins: [
     new htmlWebpackPlugin({
         //模板文件地址 也就是要打包的页面文件
         template: path.join(__dirname, './public/index.html'),
         //生成在内存中的文件名
         filename: 'index.html',
         title: '我的第一个vue程序'
     }),
     //vue插件
     new VueLoaderPlugin()
 ],
```

完整配置

```javascript
//引入path模块
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//导出一个配置文件模块
module.exports = {
    //环境
    mode: 'development',
    //目标文件
    entry: [path.join(__dirname, './src/main.js')],
    //自定义输出文件
    output: {
        path: path.join(__dirname, './dist'), //路径
        filename: 'app.js'  //文件名称
    },
    //插件
    plugins: [
        //HMR 插件 如果你使用 webpack-dev-server打包 并且后面跟上了 --hot 就等同于开启了这个插件
        // new webpack.HotModuleReplacementPlugin(),
        // 打包页面文件
        new htmlWebpackPlugin({
            //模板文件地址 也就是要打包的页面文件
            template: path.join(__dirname, './public/index.html'),
            //生成在内存中的文件名
            filename: 'index.html',
            title: '我的第一个vue程序'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            //css
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            //less
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            //babel转化
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            // 处理.vue文件
            { test: /\.vue$/, use: 'vue-loader' }
        ]
    },
}
```

在`package.json`中增加项目运行命令

```json
 "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
   "server": "webpack-dev-server --open --port 8081 --hot"
 },
```

在项目根目录创建`babel.config.js`babel配置文件

```javascript
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
```

## 初始化项目文件

新建一个`public`和`src`目录，并且在`public`目录下新建`index.html`作为主页面，在`src`目录下新建`App.vue`和`main.js`作为项目入口文件,这种`App.vue`以`.vue`结尾的文件其实就是组件，我们今后都会将之前的组件写在每个单独的文件里面，真正的实现模块化开发


index.html内容

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>

<body>
  <div id="app">
  </div>
</body>

</html>
```

因为使用了`webpack`打包我们终于可以愉快地使用模块导入导出啦！并且实现真正的组件开发，来到`main.js`文件

首先使用`import`引入`vue.js`,然后初始化一个vue，这里和我们前面讲的vue基础是一样的，忘记了的朋友可以返回去看一看

```javascript
//引入vue
import Vue from 'vue'
//关闭生产环境的消息提示
Vue.config.productionTip = false
//实例化vue
new Vue({
  created() {
    console.log('我是第一个vue');
  },
  components: {
    com1: {
      template: '<h1 >我是私有组件</h1>',
    }
  },
  el: '#app'
})
```

然后我们在`index.html`中使用 `com1`这个组件

```html
<body>
  <div id="app">
    <com1></com1>
  </div>
</body>
```

使用`cnpm run server`运行打包项目，然后打包控制台我们发现报错了

![image-20200426152854032](https://img.lookroot.cn/blog/202004/26/152854-318977.png)

这个报错的原因是我们之前引入的vue文件是完整vue文件`Runtime+Compiler`,而刚刚在项目中import引入的vue是`Runtime-Only`版本的不支持直接使用`template`来定义组件

这里我们修改`webpack.config.js`配置文件，在`module`节点后面添加

```javascript
 module: {
    ...
 },
 resolve: {
     alias: {
         "vue$": 'vue/dist/vue.js'
     }
 }
```

这样的话 `import`导入就是完整版的vue文件了，重新运行打包

![image-20200426152904235](https://img.lookroot.cn/blog/202004/26/152904-480474.png)

成功运行，现在你随便修改文件再保存，页面就会自动刷新啦！

## 使用Runtime-Only版本vue

上面大家也会疑惑啊，不是说真组件开发吗，怎么还是写在这一个js文件里面啊，好的这一节我们使用`Runtime-Only`版本进行开发

首先注释掉刚刚的vue实例，我们重新实例化一个 并且使用`render`渲染函数，将一个页面渲染进入，作为项目的入口页面，这个页面就是刚刚创建的`App.vue`

App.vue内容，和我们之前直接在页面中定义的组件写法是一样的

```javascript
<template>
  <div>我是组件</div>
</template>
<script>
export default {
  created() {
    console.log("我是组件");
  }
};
</script>

```

来到`main.js`，导入`App.vue`文件

```
import App from './App.vue'
```

然后实例化`vue`

```javascript
new Vue({
  // render: h => h(App),
  // 渲染函数 把引入的App.vue传递渲染进入 作为初始页面文件
  render: function (h) {
    return h(App);
  },
  el: '#app'
})
```

这个时候我们重新运行项目，查看浏览器

![image-20200426152928665](https://img.lookroot.cn/blog/202004/26/152929-604937.png)




## 组件内的`css`和`css`预处理器打包

上面已经完成了组件化开发，这里我们讲如何在每个组件页面里面单独写css文件

首先和上面一样安装`css`加载器,规则之前就定义好了的

```
cnpm i style-loader css-loader less-loader less --dev 
```

然后我们修改`App.vue`文件,直接在里面使用`style`标签

```vue
<template>
  <div class="title">我是组件</div>
</template>
<script>
export default {
  created() {
    console.log("我是组件");
  }
};
</script>
<style >
.title {
  color: red;
  font-size: 48px;
}
</style>
```

保存查看浏览器效果

![image-20200426152939140](https://img.lookroot.cn/blog/202004/26/152939-540133.png)

## vue渐进式开发

这样就完成第一个组件的开发了，现在我们就可以在这个`App.vue`又导入其他的`xxx.vue`文件并使用，就像套娃一样，这就是vuejs的渐进式开发

我们在src目录下新建`components`目录并创建`one.vue`文件，文件内容

```html
<template>
  <div class="title">我是第一个子组件</div>
</template>
```

我们来到`App.vue`中使用这个组件

```vue
<template>
  <div class="title">
    我是组件
    <!-- 使用one组件 -->
    <one></one>
  </div>
</template>
<script>
// 引入 one 组件
import one from "./components/one.vue";
export default {
  created() {
    console.log("我是组件");
  },
  //注册组件
  components: {
    one
  }
};
</script>
<style >
.title {
  color: red;
  font-size: 48px;
}
</style>
```

查看页面

![image-20200426152947614](https://img.lookroot.cn/blog/202005/03/232530-253932.png)