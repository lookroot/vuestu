# vue-cli脚手架和axios

## vue-cli脚手架
> Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统

终于就是到了这一节，前面多次提到的脚手架来啦！

### 什么是脚手架

其实就是一个配置好了的使用**webpack**完成打包构建的初始化工程，和我们前面讲的webpack打包没啥区别，只是更为全面，在实际开发中也是常用的工具

当前最新版本为 vue-cli4 但是和 cli3区别不大所以两个版本都是可以使用的

全局安装cli，确保你已经安装了node了哦，命令行执行

```
　npm i @vue/cli -g 
```

### 使用命令行创建项目

使用**create**创建项目，命令行执行，后面紧跟的是项目名，这里我起名 **vueclidemo**

```
vue create vueclidemo
```

开始创建会有一些安装提示，选择默认即可

![image-20200426171619872](https://img.lookroot.cn/blog/202004/26/171620-896236.png)

然后进入这个项目文件夹，命令行执行

```
npm run serve
```

项目就运行起来了

![image-20200426171810250](https://img.lookroot.cn/blog/202004/26/171810-429606.png)

命令行执行，可以完成对项目的打包

```
npm run build
```

### 使用可视化工具创建项目

命令行执行，打开可视化工具,这样也能完成项目的创建

```sh
vue ui
```

![image-20200426221249407](https://img.lookroot.cn/blog/202004/26/221250-759394.png)

![image-20200426221333672](https://img.lookroot.cn/blog/202004/26/221334-532034.png)

当然还可以在可视化管理工具里面导入我们的项目

![image-20200427105703709](https://img.lookroot.cn/blog/202004/27/105704-509888.png)

导入完成后可以进入项目的管理界面，我们点击插件，安装一个**vuerouter**的插件，也就是相当于给当前项目导入**vuerouter**

![image-20200427105938050](https://img.lookroot.cn/blog/202005/03/232434-113277.png)

点击安装即可，完成安装后会询问我们当前路由使用的模式，默认即可，这就完成引入了，是不是非常方便呢

并且我们打开项目可以发现系统已经默认给我们引入并注册了**router**

打开 **main.js**,发现引入了 **router**这个文件，并传给了实例化的vue

![image-20200427110207875](https://img.lookroot.cn/blog/202004/27/110209-182127.png)

然后我们打开这个 **router** 文件，讲解一下

![image-20200427110842200](https://img.lookroot.cn/blog/202005/03/232448-468741.png)

然后我们来到这个任务界面，运行项目

![image-20200427111017216](https://img.lookroot.cn/blog/202004/27/111018-838336.png)

项目就启动以后，点击后面的 **启动 app**，就来到项目界面

![image-20200427111115658](https://img.lookroot.cn/blog/202004/27/111115-174162.png)

这就完成了脚手架的基本使用

### 可能遇到的问题

#### npm速度过慢

使用[淘宝镜像即可](https://developer.aliyun.com/mirror/NPM?from=tnpm)或者使用[yarn](https://yarn.bootcss.com/docs/)进行安装

#### 使用powershell提示无权限

powershell输入

```
Set-ExecutionPolicy -Scope CurrentUser
```

然后系统提示输入

```
RemoteSigned
```

![image-20200427104436986](https://img.lookroot.cn/blog/202004/27/104437-607687.png)

#### 一直创建项目失败

卸载清除缓存重装

```
npm uninstall -g vue-cli
npm uninstall -g @vue/cli
npm cache clean --force
npm install -g @vue/cli
```

#### 创建时报错找不到yarn

在你的用户名盘下面**C:\Users\Administrator**，比如我是lookroot这个文件夹，里面找到这个 **.vuerc** 文件

![image-20200427104810705](https://img.lookroot.cn/blog/202004/27/104811-539846.png)

然后修改如下

```
{
  "useTaobaoRegistry": true,
  "packageManager": "npm",
  "latestVersion": "4.3.1",
  "lastChecked": 1587955070777
}
```

## Axios网络请求库
### 什么是Axios

- 是一个基于promise（承诺）的HTTP网络请求库
- 可以用于浏览器和node.js项目
- vue官方推荐的请求库，从以前的**vue-resource**到**axios**

通俗点说就是对**JavaScript**的**http**请求的二次封装，就类似**jQuery**的**ajax** 

中文文档[立即查看](http://www.axios-js.com/)

原则上学习这一节需要**mock**数据相关的知识，但是鉴于大家都是初学者，所以不使用mock的方式，但是大家感兴趣的可以去搜索一下**mock**的教程，实际开发中也是常用的

### 安装和使用

这里我们使用前面创建的 **vueclidemo**这个项目，也可以你自己重新创建一个脚手架项目

```sh
npm i axios
```

使用 **npm run serve**将项目运行起来

来到**Helloworld**这个组件里面，删除掉不用的东西

![image-20200427175821394](https://img.lookroot.cn/blog/202004/27/175821-449662.png)

### 请求方式

- get请求 获取数据
- post请求 提交数据
- put请求 更新数据
- patch请求 更新部分数据
- delete请求  删除数据

### mock数据

真实开发是先沟通制定好api接口文档，那么我们这里先自己 **mock** 一个假数据，这一部分也是开发中常用的点，感兴趣的朋友可以搜索一下 **mock** 相关的教程

我在当前项目创建了一个**mock**文件夹，里面是一个模拟后台的代码，使用**express**进行编写，考虑到初学前端的朋友不了解，直接运行项目就行了，具体代码和本节没有关系

命令行来到 **mock** 文件夹，首先需要**npm install**下载依赖，执行**node**命令即可运行项目

![image-20200429111946065](https://img.lookroot.cn/blog/202004/29/111948-869450.png)

浏览器打开查看是否运行成功

![image-20200429114804279](https://img.lookroot.cn/blog/202004/29/114804-873810.png)

api文档

| 路径          | 请求类型 | 参数                 |
| :------------ | -------- | :------------------- |
| /get          | get      |                      |
| /post         | post     | json 格式user对象    |
| /postformdata | post     | formdata格式user对象 |
| /put          | put      | user对象             |
| /del          | delete   | name 字符串          |
| /sexlist      | get      |                      |

### 引入axios

然后我们在**helloworld**组件的 **script**标签下中引入axios

```
import axios from "axios";
```

### get请求

我们在**methods**中定义一个方法，并编写一个**axios**的**get**请求，**params**就是需要传递的参数，会被拼接到**url**地址中

```javascript
getData() {
      axios
        .get("http://localhost:3000/get", {
          params: {
            name: "lili"
          }
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
```

也可以这样写

```javascript
axios({
  method: "get",
  url: "http://localhost:3000/get"
}).then(res => {
  console.log(res.data);
});
```

然后我们在 **created**生命周期调用这个方法

```javascript
  created() {
    this.getData();
  }
```

浏览器查看一下效果，这就完成了第一个 **get**请求

![image-20200429115533818](https://img.lookroot.cn/blog/202004/29/115534-556696.png)

### post请求

先定义一个表单数据，这里我们就先事先定义好就行了，实际开发是需要表单绑定收集的，我们在**data**中定义一个 **user**对象

```javascript
data() {
  return {
    user: {
      name: "zhangsan",
      age: 11,
      sex: 1,
      avatar:
        "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=218375221,1552855610&fm=111&gp=0.jpg"
    }
  };
},
```

继续编写一个**postData**方法

```javascript
postData() {
  axios.post("http://localhost:3000/post", this.user).then(res => {
    console.log(res);
  });
},
```

然后在 **created** 使用

```javascript
this.postData();
```

![image-20200429121249176](https://img.lookroot.cn/blog/202004/29/121249-385852.png)

### fromdata格式的post请求

传统的表单是使用 **fromdata** 进行提交的，我们来简单使用一下吧，再编写一个**postDataFormData**方法

```javascript
postDataFormData() {
  let formdata = new FormData();
   //user对象填充到 formdata中
  for (let key in this.user) {
    formdata.append(key, this.user[key]);
  }
  axios({
    method: "post",
    data: formdata,
    url: "http://localhost:3000/postformdata"
  }).then(res => {
    if (res.data.code == 200) {
      alert("添加成功");
    }
  });
},
```

然后在 **created** 使用

```javascript
this.postDataFormData();
```

![image-20200429121837335](https://img.lookroot.cn/blog/202004/29/121837-867371.png)

### delete请求

再编写一个**delData**方法，**delete**传递参数有两种方式

```javascript
delData() {
  axios
    .delete("http://localhost:3000/del", {
    //params 路径拼接的方式
      params: {
        name: "zhangsan"
      }
      // 请求头方式
      // data: {
      //   name: "zhangsan"
      // }
    })
    .then(res => {
      if (res.data.code == 200) {
        alert("删除成功");
      }
    });
},
```

调用一下

```javascript
this.delData();
```

![image-20200429122259289](https://img.lookroot.cn/blog/202005/03/232204-442336.png)

### put请求方式

再编写一个**updateData**方法

```javascript
updateData() {
  axios.put("http://localhost:3000/put", this.user).then(res => {
    if (res.data.code == 200) {
      alert("更新成功");
    }
  });
},
```

![image-20200429122241921](https://img.lookroot.cn/blog/202005/03/232206-196219.png)

### 并发请求

顾名思义，就是同时发送多个请求，再编写一个**getAllData**方法

```javascript
 getAllData() {
   axios
     .all([
       axios.get("http://localhost:3000/sexlist"),
       axios.get("http://localhost:3000/get")
     ])
     .then(
       axios.spread((sexRes, userRes) => {
         console.log(sexRes);
         console.log(userRes);
       })
     );
 },
```

然后调用一下

```javascript
this.getAllData();
```

![image-20200429122440449](https://img.lookroot.cn/blog/202005/03/232256-958251.png)

### 取消请求

如何取消正在发送中的请求呢？编写一个**cancelRequest**方法

```javascript
cancelRequest() {
  // 存储一个 token作为 axios请求标识符
  let tokenData = axios.CancelToken.source();
  axios
    .get("http://localhost:3000/get", {
      params: {
        name: "lili"
      },
      // 传入这个token
      cancelToken: tokenData.token
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
    // 取消请求
    tokenData.cancel("用户取消了操作");
}
```

调用一下

```javascript
this.cancelRequest();
```

![image-20200429122807587](https://img.lookroot.cn/blog/202005/03/232308-886328.png)

### 配置

我们在进行http请求的时候是需要很多自定义的地方，比如超时时间，token等等，当然 axios给我们提供了自定义的接口

我们在**components**下创建一个**CreateAxios.vue**组件，并且在 **views**下的 **Home.vue**注册并使用这个组件

```vue
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld />
    <CreateAxios />
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import CreateAxios from "@/components/CreateAxios.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    CreateAxios
  }
};
</script>

```

记得要注释掉刚刚**HelloWorld**组件里面的 **created**里面调用的方法，不然一会儿会一直调用

以下的这些代码我们都在 **CreateAxios**组件的 **created** 周期里面直接编写方便测试

### 全局默认配置

使用 **axios.defaults**进行配置，当然还有更多可以配置的点，详情看官方文档

```javascript
//超时时间
axios.defaults.timeout = 1000;
//基础url
axios.defaults.baseURL = "";
```

### 全局的请求拦截器

拦截器顾名思义，就是需要拦截请求 加以处理，请求拦截器，就是拦截发送请求，加以处理

```javascript
axios.interceptors.request.use(
  config => {
    //请求发送之前需要作什么
    config.headers = {};
  },
  err => {
    return Promise.reject(err);
  }
);
```

### 全局的响应拦截器

```javascript
 axios.interceptors.response.use(
   res => {
     //对请求成功的数据处理
     return res;
   },
   err => {
     return Promise.reject(err);
   }
 );
```

### 创建实例

在实际开发当中，一般是不会全局配置，因为一个项目中的接口有很多的不同

所以我们需要创建多个实例然后进行分别的配置

### 创建实例

```javascript
let httpRequest = axios.create();
```

这样我们就创建好了，接下来使用**axios**进行网络访问就不需要再使用**axios.xxx**了，而是使用 **httpRequest.xxx**

### 实例的基础配置

```javascript
let httpRequest = axios.create({
  //基本url
  baseURL: "http://localhost:3000",
  //   超时时间
  timeout: 1000,
  //头文件
  Headers: {}
});
```

### 实例的请求拦截器

比如这里我们给他加上一个 **token**

```javascript
httpRequest.interceptors.request.use(
  config => {
    config.headers.token = "xxxxxxxxxx";
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
```

然后再次编写一个**get**请求

```javascript
httpRequest.get("/get").then(res => {
  console.log(res);
});
```

看看浏览器效果

![image-20200429124950115](https://img.lookroot.cn/blog/202005/03/232059-79477.png)

### 实例的响应拦截器

我们也可以在这个得到响应以后进行处理，比如不同的错误码给用户不同的提示

```javascript
 httpRequest.interceptors.response.use(
   res => {
     return res;
   },
   err => {
     console.log("response err=>", err);
     return Promise.reject(err);
   }
 );
```

这样就完成了 **axios** 的基础使用了，实际开发中会对**axios**进行二次封装，这就在后面的教程里面了