# vue过滤器和自定义组件

## vuefilter过滤器

这个过滤器其实可以看成就是 **保安** 这样一个，对资源做一些处理，当然不仅仅是看门这么简单

我们这里举例 比如**敏感字符串**的过滤

### 全局过滤器

那么和组件一样，有全局的私有的，我们先来定义全局的

在vue实例化之前定义,首先 **msgFormat**这个是过滤器的名称 然后我们使用**replace**处理一下字符串再返回

```javascript
Vue.filter('msgFormat', function (str) {
    return str.replace('我去', '***');
})
```

我们在 **data**中定义一个字符串

```javascript
title: '我去大家好',
```

我们在页面中使用过滤器 ，我们的数据在前，需要使用的过滤器在后，中间使用 **|**隔开，这样就会调用过滤器来处理这个字符串了

```html
<div id="app">
    {{title|msgFormat}}
</div>
```

### 私有过滤器

这里我们定义一个私有过滤器，这里我们处理性别，将数字 1 2 转换为具体的字符串

```javascript
filters: {
    sexFormat(sex) {
        return sex == 1 ? '男' : '女';
    }
}
```

**data**中定义一个**user**

```javascript
user: {
    name: 'lili',
    sex: 1
}
```

使用这个过滤器

```html
<div id="app">
    {{title|msgFormat}}<br />
    {{user.name}}-{{user.sex|sexFormat}}
</div>
```

看看效果

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/30/212133-213122.png)

## vuedirective自定义指令

那么上面我们用来很多的**vue**提供的指令 比如 **v-model** **v-on**，那么我们能不能自己定义一些指令呢？

当然是可以的

### 定义全局自定义指令

同样指令也是有全局和自定义的，上面写了这么多了，这里也就不多bb了

这里我们定义个 自定义颜色的指令

```javascript
Vue.directive('color', {
    // 指令绑定时间触发
    bind: function (el, val) {
        el.style.color = val.value
    },
    // 元素插入dom时触发
    inserted: function (el) {
        // el.style.color = 'blue'
    },
    // 元素更新时触发
    updated: function (el) {
        el.style.color = 'blue'
    }
})
```

### 定义一个私有的自定义指令

```javascript
let vm = new Vue({
    el: '#app',
    data() {
        return {
            
        }
    },
    directives: {
        'fontsize': {
            bind: function (el, val) {
                el.style.fontSize = val.value
            }
        }
    }
})
```

### 使用

这里有人会问 为啥双引号里面又是单引号啊，大家还记得吗，v-xxx的指令里面，传递的是**JavaScript**代码块，比如一个对象，数组，那么我们传入一个字符串肯定是需要一个单引号的，当然你也可以在 **data**中定义一个字符串然后传入

```html
<div id="app">
    <div v-color="'red'">red</div>
    <div v-fontsize="'100px'">fontsize</div>
</div>
```

看看效果

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/30/212749-81680.png)

