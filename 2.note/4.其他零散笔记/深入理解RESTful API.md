# 深入理解RESTful API

## 🔥第一章：认识RESTful API

---

### 1.REST是什么以及它的6个限制

- **什么是REST**：REST是一种架构风格，用来创建网络服务
- **为何叫REST**：英语全称是 Representational State Transfer
  - Representational：数据表示形式，可以用很多种，一般用JSON
  - State：当前状态或者数据
  - Transfer：数据传输

**通过字面意思来看是不好理解的，或者说不全面的，但是我们可以通过REST的六个限制来更深刻的认识REST**

- 客户-服务器（Clent-Server）（这个解释非常的好🔥）
  - 关注点分离（服务端关注数据存储，提升了简单性；前端专注用户界面，提高了可移植性）
  - 简单性解释：过去服务端端还需要渲染页面，现在只需要写好数据存储就好了
  - 可移植性解释：调用接口，渲染平台的能力，很多平台都支持这种操作
- 无状态（Stateless）
  - 所有用户会话信息都保存在客户端
  - 每次去请求必须包括所有信息，不能依赖上下文信息（例如小说翻页，你想请求下一页，服务器不知道下一页是啥，需要你确定的请求第几页才行）
  - 🔥无状态的好处：服务端不用保存会话信息，提升了简单性，可靠性，可见性
- 缓存（Cache）
  - 所有服务端响应都要标记可缓存或者不可缓存
  - 缓存的好处：减少前后端交互，提升了性能
- 统一接口（Uniform Interface）🔥
  - 接口设计尽可能统一通用，提升了简单性，可见性
  - 接口与实现解耦，使前后端可以独立开发迭代（接口定好之后，前端可以自己mock数据，不用等后端开发完成）
- 分层系统（Layered System）
  - 每层只知道相邻的一层，后面隐藏的就不知道了
  - 客户端不知道是在和代理还是真正的服务器通信
  - 其他层：安全层，负载均衡层，缓存层等（阿里巴巴有个机构专门做这种层的，不用关系业务逻辑）
- 按需代码（Code-On-Demand可选）（不是很重要）
  - 客户端可以下载运行服务端传过来代码（例如JS）
  - 减少一些功能，简化客户端

---

### 2.统一接口限制（接口需要统一成什么样子？）

- 资源的标识
  - 资源是任何可以命名的的事物，比如用户，评论等
  - 每个资源通过URL被统一的标识（例如：https://api.github.com/users）
- 通过表述来操作资源（这个我懂，我就是这样用的）
  - 客户端不能直接操作（比如SQL）服务端资源
  - 客户端应该通过表述（比如JSON）来操作资源
- 自描述信息
  - 每个消息（请求或者响应）必须踢狗足够的信息让接受者理解
  - 例如：你可以需要传媒体类型（application/json,application/xml）
  - 例如：你需要规定请求类型：GET,POST,DELETE
  - 例如：响应是否被缓存：Cache-Control
- 超媒体作为应用状态引擎（没懂）
  - ...

后记：GitHub api 有 v3，也就是 REST API,还有 v4 GraphQL api 学完v3可以看下v4

---

### 3.RESTful API简介

- 字面解释是：符合REST架构风格的API
- RESTful API 具体长什么样子呢？
  - 基本的URL，例如:https//api.github.com/users
  - 标准HTTP方法，例如 GET,POST,PUT,PATCH,DELETE
  - 传输的数据媒体类型，如JSON，XML
- 现实举例
  - GET /users | 获取user列表
  - GET /users/12 | 查看某个具体的user
  - POST /users | 创建一个user
  - PUT /users/12 | 更新user为12的用户
  - DELETE /users/12 | 删除user为12的用户

---

### 4.RESTful API设计最佳实践（规范化，对我很重要）🔥

- 请求设计规范 ✅
  - URL要使用名词，尽量用复数，如 /users
  - URL使用嵌套表示关联关系，如 /users/12/repos/5
  - 使用正确的HTTP方法，如 GET/POST/PUT/DELETE
  - 不符合增删改查的情况下：POST/...
- 响应设计规范 ✅
  - 查询（每一个返回值都是可以被查询的，也就是我们加上返回条件，就能筛选我们想要的结果）
  - 分页
  - 字段过滤（完整的字段假如有十个，这个可以规定我想要的字段）
  - 状态码
  - 错误处理（如果错了，要规范化的返回错误信息）
- 安全（这个也是有收获的）✅
  - 使用HTTPS（使用HTTP容易被篡改，加上一些广告什么的，很烦）
  - 鉴权（需要登录才能请求某些接口）
  - 限流（防止某些坏人刻意占用接口）
- 开发者优化
  - 文档
  - 超媒体

---

## 🔥第二章：用Koa 说 Hello World

### 1.Koa简介

- 一句话简介：基于Node.js的下一代web框架
  - 基于Node.js：说明koa是一个Node.js模块
  - 下一代：蚕食第一代Express市场
  - web框架：不是命令行工具，不是算法
- 官网详细介绍
  - 由Experss幕后人原班人马打造
  - Web应用和API开发领域
  - 更小，更富有表现力，更健壮
  - 利用async函数，丢弃回调函数
  - 增强错误处理：try catch
  - 没有捆绑任何中间件
  - 快速而愉快的编写程序（画的一个大饼）

