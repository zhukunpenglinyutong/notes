# canvas库-fabric

### 前言

公司业务需要这个canvas库，但是中文文档很少，那就整理下吧，[fabricjs官网](http://fabricjs.com/)

---

### 为什么要学fabric?

- 引用作者做 fabric 的初衷

<img src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/notes/2.note/5.%E5%85%B6%E4%BB%96%E9%9B%B6%E6%95%A3%E7%AC%94%E8%AE%B0/1.png" />

我目前觉得做一个静态文件需要逐帧进行，或者知道最后的效果，然后中间是过度循环阶段，这些都需要的大量的操作和思考进行，我觉得fabric解决的问题就是，让我们专注思考，不关注怎么具体产生，解放生产力


**使用对比**

```js

// 使用canvas原生做一个矩形
var canvasEl = document.getElementById('c'); // 有一个id是c的canvas元素
var ctx = canvasEl.getContext('2d'); // 获取2d位图模型
ctx.fillStyle = 'red'; // 设置填充颜色
ctx.fillRect(100, 100, 20, 20); // 创建一个坐标100，190，尺寸是20，20的矩形

// 使用Fabric做同样的事情

var canvas = new fabric.Canvas('c'); // 用原生canvas元素创建一个fabric实例
// 创建一个矩形对象
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20
});
canvas.add(rect); // 将矩形添加到canvas画布上

```

但是上面建立的只是简单的一个矩形，我们如果要让这个矩形 旋转45°呢？

```js
// canvas原生需要加上这么多
ctx.translate(100, 100);
ctx.rotate(Math.PI / 180 * 45);
ctx.fillRect(-10, -10, 20, 20);

// fabric只需要在创建的时候（new fabric.Rect()） 传个属性即可
angle: 45
```

---

使用：引入cdn

```html
<script src="http://cdnjs.cloudflare.com/ajax/libs/fabric.js/2.4.6/fabric.min.js"></script>
```

---

[更多文档内容](https://github.com/Rookie-Birds/Fabric-Tutorial_zh-CN)

