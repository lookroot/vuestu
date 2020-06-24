# webpack的入门实践

> 我会将所有的读者概括为初学者，即使你可能有基础，学习本节之前我希望你具有一定的JavaScript和node基础

- 文中的 `... ...`代表省略掉部分代码，和上面的代码相同
- 文中的文件夹如果没有说创建，并且项目默认没有的是需要你手动增加的
- 不会特别细致，但是足够入门

## 什么是webpack

> Web浏览器使用HTML，CSS和JavaScript。随着项目的发展，跟踪和配置所有这些文件变得非常复杂,解决这个问题就需要一个新的工具

类似**webpack**的工具还有**Grunt**和**Gulp**，**webpack**是模块管理工具，把你的项目按照你的想法进行划分模块打包，举个最简单的例子，这个页面需要加载一个 `a.js`和`b.js`，但是你只想加载一个js文件，就可以使用**webpack**将两个文件进行合并，当然**webpack**的功能不止于此，代码转化、项目优化、代码分割、代码预编译、自动构建、自动刷新...

再比如你想你的代码兼容其他老的浏览器，你的css代码兼容不同的浏览器内核，或者你想自动精简掉你写了但是没有用到的代码，这些都可以使用webpack实现

如果你是**vue**或者**react**等框架的使用者，肯定使用过 **vue-cli** 或 **react-create-app** 这类脚手架工具，那么实现这个效果，就要学习**webpack**

