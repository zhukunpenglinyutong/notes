# 深入理解RESTful API

## 🌴第一章：认识RESTful API

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

## 🌳第二章：用Koa 说 Hello World

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

## 🎄第三章：Koa 和 RESTful API 的最佳实践

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

## 🌵第四章：koa框架的控制器以及设计更合理的目录结构

### 1.控制器简介

- 什么是控制器？拿到路由分配的任务，并执行
- 在Koa中，控制器是一个中间节
- 为什么要用控制器
  - 获取http请求参数
  - 处理业务逻辑（获取数据，处理数据，存储数据...）
  - 根据情况发送http响应
- 获取http请求参数
  - （查询字符串）Query String，例如 ?q=keyword
  - （路由参数）Router Params，如 /users/:id （这个一般是必选的，而且可能有多个路由参数，我们公司也差不多是这样的）
  - 🔥（请求体）Body，如 { name: '朱昆鹏' }（一般用json）（From也是很常用的请求体）
  - （请求头）Header，如 Accept,Cookie

---

**🔥编写控制器最佳实践**

- 每个资源的控制器放到不同的文件夹下
- 尽量使用类+类方法的形式编写控制器（我是一个接口就是一个函数，他这个的思想是，写成一个类，然后我的这些接口都是类方法，这样这些接口可以使用类的公共内容）
- 严谨的错误处理

---

### 2.获取http请求参数

- 请求参数有：获取 query,获取 router params，获取 body, 获取 header
- 通过断点调试，我发现 ctx 这个上下文上挂载的是我需要好好看看的各种东西，http参数都在这里面写着呢，名字也是通俗易懂
- 🔥body这是个请求体，但是 koa是没有解析请求体的功能的（ctx上没有解析body的内容，ctx.body 是设置返回的，和这个没关系），需要加一个中间件
- 安装解析请求体中间件：npm i koa-bodyparser --save

```js
const bodyparser = require('koa-bodyparser')
// ......
app.use(bodyparser())

// 🔥使用：ctx.request.boay
```

---

### 3.发送HTTP响应

- 如何发送status，body，header

```js
// ......
router.get('/user', ctx => {
  ctx.status = 200 // 设置 status
  ctx.body = '...' // 设置 body
  ctx.set('Allow', 'GET,POST') // 设置响应头
})
```

---

### 🔥4.更合理的目录结构

- 路由，控制器都放在一个目录里

```js
// 🇨🇳 routes 文件夹 /users.js文件
const Router = require('koa-router');
const router = new Router; // new Router({prefix:'user'}) 这样可以设置路由前缀，也是实用的

// 查
router.get('/user', ctx => {
  ctx.body = [{},{},{}] // 一般返回数据列表
})

module.exports = router // 导出


// 🇨🇳 写一个 routes/index.j 用来批量注册路由
const fs = require('fs')
module.exports = app => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') {return;}
    const route = require(`./${file}`)
    app.use(route.routes()).use(route.allowedMethods())
  })
}

// 🇨🇳 app.js 中使用批量注册
const routing = require('./app/routes')
routing(app)

// 🇨🇳 建立 controllers 文件夹，在里面建立 users.js 🔥🔥🔥（这个定义类和使用类的方式，我喜欢，GET到了，确实比我写的Express正规）
class Users {
  // 获取用户列表
  getUsers (ctx) {
    ctx.body = '获取了用户列表'
  }
}
module.exports = new Users()

// 🇨🇳在路由中使用
const { getUsers } = require('../controller/users') // 这是ES6语法，更简单
// 获取所有列表
router.get('/users', getUsers)
module.exports = router // 导出
```

---

## 🌱第五章：多种方案实现错误处理机制

### 1.错误处理简介

- 什么是错误处理？错误处理是编程语言或计算机硬件中的一种机制，用于处理软件或信息系统中出现的异常状况
- 异常状况有哪些？
  - 运行时错误：都返回500（代表服务器内部错误）
  - 逻辑错误：找不多（404），先决条件失败（412），无法处理的
- 为什么要用错误处理？
  - 防止程序挂掉
  - 告诉用户错误信息

---

### 2.koa自带的错误处理

- 如果请求的接口不存在的话，就会返回 404
- 如果服务器内部语法错误，或者其他错误，就会返回 500

```js
// 手动抛出
ctx.throw(404, '返回报错文本信息')
```

**❣️但是这里返回的都是文字，我们想返回JSON，这样才格式统一**

---

