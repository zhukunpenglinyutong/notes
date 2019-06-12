# 项目笔记《Vue.js2.5+cube-ui重构饿了么App》

## 第零章：绪论

[介绍](https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/%E7%AC%94%E8%AE%B0/%E6%85%95%E8%AF%BE%E7%BD%91-%E9%A5%BF%E4%BA%86%E4%B9%88%E5%A4%96%E5%8D%96/1.png)

---

## 第一章：项目准备工作

### 1. 准备

初始化项目：vue create elm
安装cube-ui：vue add cube-ui
  - 让你选是否启动后编译（启动的话我们打包的体积会变小）：Use post-compile? | Y
  - 部分引用还是全部引用：部分引用（partly, import component on demand,）
  - 自定义主题？Custom theme? | Y
  - Use rem layout? | No
  - Use vw layout? | No

### 2. api接口mock

- 这样就可以了mock数据了，神奇，我一般是放到 public里面，然后 fatch请求，但是这个直接模拟 get接口，仿佛更厉害一点

```javascript
const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

module.exports = {
  ......
  devServer: {
    before(app) {
      app.get('/api/seller', function (req, res) {
        res.json({
          errno: 0,
          data: seller
        })
      })
      app.get('/api/goods', function (req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/api/ratings', function (req, res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  }
}

```

## 第二章：头部组件开发

### 1. header组件开发