![image-20200619164043421](https://img.lookroot.cn/blog/202006/19/164044-70776.png)

## 快速入门

> 注意本文都是webpack4的内容

### 安装

创建一个 **webpackdemo**文件夹，使用命令`npm init -y`快速初始化一个项目

安装 **webpack**可以使用全局安装

```sh
npm install webpack -g
```

但是我更推荐你在每个项目里面单独引入，这样可以控制版本,如果你使用 webpack 4+ 版本，你还需要安装 CLI。

```sh
npm install -D webpack@<version>
npm install -D webpack-cli
```

**本文默认使用项目引入的方式**，我们在根目录下新建 **src/index.js**，webpack在不进行任何配置的情况下，会默认寻找这个文件

然后命令行执行`node_modules\.bin\webpack`,如果你是全局安装的可以直接使用`webpack`命令

![image-20200615221322815](https://img.lookroot.cn/blog/202006/15/221324-938393.png)

注意此时命令行爆黄色警告，这是没有指定当前模式的原因，并且可以发现，目录下多了一个 `dist/main.js`文件，这便是默认的输出文件

为了体验项目的打包，我们新建一个`src/clg.js`文件

```javascript
export default function clg(msg) {
    console.log(msg);
}
```

我们在`index.js`里面导入并使用

```javascript
import clg from './clg';
clg('webpack init');
```

然后根目录我们新建一个 `index.html`文件，引入打包后的文件

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="./dist/main.js"></script>
</head>
<body>
</body>
</html>
```

然后修改一下打包命令,指定当前为开发模式，再次运行`.\node_modules\.bin\webpack --mode development`

这次打包没有爆警告，并且我们打开`index.html`控制台查看结果

![image-20200615223249379](https://img.lookroot.cn/blog/202006/15/223251-587807.png)

### webpack.config.js配置文件

在前面，我们都是使用`webpack-cli`为我们提供的默认配置，如果我们想使用**webpack**更强大的功能还是需要自定义配置文件的，在根目录新建**webpack.config.js**，执行**webpack**命令的时候会自动找到它

```javascript
const path = require('path');

module.exports = {
    // 环境
    mode: 'development',
    // 目标文件
    entry: [path.resolve(__dirname, './src/index.js')],
    // 自定义输出文件
    output: {
        path: path.resolve(__dirname, './dist'), //路径
        filename: 'main.js' //文件名称
    },
    // 插件
    plugins: [

    ],
    // 给导入的文件制定规则
    module: {

    }
}
```

为了方便调试，我们在 `package.json`中添加命令，此时执行命令`npm run dev`或`npm run build`就非常方便了

> 注意 **scripts**命令里面可省略 `.\node_modules\.bin\`使用` npx webpack`也是这个效果

```json
 "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
   "dev":"webpack --mode development",
   "build":"webpack --mode production"
 },
```

### 多个目标和输出文件

在上面是一个目标文件`index.js`和一个输出文件`main.js`，如果我们想要对多个目标文件进行打包，且输出多个文件该怎么办呢？我们在根目录新建一个 `other.js`

首先我们将**entry**修改为多个目标文件，并设置一个`键`名，然后修改输出文件的名称为变量`[name]`

```javascript
const path = require('path');
module.exports = {
    // 环境
   mode: 'development',
    // 目标文件
   entry: {
        index: path.resolve(__dirname, './src/index.js'),
        other: path.resolve(__dirname, './src/other.js')
    },
    // [path.resolve(__dirname, './src/index.js'), path.resolve(__dirname, './src/other.js')],
    // 自定义输出文件
    output: {
        path: path.resolve(__dirname, './dist'), //路径
        filename: '[name].bundle.js' //文件名称
    },
}
```

此时我们执行 `npm run build`可发现**dist**目录的多个js文件

### 使用插件来测试程序

在上面，我们自己创建了一个 `index.html`文件来测试我们打包的文件是否正常，其实**webpack**为我们提供了更为自动的方式，在这里我们将使用第一个webpcak插件`html-webpack-plugin`,首先需要安装它

```sh
npm i html-webpack-plugin -D
```

然后我们在 `webpack.config.js`中配置使用这个插件

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // 目标文件
    entry: {
        index: path.resolve(__dirname, './src/index.js'),
        other: path.resolve(__dirname, './src/other.js'),
    },
    // 自定义输出文件
    output: {
        path: path.resolve(__dirname, './dist'), //路径
        filename: 'main.js' //文件名称
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack init",
        }),
    ],
}
```

此时，我们删除 `index.html`文件，然后再次执行`npm run build`可以发现，webpack自动为我们创建了一个`indedx.html`文件，并引入了打包后的js文件

### 多个页面

在上面，我们都是使用的一个 `index.html`单页面，实际开发中渐进式的单页面程序也比较多，但是还是会有多页面的场景

简单的修改一下`webpack.config.js`,多次实例化插件就可以了，`filename`为输出文件名，`chunks`为这个页面需要使用的js文件，当然如果你不是使用的自动生成页面，可以使用`template`属性指定你的页面位置

```javascript
module.exports = {
    ... ... 
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            filename:"index.html",
            title: "Webpack init",
            chunks:['index']
        }),
        new HtmlWebpackPlugin({
            filename:"other.html",
            title: "Webpack init",
            chunks:['other']
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
    ],
    ... ...
}
```

此时我们使用`npm run dev`,此时可以发现`dist`目录输出了两个页面并引入不同的js文件

## source map

打包后的js文件都混淆到了一个或者多个文件中，丢失了原本的文件格式，如果在运行过程中出现bug，很难定位原本的错误位置 **source map** 就可以解决这个问题

> 为了更容易地追踪错误和警告，JavaScript 提供了 [source map](http://blog.teamtreehouse.com/introduction-source-maps) 功能，将编译后的代码映射回原始源代码。如果一个错误来自于 `b.js`，source map 就会明确的告诉你。

开启 source map 非常简单，只需要在配置文件`webpack.config.js`中增加

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
	... ...
    devtool: "cheap-module-eval-source-map",
 	... ...
}
```

为了验证是否生效，我们在`other.js`中增加

```javascript
console.log('other');
console.error("error")
```

然后使用`npm run dev`，接着在控制台查看错误并点击，便能跳转到出错的位置

![image-20200617182636377](https://img.lookroot.cn/blog/202006/17/182637-377527.png)

**devtool**有多个模式，不同的性能和品质，开发环境中我们希望性能更好，生产环境我们希望质量更好[详细配置](https://webpack.js.org/configuration/devtool/)

开发环境可以使用`cheap-module-eval-source-map、eval 、eval-source-map`

生产环境可以使用`inline-source-map、inline-cheap-module-source-map、cheap-source-map`

## 观察模式和webpack-dev-server

在上面的内容中，每次修改内容后都需要手动执行构建命令，**webpack**为我们提供了更为自动的方法

### 观察模式

我们只需简单的修改一下命令`npm run dev --watch`,同样的我们为了方便，可以直接将命令写入 `package.json`中

```json
 "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
   "dev": "webpack --mode development",
   "build": "webpack --mode production",
   "watch":"webpack --mode production --watch"
 },
```

此时，我们执行`npm run watch`命令后，只要修改文件中的内容，**webpack**即可自动构建

### webpack-dev-server

但是在实际开发中，使用**webpack-dev-server**（简称wds）更为方便，它为我们提供了一个简单的服务器，并且浏览器能够实时加载，也就是说，当你修改文件保存后，浏览器可自动加载最新的内容，并且这一切都是发生在内存中，构建速度更快

安装

```sh
npm i webpack-dev-server -D
```

同样的我们在 `package.json`中添加一个命令

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack --mode development",
  "build": "webpack --mode production",
  "watch": "webpack --mode production --watch",
  "server": "webpack-dev-server --mode development"
},
```