### 3.自己编写错误处理中间件

- 写到所有中间件的最前面

```js
// 原理就是捕捉下一个中间件的报错，然后返回状态码和内容（JSON格式）
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || err.statusCode
    ctx.body = {
      message: err.message
    }
  }
})
```

---

### 4.使用 koa-json-error进行错误处理

- 安装：npm i koa-json-error --save

```js
// app.js
const error = require('koa-json-error')
app.use(error())

// 堆栈信息都返回了，这里可以配置
// {
//     "message": "Not Found",
//     "name": "NotFoundError",
//     "stack": "NotFoundError: Not Found\n    at Object.throw (/Users/zhukunpeng/Desktop/RESU ful API/node_modules/koa/lib/context.js:97:11)\n    at /Users/zhukunpeng/Desktop/RESU ful API/node_modules/koa-json-error/lib/middleware.js:52:58\n    at processTicksAndRejections (internal/process/task_queues.js:89:5)",
//     "status": 404
// }
```

**🔥设置环境变量，让我们在开发时候错误处理返回堆栈信息，生产环境不返回（未完成）**

- 安装：npm i cross-env --save-dev

---

### 5.使用koa-parameter进行参数校验

- 安装：npm i koa-parameter --save

```js
// app.js
// 这个通常是校验请求体
const parameter = require('koa-parameter')
app.use(parameter(app)) // 参数校验，加入app的话，就能在全局使用了

// controller/users.js

// 新建用户
async createUser(ctx) {
  
  ctx.verifyParams({
    name: {type: 'string'}
  })
  const { name } = ctx.request.body
  const user = await new User(ctx.request.body).save()
  ctx.body = user
}

```

**如果错了的话**

<img src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/notes/2.note/5.%E5%85%B6%E4%BB%96%E9%9B%B6%E6%95%A3%E7%AC%94%E8%AE%B0/%E6%85%95%E8%AF%BE%E7%BD%91%E8%AF%BE%E7%A8%8BRESTful%20API/10.png" />

**还有更多的限制条件，例如必选，例如什么类型，这个都可以查阅**

---

## 🌿第六章：koa + MongoDB 实现增删改查

### 1.NoSQL简介

- 不属于关系型数据库的哪一类 被称为 NoSQL
- NoSQL数据库的分类
  - 列存储（HBase）
  - 🔥文档存储（MongoDB）（所谓文档存储就是按照JSON存储）
  - key-value 存储（Redis）(通常用于缓存和消息通信)
  - ......
- 为什么要用 NoSQL
  - 简单（没有原子性，一致性，隔离性等复杂规范）（关系型数据库要多个机器协同工作，必须要符合这些规范，这样就增加了很多通信）
  - 便于横向拓展（因为简单，没有规范，所以便于拓展）
  - 适合超大规模的数据存储（还是因为拓展）
  - 很灵活的存储复杂结构的数据

---

### 🔥2.mongoose 连接 MongoDB

- 安装：npm install mongoose --save

```js
// 引入
const mongoose = require('mongoose')

// 使用
mongoose.connect('mongodb://47.95.0.108:27017/test', {useNewUrlParser: true}, () => {
    console.log('连接成功')
})
mongoose.connection.on('error', console.error);

```

---

### 3.设计用户模块的Schema

- 这里的Schema是JSON的，写完之后，我们生成一个 Model

```js
// 我们在 /app/model/users.js 建立一个model文件夹，在里面建立users.js
const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true }, // 第一个表示是字符串这没啥，第二个意思是必写项
})

module.exports = model('User', userSchema); // 前面User会在MongoDB里面建立一个集合
```

---

### 🔥4.MongoDB实现用户的增删改查

```js
// 引入
const User = require('../model/users')

class UsersCtl {

  // 查询用户
  async findUser(ctx) {
    console.log(User.findByIdAndRemove)
    ctx.body = await User.find()

  }

  // 新建用户
  async createUser(ctx) {
    const user = await new User(ctx.request.body).save()
    ctx.body = user
  }

  // 删除 和 修改 还有问题

}

module.exports = new UsersCtl()
```


---

## 🎋第七章：JWT在Koa框架中实现用户的认证与授权

### 1.session简介

- session是一种非常重要，常见的，用户认证与授权

**session工作原理**

- 先登录，然后后端返回一个session id，然后前端再请求非登录的一些信息的时候都需要带上这个，否者报错

