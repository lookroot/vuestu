# 在浏览器的控制台玩小游戏

我曾经在某个网站的控制台玩过这种控制台游戏，但是记不住了，今天用一个非常简单（简陋）的案例来试验一下，没有使用面向对象，我觉得JavaScript的面向对象不是特别好使，typescript对很多新人也不是很友好，所以就用一些比较low的循环判断来构建吧！

我主要是给大家提供一个思路，游戏制作我也不太会，感兴趣的朋友，可以将一些童年的经典游戏移植来玩一玩，让你的控制台更加的diao

![9](https://img.lookroot.cn/blog/202008/15/144718-89052.gif)

## 初始化页面

我们创建一个基本的`index.html`页面,先在script标签里面定义几个全局属性

```javascript
 // 存储所有元素的矩阵
 let result = new Array();
 // 定义背景大小
 const bg = {
     width: 5,
     height: 5
 }
 // 定义用户位置
 let userX = 2;
```

下一步我们初始化背景矩阵的数据和用户的飞机在这个矩阵中的位置

```javascript
for (let x = 0; x < bg.height; x++) {
    let col = new Array();
    for (let y = 0; y < bg.width; y++) {
        col[y] = "🚥";
    }
    result[x] = col;
}
//初始化用户飞机的位置
result[result.length - 1][userX] = "🚠";
```

然后我们开始定义游戏定时函数，以为这个游戏的更本就是不断的往控制台打印东西

```javascript
let game = setInterval(() => {
	
},200)
```

我们可以先将这个地图打印出来

```javascript
let game = setInterval(() => {
	 // 定义最终打印的字符串
    let str = "";
    // 循环矩阵 存入字符串
    for (let row = 0; row < result.length; row++) {
        let colstr = "";
        for (let col = 0; col < result[row].length; col++) {
            colstr += result[row][col];
        }
        str += colstr + "\n";
    }
    // 打印界面
    console.clear();
    console.log(str)
},200)
```

![image-20200815140407116](https://img.lookroot.cn/blog/202008/15/140407-971626.png)

## 添加随机的子弹

每一次执行定时函数我们都在第一行生成一个随机子弹

```javascript
let game = setInterval(() => {
    //生成随机子弹
    result[0][parseInt(Math.random() * bg.width)] = "🚀";
	 // 定义最终打印的字符串
    let str = "";
   	... ... 
},200)
```

![image-20200815140913426](https://img.lookroot.cn/blog/202008/15/140914-137870.png)

## 背景移动

整个游戏是从上往下移动的，并且子弹跟着往下移动，但是用户位置不变

实现这个效果很简单，每次执行函数的时候，将最后一行弹出，并给第一行添加一个空的背景

![image-20200815141335194](https://img.lookroot.cn/blog/202008/15/141338-465665.png)

并且，每次弹出最后一行以后，要将用户的飞机位置重新设置到新的最后一行，而且我们还要将生成子弹移动到生成新的第一行后面

```javascript
let game = setInterval(() => {
    // 弹出最后一行
	result.pop();
	// 将用户飞机位置移动到当前最后一行
	result[result.length - 1][userX] = "🚠";
	// 新增一行空白的
	result.unshift(new Array(bg.width).fill("🚥"));
	// 随机子弹
	result[0][parseInt(Math.random() * bg.width)] = "🚀";
	// 定义最终打印的字符串
   	... ... 
},200)
```

![8](https://img.lookroot.cn/blog/202008/15/142141-683476.gif)

## 用户操作

我们将键盘上面的左右键作为控制飞机移动的条件，并加入一个移动的音效

```javascript
 // 用户操作
 window.onkeydown = function (e) {
     // 判定左右键和范围判定
     if (e.keyCode === 37 && userX > 0) {
         userX -= 1;
     } else if (e.keyCode === 39 && userX < bg.width - 1) {
         userX += 1;
     }
     // 播放操作提示音
     new Audio("https://img.lookroot.cn/music/13148.wav").play();
 };
```

## 碰撞检测

因为没有使用面向对象，我们的碰撞检测写简单一点，思路就是当前画面中最后一行的用户飞机的这个位置如果是子弹就代表游戏结束,然后就停止定时函数的运行

当然肯定不能直接停止，所以要做一个延时函数来让定时函数再运行一次，把爆炸画面渲染出来

好的来修改一下上面的用户飞机的重新绘制

```javascript
 // 将用户飞机位置移动到当前最后一行
 // 移动之前先判断是否相撞 判断🎇是为了被撞以后的最后一次循环能完成
 if (result[result.length - 1][userX] === "🚀" || result[result.length - 1][userX] === "🎇") {
     // 将我们的飞机更换为爆炸图标
     result[result.length - 1][userX] = "🎇";
     // 播放爆炸音效
     new Audio("https://img.lookroot.cn/music/12233.wav").play();
     // 爆炸完成后清空控制台
     setTimeout(() => {
         clearInterval(game);
         console.clear();
         console.log('%cOVER', 'color: red;font-size:48px')
     }, 200);
 } else {
     result[result.length - 1][userX] = "🚠";
 }
```

## 开始函数

我们的游戏已经完成了，为了让用户可以开始游戏，我们将游戏函数移动到一个全局的start()方法中

用户控制台执行`start()`方法就能开始游戏，为了让用户有时间将鼠标回到浏览器页面中（键盘事件在控制台是无效的，必须用户聚焦浏览器页面），所以做一个延时函数

```javascript
window.start = function () {
    // 播放音乐
    new Audio("https://img.lookroot.cn/music/5170.wav").play();
    for (let x = 0; x < bg.height; x++) {
        let col = new Array();
        for (let y = 0; y < bg.width; y++) {
            col[y] = "🚥";
        }
        result[x] = col;
    }
    //初始化用户飞机的位置
    result[result.length - 1][userX] = "🚠";
    // 方便用户回到页面 定义延时执行
    setTimeout(() => {
        let game = setInterval(() => {
            // 弹出最后一行
            result.pop();
            // 将用户飞机位置移动到当前最后一行
            // 移动之前先判断是否相撞
            if (result[result.length - 1][userX] === "🚀" || result[result.length - 1][
                    userX] ===
                "🎇") {
                // 将我们的飞机更换为爆炸图标
                result[result.length - 1][userX] = "🎇";
                // 播放爆炸音效
                new Audio("https://img.lookroot.cn/music/12233.wav").play();
                // 爆炸完成后清空控制台
                setTimeout(() => {
                    clearInterval(game);
                    console.clear();
                    console.log('%cOVER', 'color: red;font-size:48px')
                }, 200);
            } else {
                result[result.length - 1][userX] = "🚠";
            }
            // 新增一行空白的
            result.unshift(new Array(bg.width).fill("🚥"));
            // 随机子弹
            result[0][parseInt(Math.random() * bg.width)] = "🚀";
            // 定义最终打印的字符串
            let str = "";
            // 循环矩阵 存入字符串
            for (let row = 0; row < result.length; row++) {
                let colstr = "";
                for (let col = 0; col < result[row].length; col++) {
                    colstr += result[row][col];
                }
                str += colstr + "\n";
            }
            // 打印界面
            console.clear();
            console.log(str)
        }, 200)
    }, 2000)
}
```

