# 使用vuepress构建博客

>  Vue 驱动的静态网站生成器。官方文档[立即前往](https://vuepress.vuejs.org/zh/)

使用**vuepress**之前请确保你本地的**node**环境

**vuepress**是尤雨溪18年4月12日发布的vue静态网站生成器，支持`vue语法`，内置`webpack`，每一个由**vuepress**生成的页面都是通过`SSR`预渲染的`HTML`，也因此具有非常好的加载性能和搜索引擎优化，**vuepress**非常适合用来做项目文档，现在越来越多的人用来写博客，这次文章就是一个简单的使用教程和主题推荐

vuepress不限于使用markdown、vue组件、html

## reco主题

> 一款简洁而优雅的 vuepress 博客 & 文档 主题。官方文档[立即前往](https://vuepress-theme-reco.recoluan.com/)

![image-20200515152702435](https://img.lookroot.cn/blog/202005/15/152702-539475.png)

我们打乱一下顺序，先介绍这个主题，reco主题提供了脚手架可以实现一键创建vuepress项目，并且这个主题是为博客量身打造，节省掉我们配置项目的时间，用来专心书写内容

### 快速开始

**npx**

```sh
npx @vuepress-reco/theme-cli init my-blog
```

**npm**

```bash
# 初始化
npm install @vuepress-reco/theme-cli -g
theme-cli init my-blog

# 安装
cd my-blog
npm install

# 运行
npm run dev

# 编译
npm run build
```

**yarn**

```bash
# 初始化
yarn global add @vuepress-reco/theme-cli
theme-cli init my-blog

# 安装
cd my-blog
yarn install
```

### 实践一下

```sh
npx @vuepress-reco/theme-cli init recodemo
```

然后进入`recodemo`文件夹使用 `npm i`命令下载一下依赖

然后打开 `recodemo\docs\.vuepress\config.js`,配置一些自定义信息，具体的可配置信息[立即前往](https://vuepress-theme-reco.recoluan.com/views/1.x/configJs.html)

我们在`views`目录下新建一个 `first.md` 文件，这个前面的内容相当于是文章的信息描述，具体的可描述信息[立即前往](https://vuepress-theme-reco.recoluan.com/views/1.x/frontMatter.html)

```markdown
---
title: 这是我的第一个文章
date: 2020-05-15
sidebar: 'auto'
categories:
 - 博文
tags:
 - 日常
---

## 这是我的第一篇文章
```

然后使用 `npm run dev`将项目运行起来

![image-20200515155259478](https://img.lookroot.cn/blog/202005/15/155301-943462.png)

### 也可以给文章添加摘要

```markdown
---
title: 这是我的第一个文章
date: 2020-05-15
sidebar: 'auto'
categories:
 - 博文
tags:
 - 日常
---

::: tip
你好
:::
<!-- more -->

## 这是我的第一篇文章
```

看看效果，当然还有其他可以自定义的地方看文档就行了

#### ![image-20200515162816996](https://img.lookroot.cn/blog/202005/15/162818-92262.png)

### 使用插件

reco文档里面还有个插件市场，提供非常多的插件[立即前往](https://vuepress-theme-reco.recoluan.com/views/other/recommend.html)，我们举一个看板娘的例子

安装依赖`npm i @vuepress-reco/vuepress-plugin-kan-ban-niang -D`,然后打开`config.js`配置文件

增加一个**plugins**配置文件，和

```javascript
module.exports = {
"title": "recodemo",
"description": "recodemo",
"dest": "public",
 ... ...
"plugins": [
  [
    "@vuepress-reco/vuepress-plugin-kan-ban-niang",
    {
      theme: ["blackCat"],
      clean: false,
      messages: {
        welcome: '我是lookroot欢迎你的关注 ',
        home: '心里的花，我想要带你回家。',
        theme: '好吧，希望你能喜欢我的其他小伙伴。',
        close: '再见哦'
      }
    }
  ],
]
}
```

重启项目可以看到效果

![image-20200515184753310](https://img.lookroot.cn/blog/202005/15/184755-488516.png)



## 原生构建

全局安装`npm install -g vuepress`

我们新建一个文件夹 **proto**然后在文件夹新建一个**readme.md**文件，随便写点内容,**vuepress**默认首页为 **readme.md** 文件

```markdown
## 这是我的第一篇文章
```

然后在当前目录执行控制台命令`vuepress dev`，查看效果，这个就非常的简陋了，想要成一个博客还需要一些配置

![image-20200515183647805](https://img.lookroot.cn/blog/202005/15/183649-953392.png)

我们新建一个项目文件夹 **protoblog**，使用 `npm init`初始化项目，修改`package.json`增加打包命令

```json
 "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1",
   "dev": "vuepress dev docs",
   "build": "vuepress build docs"
 },
```

然后创建一些文件和文件夹，结构如下

![image-20200515205608674](https://img.lookroot.cn/blog/202005/15/205609-239671.png)

修改根目录的 **README.md**

```markdown
---
home: true
heroImage: /hero.png
heroImageStyle: {
  maxWidth: '600px',
  width: '100%',
  display: block,
  margin: '9rem auto 2rem',
  background: '#fff',
  borderRadius: '1rem',
}
bgImageStyle: {
  height: '450px'
}
isShowTitleInHome: false
actionText: 立即开始
actionLink: /views/
features:
- title: Yesterday
  details: 开发一款看着开心、写着顺手的 vuepress 博客主题
- title: Today
  details: 希望帮助更多的人花更多的时间在内容创作上，而不是博客搭建上
- title: Tomorrow
  details: 希望更多的爱好者能够参与进来，帮助这个主题更好的成长
---
```

然后我们把上面 **reco**主题项目 **public**文件夹里面的静态资源复制到本项目的**public**目录

然后我们修改一下 **config.js** 文件

```javascript
module.exports = {
  "title": "recodemo",
  "description": "recodemo",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  // 导航栏
  "themeConfig": {
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/lookroot",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
  },
  "markdown": {
    "lineNumbers": true
  },
}
```

现在我们使用命令 `npm run dev`运行项目

![image-20200515210047264](https://img.lookroot.cn/blog/202005/15/210047-882099.png)

### 手动侧边栏

在具体的页面里面**vuepress**会默认根据你的标题生成侧边栏目录，但是在一个汇总的文档页面你想让侧边栏显示你的所有页面的标题，就可以手动配置侧边栏

我们在**views**目录下创建点文章，随便写点内容

![image-20200515210410648](https://img.lookroot.cn/blog/202005/15/210411-155149.png)

然后我们打开 **config.js** 文件，在**themeConfig**里面增加**sidebar**配置，**children**就是需要侧边栏显示的文件

```javascript
"sidebar": {
  '/views/':[
    '',
    {
      title: 'vue教程',
      collapsable: true, // 不可折叠
      children: ['vue/vif','vue/vfor']
    }
  ]
},
```

重新运行项目看下效果，同样的你在诸如以上**reco**的主题都可以这样使用，因为这是**vuepress**本身的配置

![1](https://img.lookroot.cn/blog/202005/15/211213-485157.gif)

### 自动侧边栏插件

上面这种大家可能觉得麻烦，上一个自动生成的插件[vuepress-plugin-auto-sidebar ](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar)

安装`npm i vuepress-plugin-auto-sidebar -D`,然后修改**config.js**配置先注释掉上面的手动侧边栏配置，然后新增插件配置

```javascript
"plugins": {
  "vuepress-plugin-auto-sidebar": {}
}
```

还需要在**vue** 这个文件夹新建一个**readme.md**随便写点内容，重新运行项目，注意当前地址后面需要加上/vue

http://localhost:8080/views/vue/ 

![image-20200515213613592](https://img.lookroot.cn/blog/202005/15/213614-246787.png)

## 部署

部署到个人服务器就简单了，**build**之后**nginx**随便开一个服务就行

本次主要讲的是部署到**GitHub**提供的**GitPage**,首先创建 一个仓库，如果你的仓库名为 **用户名.github.io**你就不用再vuepress中做任何修改，如果不为这个名称，你就需要在**config.js**中配置 **base**属性为你的仓库名

![image-20200516092201133](https://img.lookroot.cn/blog/202005/16/092201-510364.png)

创建完成后，将项目克隆到本地，将刚刚写的代码复制过来，这里有个问题，如果你想部署博客的同时也将博客代码同步到**git**的话，可以通过新建一个分支或者专门存放代码的仓库

编写**.gitignore**文件

```
node_modules/
docs/.vuepress/theme
package-lock.json
public/
```

新建两个脚本，一个用来**push**博客页面，一个用来**push**博客源码

**deploy.sh**用来打包博客，并将打包完成的页面文件推送到我们的仓库

```sh
npm run build

cd public

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:lookroot/lookroot.github.io.git master

cd ../
rm -rf public
```

**push.sh**用来推送博客源码文件

```sh
git add .
git commit -m 'push'
git push origin blogcode
```

双击运行 **deploy.sh**以后，我们打开https://lookroot.github.io页面便可看到效果

![image-20200516093549899](https://img.lookroot.cn/blog/202005/16/093550-544210.png)