<img src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/notes/2.note/5.%E5%85%B6%E4%BB%96%E9%9B%B6%E6%95%A3%E7%AC%94%E8%AE%B0/%E6%85%95%E8%AF%BE%E7%BD%91%E8%AF%BE%E7%A8%8BRESTful%20API/3.png" />

- session的优势
  - 相比 JWT，最大的优势就在于可以主动清除session
  - session保存在服务器端，相对较为安全
  - 结合 cookie 使用，较为灵活，兼容性较好
- session的劣势
  - cookie + session 在跨域场景下表现并不好
  - 如果是分布式部署，需要做多机共享session机制 🔥
  - 基于cookie的机制很容易被CSRF
  - 查询 session 信息可能会有数据库查询操作
- session相关概念介绍
  - 主要放到服务器端，相对于安全
  - cookie 主要放到客户端，并不是很安全
  - sessionStronge：仅在当前会话下有效，关闭页面或者浏览器后被清除
  - localstorage：除非被清除，否者永久保存


---

### 2.JWT简介

- 什么是JWT？（JSON Web Token 是一个开放标准（RFC 7519））
- 定义了一种紧凑且独立的方式，可以将各方之间的信息作为JSON对象进行安全传输
- 该信息可以验证和信任，因为是经过数字签名的
- JWT的构成：头部（Header）, 有效载荷（Payload）,签名（Signature）

<img src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/notes/2.note/5.%E5%85%B6%E4%BB%96%E9%9B%B6%E6%95%A3%E7%AC%94%E8%AE%B0/%E6%85%95%E8%AF%BE%E7%BD%91%E8%AF%BE%E7%A8%8BRESTful%20API/4.png" />

**有效载荷介绍（这个挺重要的）**

<img src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/notes/2.note/5.%E5%85%B6%E4%BB%96%E9%9B%B6%E6%95%A3%E7%AC%94%E8%AE%B0/%E6%85%95%E8%AF%BE%E7%BD%91%E8%AF%BE%E7%A8%8BRESTful%20API/5.png" />


**JWT原理**

<img src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/notes/2.note/5.%E5%85%B6%E4%BB%96%E9%9B%B6%E6%95%A3%E7%AC%94%E8%AE%B0/%E6%85%95%E8%AF%BE%E7%BD%91%E8%AF%BE%E7%A8%8BRESTful%20API/6.png" />

---

### 3. JWT vs session

- 可拓展性
  - session 一般都是存到 redis 这种数据库中，你可以需要做一个中心式的session存储系统才行，否则没办法共享
  - 基于 token 基于 令牌的这种方式是无状态的，我们可以轻松的拓展（听着怎么感觉这个很溜 🔥）
- 安全性（...讲了四个，有空看下吧）
- RESTful API（要求是无状态的，这就用JWT）
- 性能（各有利弊）
  - JWT可能性能不好，因为 session 更小
  - session 毕竟放到客户端的是一段 id，传到服务器端，服务器端还要根据这个id拿真正的 session 数据，也是有性能消耗的
- 时效性
  - JWT 必须等到过期才更新，不能主动销毁
  - session 可以主动销毁

---

### 4.在 Node.js 中使用 JWT

- 安装：npm i jsonwebtoken
- 签名：
- 逆向验证：

```js
const jwt = require('jsonwebtoken');

// 签名（参数一，就是传过来的参数，参数二 是秘钥）
token = jwt.sign({name: 'zhu'}, 'test')
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiemh1IiwiaWF0IjoxNTYxNzI0NTUzfQ.-JVehTSs3neUbRzF__9lTsXEul_rvA5WYNbpx702Eo4'

// 验证（参数一，前端传过来的token，参数二 秘钥）
jwt.verify(token, 'test')
```

---

### 5.实现用户注册

- 设计用户 Schema
- 编写保证唯一性的逻辑

```js
// 设计用户 Schema
const userSchema = new Schema({
    // 这个是自动生成的，但是每次都返回不好，所以我们这里给他设置下，让它不返回
    __v: {type: Number, select: false},
    name: { type: String, required: true }, // 第一个表示是字符串这没啥，第二个意思是必写项
    // select 的意思是不返回，这是密码，如果能被请求到，那是不是很恐怖🙀
    password: {type: String, required: true, select: false}
})

// 新建用户（有个查询用户名是否重复）
async createUser(ctx) {
  const { name } = ctx.request.body
  const repeatedUser = await User.findOne({ name }); // 查询是否有这个用户了

  if (repeatedUser) ctx.throw(409, '用户已经存在');
  const user = await new User(ctx.request.body).save()
  ctx.body = user
}
```