<img src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/notes/2.note/5.%E5%85%B6%E4%BB%96%E9%9B%B6%E6%95%A3%E7%AC%94%E8%AE%B0/%E6%85%95%E8%AF%BE%E7%BD%91%E8%AF%BE%E7%A8%8BRESTful%20API/1.png" />

---

### 2.安装搭建第一个Koa程序

- 初始化目录：npm i koa --save
- 使用：建立 app.js，让koa返回一个 hello world

```js
const Koa = require('koa');
const app = new Koa();

//use() 方法里面可以传递函数，这个函数就是我们说的中间件
app.use( ctx => {
  ctx.body = "Hello World";
});

app.listen(3000)
```

---

### 3.Koa中间件与洋葱模型

- async/await 示例（当一个请求依赖上个请求完成的情况下，需要用嵌套，这个非常的不优雅）

```js
// 这个可是解决了我不能在任何地方用 async 的方法
(async () => {
  const res1 = await fetch('...') // 嵌套一
  const res2 = await fetch('...') // 嵌套二
})
```

- **学习编写Koa中间件**

```js
const Koa = require('koa');
const app = new Koa();

//use() 方法里面可以传递函数，这个函数就是我们说的中间件,这是一个中间件，执行多个中间件，必须要写 next 参数 🔥🔥🔥
app.use( async (ctx, next) => {
  await next();
  ctx.body = "Hello World";
});

app.use( ctx => {
  console.log('我也是中间件，我要先执行')
});

app.listen(3000)

```

**洋葱模型**

<img src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/notes/2.note/5.%E5%85%B6%E4%BB%96%E9%9B%B6%E6%95%A3%E7%AC%94%E8%AE%B0/%E6%85%95%E8%AF%BE%E7%BD%91%E8%AF%BE%E7%A8%8BRESTful%20API/2.png" />

---

## Koa 和 RESTful API 的最佳实践

### 1.路由简介

- 路由决定了不同的URL是如何被 不同执行的
- 在Koa中，路由的本质是一个中间件
- 思考，如果没有路由会怎么样？请求和响应都没法 差异化，请求和返回的结果都一样，就跟上面我们返回的 Hello World一样，这.....是不行的
- 路由存在的意义：处理不同的URL，处理不同的http请求，解析URL上的参数

---

### 2.自己编写Koa路由中间件

- 目标实现功能：处理不同的URL，处理不同的http方法，解析URL上的参数

```js
const Koa = require('koa');
const app = new Koa();

//use() 方法里面可以传递函数，这个函数就是我们说的中间件,这是一个中间件，执行多个中间件，必须要写 next 参数
app.use( ctx => {
  // ① 处理不同的URL：ctx.url 表示上下文的URL，ctx表示上下文
  // ② 处理不同的http方法：ctx.method
  // ③ 解析URL上的参数 
  ctx.body = `路径：${ctx.url}，请求类型：${ctx.method}, 参数：${getURLParameters(ctx.url)}`
  
});

// 获取url中的参数
function getURLParameters(url) {
  const params = url.match(/([^?=&]+)(=([^&]*))/g)
  return params?params.reduce(
    (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
  ):[]
}

app.listen(3000)
```

---

### 3.使用Koa-router实现路由

- 安装：npm i koa-router --save

**基本使用**

```js
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router;

// 注册路由
router.get('/', ctx => {
  ctx.body = '这是首页'
})

// 解析URL参数
router.get('/user/:id', ctx => {
  ctx.body = `这是用户${ctx.params.id}`
})

// 注册router中间件（要用router中的routes()方法）
app.use(router.routes())

app.listen(3000)
```

**路由前缀和多中间件使用（这里使用不规范，整理以后比较规范的结构）**

---

### 4.HTTP options 方法的用（额，对我目前没太大用，就是增加些知识广度）

- 🔥options 是HTTP请求类型中的一种（GET,POST......）
- 这是一道常考面试题，还可以帮助理解 koa-router 的 allowedMethods 的作用
- **🔥options 作用**
  - 检测服务器所支持的请求方法
  - CORS中的预见请求
- **allowedMethods 作用**
  - 响应 options 方法，告诉所支持的请求方法
  - 相应的返回 405（不允许）和 501（没实现）

---

### 🔥5.增删改查应该返回什么响应？

**这里听说是最佳实践，但是我观点是，我再看看，选择适合自己的**

```js
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router;

// 增
router.post('/', ctx => {
  ctx.body = [{}] // 返回新建的数据
})

// 删
router.delete('/user', ctx => {
  ctx.status = 204 // 返回状态码 204，表示没有内容，但是成功了
})

// 改
router.put('/user', ctx => {
  ctx.body = [{}] // 返回修改后的数据
})

// 查
router.get('/user', ctx => {
  ctx.body = [{},{},{}] // 返回数据列表
})


// 注册router中间件（要用router中的routes()方法）
app.use(router.routes())
app.listen(3000)
```

---

## 📚参考列表（最后更新2019.6.23 23:23）

- [慕课网课程-Node.js开发仿知乎服务端 深入理解RESTful API](https://coding.imooc.com/learn/list/354.html)