此时，我们只需执行`npm run server`，**webpack**便可自动创建一个服务器，并将项目运行在其中，当我们修改文件中的任意内容的时候，页面便会自动刷新

![image-20200616123613821](https://img.lookroot.cn/blog/202006/16/123615-47203.png)

如果使用过 **vscode**的插件**live server**的同学，不难发现，这就是类似的功能

我们还可以在 `webpack.config.js`中进一步的对 **wds**进行配置

```javascript
module.exports = {
	... ...
    devServer: {
     /**
      * 日志模式  friendly-errors-webpack-plugin 插件可以优化输出
      * errors-only  只在发生错误时触发
      * minimal 只在发生错误或者有新的编译时输出
      * none 没有输出
      * normal 标准输出
      * verbose 全部输出
      */
     stats: "errors-only",
     //默认地址 localhost
     host: process.env.HOST,
     //默认端口 8080
     port: process.env.PORT,
     //是否直接打开浏览器
     open: true,
 },
   ... ...
}
```

此时我们再次运行 `npm run server`,**webpack**便能按照我们的配置来构建了

## HMR

> 模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。

在上面的内容中，我们修改文件的部分内容，**webpack**都需要将项目重新构建并通知浏览器重新渲染，这个过程十分浪费资源，使用 **HMR**就可以实现，修改哪里，重新加载哪里的这个效果

**NamedModulesPlugin**插件是在热加载时直接返回更新文件名

使用 **HMR**我们只需要简单的配置即可

**webpack.config.js**

```javascript
... ... 
const webpack = require('webpack');
module.exports = {
	... ...
    // 插件
    plugins: [
      	... ...
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
		... ...
        //是否开启热更替
        hot: true
    },
}
```

为了验证是否是局部更替，我么修改一下文件内容

index.js

```javascript
import clg from './clg';
console.log('webpack init');

// module.hot Webpack通过全局变量公开HMR接口
if (module.hot) {
    module.hot.accept('./clg.js', function () {
        clg('检测到clg模块修改');
    })
}
```

此时我们使用 `npm run server` 将项目运行起来，简单的修改 **index.js**文件中内容，发现控制台只打印了

![image-20200616132338239](https://img.lookroot.cn/blog/202006/16/132338-870587.png)

我们再次修改`clg.js`中内容，打个空格再保存即可，此时验证了我们想要的效果

![image-20200616132446364](https://img.lookroot.cn/blog/202006/16/132447-995708.png)

## 生产环境和开发环境分离

> *开发环境(development)*和*生产环境(production)*的构建目标差异很大,官方建议为每个环境编写**彼此独立的 webpack 配置**。

我们将新建两个配置文件`webpack.dev.js（开发环境）`和`webpack.prod.js（生产环境）`但是它们具有很多相同的配置，所以我们再新建一个`webpack.common.js(通用配置)`文件

我们使用`webpack-merge`插件来将不同的环境配置文件和通用配置文件进行合并，并且使用`clean-webpack-plugin`插件来每次重置我们的构建文件夹

```sh
npm i webpack-merge -D
npm i clean-webpack-plugin -D
```

**webpack.common.js**

```javascript
const path = require('path');
const webpack = require('webpack');
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: [path.resolve(__dirname, './src/index.js')],
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack init'
        })
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            
        ]
    }
};
```

**webpack.dev.js**

我们再开发环境配置文件中配置 **server**的相关信息，并且打开**source-map**

```javascript
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode:"development",
    devtool: 'eval',
    devServer: {
        stats: "errors-only",
        //默认地址 localhost
        host: process.env.HOST,
        //默认端口 8080
        port: process.env.PORT,
        //是否直接打开浏览器
        open: true,
        //是否开启热更替
        hot: true,
    },
    module: {
        rules: [
            //打包css文件的规则
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
});
```

**webpack.prod.js**

我们在生产环境配置文件中省略掉其他配置文件

```javascript
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: "production",
    
});
```

然后我们在 **package.json**增加一些命令

```json
"envdev":"webpack-dev-server --config webpack.dev.js",
"envbuild":"webpack --config webpack.prod.js"
```

此时，我们的项目构建就更加清晰了

## 管理资源文件

**webpack**不仅仅是打包 js文件这么简单，此处我们简单的介绍几个常用的资源打包方式，更详细的内容可以参考[官方文档](https://www.webpackjs.com/guides/asset-management/)

### 管理css

使用过脚手架的同学应该都记得，项目里面的css文件可以通过js直接引入的方式使用

```javascript
import 'xxx.css';
```

来简单实践一下，首先安装插件

```sh
npm i  style-loader css-loader -D
```

为了展示我们的打包效果，我们新建一个 `js/divdoc.js`文件用来在页面中渲染出一个字符串（此时我们已将clg.js也转移到 `./js` 文件夹）

```javascript
export default function divdoc() {
    //创建一个dom
    let element = document.createElement('div');
    element.innerHTML = "webpack init";
    element.classList.add('init');
    //将dom渲染到页面上
    document.body.appendChild(element);
}
```

在**index.js**中导入并使用

```javascript
import clg from './js/clg';
import divdoc from './js/divdoc';
console.log('webpack init now');

divdoc();

// module.hot Webpack通过全局变量公开HMR接口
if (module.hot) {
    module.hot.accept('./js/clg.js', function () {
        clg('检测到clg模块修改');
    })
}
```

此时运行 `npm run server`查看效果

![image-20200616142734988](https://img.lookroot.cn/blog/202006/16/142735-879392.png)

接下来我们新建 `src/css/app.css`文件

> 我们前面渲染的**dom**节点是包含一个 **class**名为 **init**的

```css
.init{
    color: red;
}
```

编写规则`webpack.dev.js`

```javascript
module.exports = {
	... ...
    // 给导入的文件制定规则
    module: {
        rules: [
            //打包css文件的规则
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    }
}
```

在**index.js**中导入，并查看效果

```javascript
import  './css/app.css';
```

![image-20200616143150738](https://img.lookroot.cn/blog/202006/16/143151-488573.png)

顺便可以打包一下**less**，首先安装插件`npm i -D less-loader`,然后写一下规则

```javascript
module: {
    rules: [
        //打包css文件的规则
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        },
    ]
}
```

我们新建一个 `src/css/app.less`文件

```less
.init{
    color: red;
}
```

我们在 `index.js`中注释掉原本导入的 `app.css`，然后导入less文件

```javascript
import './css/app.less';
```

重新构建项目，查看项目，效果依然生效，同理`sass、stylus`也是这个用法，这里不再赘述

### 分离css

在前面，我们打包css，最终都是将css代码添加到页面的 **style**标签中，如果我们想将所有的css都打包到专门的文件里面可以使用[mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin)插件

```sh
npm i mini-css-extract-plugin -D
```

然后修改一下配置`webpack.prod.js`

```javascript
... ... 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  	... ...
    // 插件
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles/[name].css",
        })
    ],
    // 给导入的文件制定规则
    module: {
        rules: [
            //打包css文件的规则
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ],
            }
        ]
    }
    ... ...
}
```

此时我们执行`npm run build`可以发现`dist`目录下面创建了一个`index.css`文件，因为我们是在 `index.js`中导入css文件的，`[name]`的值是js的文件名，而不是css的名

当然如果你想指定输入和导出的**css**的名字也是可以的，使用这种方式，你就不需要在js中再次引入css文件了

```javascript
entry: {
    index: path.resolve(__dirname, './src/index.js'),
    other: path.resolve(__dirname, './src/other.js'),
    app: path.resolve(__dirname, './src/css/app.css')
},
```

**webpack**在处理样式方面还有很多很强大的插件，比如[purgecss](https://www.npmjs.com/package/purgecss-webpack-plugin)可以精简掉页面中没有使用的css样式、[Autoprefixer](https://github.com/postcss/autoprefixer)可以自动给你添加不同浏览器兼容的css插件

### 管理图片和字体

在网页中，图片一般都是加载的网路路径，但是在开发中我们都是使用的本地图片，那么为了保证上线后和本地的资源位置保持一致，我们可以使用**webpack**来进行一下打包，最后统一上传**oss**存储

首先需要安装`url-loader`

```sh
npm i url-loader -D
```

然后我们在 `webpack.common.js`中进行配置

```javascript
const path = require('path');
const webpack = require('webpack');

const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: [path.join(__dirname, './src/index.js')],
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack init'
        })
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        //静态文件打包的网络路径
        publicPath:'https://www.lookroot.cn/assets/'
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        //超过这个大小，图片就打包为图片，不超过就打包为base64格式的代码
                        limit: 1000,
                        //打包文件名
                        name: "img/[hash].[ext]",
                    },
                }
            },
        ]
    }
};
```

为了验证，首先我们放一张图片`logo.jpg`到`src/asserts/img`目录下,我们简单的修改一下`app.css`

```css
.init {
  color: red;

}
body {
  background-image: url("../assets/img/logo.jpg");
  background-repeat: no-repeat;
}
```

同样的我们也可以在js代码里使用图片，修改一下`divdoc.js`

```javascript
import logo from "../assets/img/logo.jpg";
export default function divdoc() {
	... ...
    // 插入一张图片
    let img = document.createElement('img');
    img.src = logo;
    element.appendChild(img);
   ... ...
}
```

然后使用`npm run envdev`运行起来，效果是正常的

![image-20200618213316699](https://img.lookroot.cn/blog/202006/18/213318-993435.png)

然后我们使用`npm run envbuild`执行编译，然后我们打开`dist/img/main.css`

```css
body {
  background-image: url(https://www.lookroot.cn/assets/img/494654d849ba012e2aab0505d7c82dc0.jpg);
  background-repeat: no-repeat;
}
```

我们可以发现，**webpack**就给我们自动加上了网络路径，对于图片的处理，还有可以优化图片的[image-webpack-loader(https://github.com/tcoopman/image-webpack-loader)、可以自动生成雪碧图的[postcss-sprites](https://github.com/2createStudio/postcss-sprites)

除了上面我说的这些资源外，**webpack**还支持非常多的资源格式，只要理解这个思想，使用也不难

## 代码检查和代码转换

### Eslint代码检查

**eslint**是实际开发中非常常用的代码检查工具，我们在**webpack**中使用它来进行代码检查

首先安装**eslint**、loader、错误格式化插件

```sh
npm i eslint  eslint-loader eslint-friendly-formatter -D
```

然后我们在根目录新建一个`.eslintrc.json`,当然你也可以使用命令`npx eslint --init`来初始化配置文件

**rules**代表规则，这里我设置一个禁止使用 `alert`代码来测试是否可以完成代码检查，更多规则[请看文档](https://cn.eslint.org/docs/rules/)

```json
{
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "rules": {
        "no-alert": 2
    }
}
```

然后在`webpack.dev.js`中增加配置

```javascript
 module: {
     rules: [
        ... ... 
         {
             test: /\.js$/,
             loader: 'eslint-loader',
             enforce: 'pre',
             include: [path.resolve(__dirname, 'src')],
             options: {
                 formatter: require('eslint-friendly-formatter')
             }
         }
     ]
 }
```

然后我们在 `index.js`文件中增加一句`alert("webpack init")`,然后使用命令`npm run envdev`发现报错，eslint成功捕捉到了错误

![image-20200619111756392](https://img.lookroot.cn/blog/202006/19/111757-59473.png)

同样的你还可以使用 [StyleLint](https://github.com/stylelint/stylelint)工具来检查你的css代码

### babel代码转化

在实际开发中如果使用了 **es6+**的代码，有些浏览器是不支持的，为了兼容，所有需要将代码进一步转化，可以使用**babel**进行转化

**babel**的使用稍微比较繁琐，本文只介绍在**webpack**的使用方法，更多细致的东西请自行查阅

安装本体和loader` babel-loader  @babel/core`，` @babel/preset-env`是转换插件的预设组合，`@babel/plugin-transform-runtime`用来解决一些浏览器不支持的方法和对象问题

```sh
npm i @babel/runtime -S
npm i  babel-loader  @babel/core @babel/preset-env @babel/plugin-transform-runtime -D
```

然后我们在根目录新建一个配置文件`.babelrc`，使用`@babel/preset-env`提供的插件集合能完成大部分的工作了,`targets`表示我们的代码要运行到哪些平台上面，更为详细的[请点击](https://github.com/browserslist/browserslist)

```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": 3,
                "targets": {
                  	"browsers": [ "ie >= 8", "chrome >= 62" ]
                }
            }
        ]
    ]
}
```

然后修改一下`webpack.dev.js`

```javascript
module: {
    rules: [
       ... ... 
        {
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
            }]
        }
    ]
}
```

为了验证代码是否转换成功，我们在`index.js`中添加代码

```javascript
const say=(msg)=>{
    console.log(msg);
}
```

然后使用命令`npm run envdev`，并打开source map 查看源文件，可以发现箭头函数已经被转换了

![image-20200619133641448](https://img.lookroot.cn/blog/202006/19/133642-864233.png)

本节的内容就是这些，下一次将会有个简单的实战，对于**webpack**还有很多要学习的地方，比如打包优化、插件编写等等学完基础以后，这些就需要你自己去探索