---

### 6.实现登录并获取 Token

- 登录接口的设计（因为它不属于用户增删改查中的一种）
- 使用 jsonwebtoken 生成 token

```js
// 登录
async login(ctx) {
  // 校验用户名和密码
  const user = await User.findOne(ctx.request.body)
  if (!user) { ctx.throw(401, '用户名或者密码不正确')}
  // 登录正确，生成token
  const { _id, name } = user;
  const token = josnwebtoken.sign({ _id, name }, key, {expiresIn: '1d'}) // 参数一 账号密码，参数二 秘钥，参数三 配置，这里配置的是过期时间 1d 1天
  ctx.body = { token }
}
```

---

### 7.自己编写中间件实现用户的认证和授权

---

### 8.用koa-jwt中间件实现用户的认证和授权

- 安装：npm i koa-jwt --save

```js
// 在路由 /routes/users.js
const jwt = require('koa-jwt');
const auth = jwt({ secret: 'zhukunpeng'}) // 传入秘钥

router.post('/user/:id', auth, checkOwner, findUserId) // 根据ID 查询特定用户 数据

// /controller/users.js
// 权限校验
async checkOwner(ctx, next) {
  if (ctx.params.id !== ctx.state.user._id) {ctx.throw(403, '没有权限查看')}
  await next();
}
```

<img src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/notes/2.note/5.%E5%85%B6%E4%BB%96%E9%9B%B6%E6%95%A3%E7%AC%94%E8%AE%B0/%E6%85%95%E8%AF%BE%E7%BD%91%E8%AF%BE%E7%A8%8BRESTful%20API/7.png" />


---

## 🐲第八章：上传图片模块

### 1.上传图片需求分析

- 用户头像
- 封面图片
- 问题和回答中的图片
- 话题图片

---

- 基础功能：上传图片，生成图片链接
- 附加功能：限制上传图片的大小和类型，生成高中低三种分辨率的图片链接，生成CDN
- 上传图片的技术方案
  - 阿里云OSS等云服务，推荐生成环境下使用
  - 直接上传到服务器，不推荐在生产环境下使用，因为不稳定

---

### 2.使用 koa-body 中间件获取上传的文件

- 之前我们用的是 koa-bodyparser ，但是这个不支持文件，只支持 JSON 和... ，所以我们用 koa-body 这个中间件
- 安装：npm i koa-body  --save

```js
// app.js && 建立 public/uploads 用来盛放上传文件
const bodyBody = require('koa-body')
app.use(bodyBody({
    multipart: true, // 启用文件传输
    formidable: {
        uploadDir: path.join(__dirname, 'app/public/uploads'), // 文件上传路径
        keepExtensions: true, // 保留拓展名
    }
})) // 解析 请求body中的 JSON

// 建立 controller/home.js
class HomeCtl {

    // 上传文件
    upload(ctx) {
        const file = ctx.request.files;
        ctx.body = {
          message: '上传成功'
        } 
    }
}

module.exports = new HomeCtl()

// 建立 router/home.js
const Router = require('koa-router');
const router = new Router; // new Router({prefix:'user'}) 这样可以设置路由前缀，也是实用的
const { upload } = require('../controller/home');

router.post('/upload', upload)

module.exports = router

```

---

### 3.使用 koa-static 中间件生成图片链接

- 安装：npm i koa-static --save

```js
// app.js
const koaStatic = require('koa-static')
app.use(koaStatic(path.join(__dirname, 'app/public/'))) // 生成上传图片链接，这里还启动了静态服务，直接代理我们设置的文件路径


// controller/home.js
const path = require('path')
class HomeCtl {
    // 上传文件
    upload(ctx) {
        const file = ctx.request.files.file;
        const basename = path.basename(file.path)
        ctx.body = { url: `${ctx.origin}/uploads/${basename}`}
    }
}
module.exports = new HomeCtl()

```

---

### 4.编写前端页面上传文件

```html
<form action="http://localhost:3000/upload" enctype="multipart/form-data" method="POST">
  <input type="file" name="file">
  <button type="submit">上传</button>
</form>
```

**返回结果**

```js
{
    "url": "http://localhost:3000/uploads/upload_34ca030139713427223a1c8b604b603a.jpg"
}
```

---

## 🍀第九章：个人资料模块

---

### 1.个人资料的 schema 设计

