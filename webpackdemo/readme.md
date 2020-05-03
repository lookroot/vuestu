# webpak快速入门
## 什么是`webpack` 

官网[立即直达](https://www.webpackjs.com/)

webpack是当前前端工程化 非常常用而且是必会的打包工具，可能有朋友不了解什么是打包

这里举一个例子，比如你有`a.js` 和 `b.js` 两个文件 你在页面中要同时使用这两个文件，就需要同时引入这两个文件，如果文件几十上百个呢？难道每个都分别引入吗？这必然是不可行的

使用 `webpack` 就可以将这些文件打包到指定文件中 最后引入这个打包后的文件就可以了

当然`webpack`不仅仅只是合并文件这么简单 ，还提供了很多非常强大的功能，很多人不理解`vue-cli`的脚手架工具 是怎样实现多种文件的最终汇总 其实就是`webpack` 打包

反正我们打包最后的目的就是这个代码方便我们的使用，就像我们收拾屋子一样，有条有序

这是官网截图 这就足以说明其强大的功能了

![image-20200426152441497](https://img.lookroot.cn/blog/202004/26/152444-91843.png)

好的废话不多说了 一起来实践吧！

## 首先安装`webpack`

控制台输入命令

```
cnpm i webpack -g
```

查看安装结果

![image-20200426152457058](https://img.lookroot.cn/blog/202004/26/152457-592291.png)

## 打包第一个js文件试试

首先初始化一个项目，命令行输入 `npm init`然后一路回车最后输入 `yes`

然后在文件根目录下新建 `src/index.js`这个文件并添加内容

```
console.log('我是被打包的文件');
```

然后我们在项目根目录下打开控制台(控制台路径一定要在项目根路径) 输入`webpack`并查看打包结果

![image-20200426152508875](https://img.lookroot.cn/blog/202004/26/152509-604128.png)

这里自动创建了`dist/main.js` 这个文件，我们在根目录创建一个 `index.html`,并引入`main.js` 这个文件，然后在浏览器打开这个页面 查看打印结果

![image-20200426152518481](https://img.lookroot.cn/blog/202004/26/152518-43863.png)

好的这就完成了第一个打包文件，但是控制台还在报错，以及我们可不可以指定要打包的文件?和输入的文件自定义呢？当然是可以的

![image-20200426152526746](https://img.lookroot.cn/blog/202004/26/152526-515397.png)

控制台输入命令 第一个参数是目标文件,第二个参数是输出文件的路径和名字，第三个参数是指定当前环境，这样就解决了报错

```
 webpack ./src/index.js --output-filename app.js  --mode development
```

## 通过配置文件打包

上面的都是在命令行中输入相关信息进行打包，很不方便，这里我们在根目录创建一个默认的配置文件`webpack.config.js `

```JavaScript
//引入path模块
const path = require('path');
//导出一个配置文件模块
module.exports = {
    //环境
    mode: 'development',
    //目标文件，数组可以是多个文件 合并打包
    entry: [path.join(__dirname, './src/index.js')],
    //自定义输出文件
    output: {
        path: path.join(__dirname, './dist'), //路径
        filename: 'app.js'  //文件名称
    },
}
```

然后直接控制台输入命令`webpack`就可以完成打包了

## 使用`webpack-dev-server`自动打包

有朋友就肯定疑惑了 难道每次修改文件都要输入打包命令进行打包吗？显然不太科学啊，用过`vue-cli`脚手架功能的朋友都知道，每次修改文件 一按保存就自动打包并刷新页面了

这里我们就介绍`webpack-dev-server`自动打包

### 安装`webpack-dev-server`

```
 cnpm install -g webpack-dev-server
```

然后控制台运行`webpack-dev-server --open`就会自动打开浏览器，我们尝试修改`index.js`文件的打印方法的内容为`我是被打包的文件hot`并保存，刷新页面发现内容并没有变化。这是为什么呢？

这是因为`webpack-dev-server`打包的内容 并没有在磁盘生成一个实体文件，而是在内存中生成了一个文件，文件名就是我们定义的输出文件名`app.js`,所以我们简单修改`index.html`的内容

```
 <script src="/app.js"></script>
```

现在就能看到结果啦

![image-20200426152549386](https://img.lookroot.cn/blog/202004/26/152549-737249.png)

前面我们命令`webpack-dev-server --open` 可以自动打开浏览器，其实还有很多命令可以跟在后面，这些命令都是可以自由组合的

- 加上`--port xxxx`指定运行端口
- 加上 `--contentBase xxx` 指定默认页面文件夹
- 加上` --hot` 热更新，实现浏览器的无刷新

还记得 `vue-cli`脚手架里面的 `npm run server`吗，其实我们也可以自己来写这个命令

我们简单修改`package.json`,把上面的自定义命令给它进去

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "server": "webpack-dev-server --open --port 8081 --hot"
  },
```

然后在控制台执行 `npm run server` 就能运行了！

还有种方式可以直接写进配置文件`webpack.config.js`

当前项目安装依赖`webpack`注意这里是把模块引入当前项目

```
 cnpm i --save-dev webpack      
```

修改配置文件`webpack.config.js` 开头引入刚刚安装的模块

```
const webpack = require('webpack'); 

```

然后修改配置文件

```javascript
module.exports = {
    //环境
    mode: 'development',
    //目标文件
    entry: path.join(__dirname, './src/index.js'),
    //自定义输出文件
    output: {
        path: path.join(__dirname, './dist'), //路径
        filename: 'app.js'  //文件名称
    },
    //webpack-dev-server 配置文件
    devServer: {
        open: true,
        port: 8081,
        contentBase: './',
        hot: true
    },
    //HMR 插件 如果你使用 webpack-dev-server打包 并且后面跟上了 --hot 就等同于开启了这个插件
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
```

然后在控制台输入命令` webpack-dev-server`就能完成按照配置文件进行打包了

## 在内存中生成页面

在上面的`webpack-dev-server`打包过程中，会在内存中生成一个js文件，每次保存打包js的文件都会自动部署在页面中，而且速度非常快，那么我们也在内存中生成一个`html`页面,并在打包的时候默认加载这个页面

安装`htmlWebpackPlugin`

```sh
cnpm i html-webpack-plugin --dev
```

修改`webpack.config.js`配置文件,首先引入模块

```javascript
const htmlWebpackPlugin = require('html-webpack-plugin');

```

修改插件配置

```javascript
plugins: [
    // 打包页面文件
    new htmlWebpackPlugin({
        //模板文件地址 也就是要打包的页面文件
        template: path.join(__dirname, './index.html'),
        //生成在内存中的文件名
        filename: 'index.html'
    })
]
```

然后在命令行重新使用 `npm run server`或者`webpack-dev-server` 重新打包，会自动打开页面,但是这里我们发现一个问题 打印了两次


![image-20200426152604657](https://img.lookroot.cn/blog/202004/26/152604-643025.png)

出现这个问题的原因：还记得上面我们说的在内存中生成的 js文件吗，现在我们使用这个页面打包插件会自动给我们加载内存中打包的js文件，但是我们在页面中已经引入了一次这个js文件，所以会执行两次，这里我们注释掉页面中的引入

```javascript
 <!-- <script src="/app.js"></script> -->
```

再次查看控制台

![image-20200426152615732](https://img.lookroot.cn/blog/202004/26/152615-615171.png)

## 打包css

`vue-cli`脚手架里面的css文件是直接在 js文件中`import`进入的，这一节我们就介绍css的打包方式

首先是安装loader加载器，大家下载自己需要的对应的 loader，这里我还引入了 less 进行示例

```
cnpm i style-loader css-loader less-loader less --dev 
```

然后修改配置文件`webpack.config.js`添加`module`模块并填写规则

```javascript
...
plugins: [
    ...
],
module: {
    rules: [
        //打包css文件的规则
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        //打包less文件的规则
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
    ]
}
```

然后我们在在`src/css` 目录下新建`app.css`和`app.less` 两个文件,文件内容都是

```
body {
  background-color: #000000;
}
```

然后在命令行重新使用 `npm run server`或者`webpack-dev-server`开始打包

在`index.js`中添加内容然后保存

```
import './css/app.css';

```

查看网页效果 已经变成黑色，然后注释掉上面这句话，新添加

```
import './css/app.less';

```

保存查看网页，仍然为黑色 完成！

## babel转化

babel用来将一些比较新的语法 转化为 浏览器可以识别的语言 这里我们介绍`webpack`使用`babel`

首先安装这几个依赖

```
加载器
cnpm i install babel-loader@7 --dev
核心api包
cnpm i babel-core --dev
转换规则包
cnpm i  babel-preset-env --dev
```

修改`webpack.config.js`配置文件

```javascript
module: {
    rules: [
        //css
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        //less
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
        //babel
        { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
}
```

根目录新建一个`.babelrc` 配置文件,更多详细的使用不在本节的内容范围之内，请自行查阅

```
{
    "presets": [
        "env"
    ]
}
```

然后我们修改`index.js`保存进行测试

```
[1, 2, 3].forEach(e => {
    console.log(e);
})
```

打开浏览器 打开开发者模式

![image-20200426152628448](https://img.lookroot.cn/blog/202004/26/152628-443416.png)

可以看到箭头函数已经被转化

![image-20200426152636085](https://img.lookroot.cn/blog/202005/03/222943-85696.png)