```js
// module/users.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    __v: {type: Number, select: false},
    name: { type: String, required: true }, // 第一个表示是字符串这没啥，第二个意思是必写项
    password: {type: String, required: true, select: false},
    avatar_url: { type: String }, // 头像的URL
    gender: { type: String, enum: ['male', 'famale'], default: 'male' }, // 性别，这里后面 enum 是mongoose的可枚举类型，枚举的值是那两个, 后面的是默认值 male
    handline: { type: String }, // 一句话介绍
    loacations: { type: [{type: String}]}, // 居住地，类型是字符串数组
    employments: { // 职业经历
        type: {
            company: { type: String }, // 公司
            job: { type: String } // 职位
        }
    }
})

module.exports = model('User', userSchema); // 前面User会在MongoDB里面建立一个集合

```

---

### 2.个人资料的参数校验

```js
// 还是有一些和 mongoose 不一样的地方，这里要注意
ctx.verifyParams({
  name: { type: 'string' },
  avatar_url: { type: 'string', required: false }, // required: false表示非必选
  gender: { type: 'string', required: false },
  handline: { type: 'string', required: false },
  loacations: { type: 'array', itemType: 'string', required: false }, // itemType这是表示数组里面的项是字符串类型，这和mongoose不一样
  employments: { type:'array', itemType: 'object', required: false }
})
```

---

### 🔥3.RESTful API 最佳实践 - 字段过滤

- 有哪些字段显示，哪些字段不显示，有种GrhpQL的感觉

```js
// 通过 select: false 我们可以隐藏一些返回字段
const userSchema = new Schema({
    __v: {type: Number, select: false},
    name: { type: String, required: true }, // 第一个表示是字符串这没啥，第二个意思是必写项
    password: {type: String, required: true, select: false},
    avatar_url: { type: String }, // 头像的URL
    gender: { type: String, enum: ['male', 'famale'], default: 'male' }, // 性别，这里后面 enum 是mongoose的可枚举类型，枚举的值是那两个, 后面的是默认值 male
    handline: { type: String, select: false}, // 一句话介绍
    loacations: { type: [{type: String}], select: false}, // 居住地，类型是字符串数组
    employments: { // 职业经历
        type: {
            company: { type: String }, // 公司
            job: { type: String } // 职位
        },
        select: false
    }
})

// /controller/users.js（主要就是借助mongoose 的 select方法，拼接成 +...+...这种形式）

// 问题就是 现在一个可以，但是两个就不行了

// 查询用户
async findUser(ctx) {
  const { fields } = ctx.query; // 这是以分号隔开的
  let selectFidlds = null;
  // 将分号隔开的转为 +...+ 这种形式
  if (fields) selectFidlds = fields.split(';').filter(f => f).map(f => '+' + f).join('');
  ctx.body = await User.find().select(`${selectFidlds}`)
}
```

---

## 第十章：关注与粉丝模块

### 1.关注与粉丝的 schema 设计

**功能点**

- 关注，取消关注
- 获取关注人，粉丝列表（用户-用户 多对多关系）

---

```js
const userSchema = new Schema({
  // ......
  following: { // 关注
      type: [ { type: Schema.Types.ObjectId, ref: 'User' } ], // 非常好的一个技巧，但是我不太懂
      select: false
  }
})

```


---

### 2.RESTful API 风格的关注与粉丝接口

---

## 🌿第十五章：项目上线，部署


### 1.用NGINX实现端口转发

**一般服务器很多端口都没开，一般80端口开了，NGINX 就可以代理80端口，然后访问到内网的具体端口上**

- 语法检查：nginx -t（主要修改nginx.conf）
- 重启：service nginx restart

<img src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/notes/2.note/5.%E5%85%B6%E4%BB%96%E9%9B%B6%E6%95%A3%E7%AC%94%E8%AE%B0/%E6%85%95%E8%AF%BE%E7%BD%91%E8%AF%BE%E7%A8%8BRESTful%20API/8.png" />

**Postman生成文档**

- 还是很漂亮的

<img src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/notes/2.note/5.%E5%85%B6%E4%BB%96%E9%9B%B6%E6%95%A3%E7%AC%94%E8%AE%B0/%E6%85%95%E8%AF%BE%E7%BD%91%E8%AF%BE%E7%A8%8BRESTful%20API/9.png" />

---

## 📚参考列表（最后更新2019.6.23 23:23）

- [慕课网课程-Node.js开发仿知乎服务端 深入理解RESTful API](https://coding.imooc.com/learn/list/354.html)