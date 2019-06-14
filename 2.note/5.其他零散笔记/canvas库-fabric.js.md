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


---

### fabricjs 对齐功能（8种）

```js
/**
 * @说明 用于对齐 fabrice元素（适用于v1.7*版本的fabric.js库）
 * 
 * @param {canvas} 参数说明：需要传入 new fabric.Canvas() 的那个对象
 * @param {alignparam} 参数说明：
 *  @param top 上对齐（默认值，已实现）
 *  @param left 左对齐（已实现）
 *  @param botton 底对齐（已实现）
 *  @param right 右对齐（已实现）
 *  @param horizontalC 水平居中对齐（已实现）
 *  @param verticalC 垂直居中对齐（已实现）
 *  @param horizontalA 水平平均分布（已实现）
 *  @param verticalA 垂直平均分布（已实现）
 * 
 * @author zkp
 * @time 2019.6.13 - 2019.6.14
*/
export const fabricItemAlign = (canvas, alignparam = 'top') => {

  // 实现方案一：通过计算，对顶掉偏差（这里框架内部计算还是有很大的问题的,不可控）
  // 规定术语说明，选中的好几个元素，最外层的那一个大的元素称之为 Z
  // canvas._activeGroup 表示 Z 也就是选中之后的最大的一层
  // canvas._activeGroup._objects 为选中的所有元素

  // v3.* 兼容性方案（下面代码写的是v1.7*版本的方案）
  // ①：canvas._activeGroup._objects 换为 canvas.getActiveObjects()
  // ②：canvas._activeGroup 换为 canvas._activeObject

  // 顶对齐
  if (alignparam === 'top') {
    // 是以选中框 为相对位置进行计算的（顶对齐就是 top为 0 ，左对齐就是 left 0）
    // 下面就是计算 剩余一个轴 相对于 选择框的相对位置
    canvas._activeGroup._objects.forEach(item => {
      // 顶对齐算法：top为零表示 依据选中框顶部对齐， left 为 选中点每一项的
      item.set({
        top: 0 - canvas._activeGroup.height * 0.5,
        left: (item.aCoords.tl.x - canvas._activeGroup.aCoords.tl.x) - canvas._activeGroup.width * 0.5
      })
    })
  }

  // 左对齐
  if (alignparam === 'left') {
    // 是以选中框 为相对位置进行计算的（顶对齐就是 top为 0 ，左对齐就是 left 0）
    // 下面就是计算 剩余一个轴 相对于 选择框的相对位置
    canvas._activeGroup._objects.forEach(item => {
      item.set({
        top: (item.aCoords.tl.y - canvas._activeGroup.aCoords.tl.y) - canvas._activeGroup.height * 0.5,
        left: 0 - canvas._activeGroup.width * 0.5
      })
    })
  }

  // 右对齐
  if (alignparam === 'right') {
    // top公式：与 左对齐一致
    // left公式：坐标要以 Z 的宽度为计算，并减去元素本身的宽度
    canvas._activeGroup._objects.forEach(item => {
      console.log(canvas._activeGroup)
      item.set({
        top: (item.aCoords.tl.y - canvas._activeGroup.aCoords.tl.y) - canvas._activeGroup.height * 0.5,
        left: (canvas._activeGroup.width - item.width) - canvas._activeGroup.width * 0.5
      })
    })
  }

  // 底对齐
  if (alignparam === 'bottom') {
    // top公式：与 左对齐一致
    // left公式：与 上对齐一致
    canvas._activeGroup._objects.forEach(item => {
      // 顶对齐算法：top为零表示 依据选中框顶部对齐， left 为 选中点每一项的
      item.set({
        top: (canvas._activeGroup.height - item.height) - canvas._activeGroup.height * 0.5,
        left: (item.aCoords.tl.x - canvas._activeGroup.aCoords.tl.x) - canvas._activeGroup.width * 0.5
      })
    })
  }

  // 水平居中对齐
  if (alignparam === 'horizontalC') {
    // top公式：(Z.heiht - 每一项的元素的.height) 其实就是这个元素相对于 Z 中线的一个居中位置（和CSS定位居中对齐一个原理）
    // left公式：保持位置相对不动
    canvas._activeGroup._objects.forEach(item => {
      item.set({
        top: (canvas._activeGroup.height - item.height) * 0.5 - canvas._activeGroup.height * 0.5,
        left: (item.aCoords.tl.x - canvas._activeGroup.aCoords.tl.x) - canvas._activeGroup.width * 0.5
      })
    })
  }

  // 垂直居中对齐
  if (alignparam === 'verticalC') {
    // top公式：保持位置相对不动
    // left公式：(Z.heiht - 每一项的元素的.height)
    canvas._activeGroup._objects.forEach(item => {
      item.set({
        top: (item.aCoords.tl.y - canvas._activeGroup.aCoords.tl.y) - canvas._activeGroup.height * 0.5,
        left: (canvas._activeGroup.width - item.width) * 0.5 - canvas._activeGroup.width * 0.5
      })
    })
  }

  // 水平平均分布
  if (alignparam === 'horizontalA') {

    // 水平等差间距：
    let count = 0;
    canvas._activeGroup._objects.forEach(item => { count += item.width })
    let es = (canvas._activeGroup.width - count) / (canvas._activeGroup._objects.length - 1)

    let sefNum = 0; // 记录中间过程值
    let sefNumOne = true; // 判定

    // console.log('水平等差间距是：', es)

    for (let i = 0, len = canvas._activeGroup._objects.length; i < len; i++) {
      // 等分排列 开始和结尾不变
      if (i !== 0 && i !== len - 1) {
        if (sefNumOne) {
          // 第二个的计算规则是：第一个的长度 + 等差间距
          sefNum += (canvas._activeGroup._objects[i-1].width + es)
          sefNumOne = false
        } else {
          // 其他项的计算规则是：sefNum（这个相当于前一个的 left值） + 前一个的宽度 + 等差间距
          sefNum += es + canvas._activeGroup._objects[i-1].width;
				}
				
				console.log('sefNum', sefNum)

        // top规则：保持相对位置不变
        // left规则：采用 sefNum 的值
        canvas._activeGroup._objects[i].set({
          top: (canvas._activeGroup._objects[i].aCoords.tl.y - canvas._activeGroup.aCoords.tl.y) - canvas._activeGroup.height * 0.5,
          left: sefNum - canvas._activeGroup.width * 0.5
        })
      }
    }

  }

  // 垂直平均分布
  if (alignparam === 'verticalA') {
    
    // 垂直等差间距：
    let count = 0;
    canvas._activeGroup._objects.forEach(item => { count += item.height })
    let es = (canvas._activeGroup.height - count) / (canvas._activeGroup._objects.length - 1)

    let sefNum = 0; // 记录中间过程值
    let sefNumOne = true; // 判定

    // console.log('垂直等差间距：', es)

    for (let i = 0, len = canvas._activeGroup._objects.length; i < len; i++) {
      // 等分排列 开始和结尾不变
      if (i !== 0 && i !== len - 1) {
        if (sefNumOne) {
          // 第二个的计算规则是：第一个的高度 + 宽度等差间距
          sefNum += (canvas._activeGroup._objects[i-1].height + es)
          sefNumOne = false
        } else {
          // 其他项的计算规则是：sefNum（这个相当于前一个的 top值） + 前一个的高度 + 宽度等差间距
          sefNum += es + canvas._activeGroup._objects[i-1].height;
        }

        // top规则：采用 sefNum 的值
        // left规则：保持相对位置不变
        canvas._activeGroup._objects[i].set({
          top: sefNum - canvas._activeGroup.height * 0.5,
          left: (canvas._activeGroup._objects[i].aCoords.tl.x - canvas._activeGroup.aCoords.tl.x) - canvas._activeGroup.width * 0.5
        })
      }
    }

	}
	
	// 其他对齐规则拓展 ......

  canvas.renderAll(); // 重新渲染
}

```
### fabricjs 元素操作辅助线功能

```js
/**
 * @说明 给fabirc中的元素加入辅助线（网上资料，修改使用）
 * @param {canvas} 参数说明：需要传入 new fabric.Canvas() 的那个对象
 * @host https://my.oschina.net/xmqywx/blog/1941539
 * @time 2019.6.12 
*/
export const initAligningGuidelines = canvas => {

	// 需求一：不可见元素就不进行 辅助线的提示，否者会很乱（未完成）

	var ctx = canvas.getSelectionContext(), // getSelectionContext 获取选择上下文
		aligningLineOffset = 5, // 对齐线条偏移
		aligningLineMargin = 4, // 对齐线边距
		aligningLineWidth = 1, // 对齐线条宽度
		aligningLineColor = '#666666', // 颜色
		viewportTransform, // 视图端口转换
		zoom = 1;

	// 画垂直线
	function drawVerticalLine(coords) {
		drawLine(
			coords.x + 0.5,
			coords.y1 > coords.y2 ? coords.y2 : coords.y1,
			coords.x + 0.5,
			coords.y2 > coords.y1 ? coords.y2 : coords.y1);
	}

	// 画水平线
	function drawHorizontalLine(coords) {
		drawLine(
			coords.x1 > coords.x2 ? coords.x2 : coords.x1,
			coords.y + 0.5,
			coords.x2 > coords.x1 ? coords.x2 : coords.x1,
			coords.y + 0.5);
	}

	// 画线
	function drawLine(x1, y1, x2, y2) {
		ctx.save();
		ctx.lineWidth = aligningLineWidth;
		ctx.strokeStyle = aligningLineColor;
		ctx.beginPath();
		ctx.moveTo(((x1+viewportTransform[4])*zoom), ((y1+viewportTransform[5])*zoom));
		ctx.lineTo(((x2+viewportTransform[4])*zoom), ((y2+viewportTransform[5])*zoom));
		ctx.stroke();
		ctx.restore();
	}

	// 范围
	function isInRange(value1, value2) {
		value1 = Math.round(value1);
		value2 = Math.round(value2);
		for (var i = value1 - aligningLineMargin, len = value1 + aligningLineMargin; i <= len; i++) {
			if (i === value2) {
				return true;
			}
		}
		return false;
	}

	var verticalLines = [],
		horizontalLines = [];

	// 移动
	canvas.on('mouse:down', function () {
		viewportTransform = canvas.viewportTransform;
		zoom = canvas.getZoom();
	});

	// 对象移动事件（移动到某个点才具有辅助线的功能）
	canvas.on('object:moving', function(e) {

		var activeObject = e.target,
			canvasObjects = canvas.getObjects(),
			activeObjectCenter = activeObject.getCenterPoint(),
			activeObjectLeft = activeObjectCenter.x,
			activeObjectTop = activeObjectCenter.y,
			activeObjectBoundingRect = activeObject.getBoundingRect(),
			activeObjectHeight = activeObjectBoundingRect.height / viewportTransform[3],
			activeObjectWidth = activeObjectBoundingRect.width / viewportTransform[0],
			horizontalInTheRange = false,
			verticalInTheRange = false,
			transform = canvas._currentTransform;

		if (!transform) return;

		// It should be trivial to DRY this up by encapsulating (repeating) creation of x1, x2, y1, and y2 into functions,
		// but we're not doing it here for perf. reasons -- as this a function that's invoked on every mouse move

		for (var i = canvasObjects.length; i--; ) {

			if (canvasObjects[i] === activeObject) continue;

			var objectCenter = canvasObjects[i].getCenterPoint(),
				objectLeft = objectCenter.x,
				objectTop = objectCenter.y,
				objectBoundingRect = canvasObjects[i].getBoundingRect(),
				objectHeight = objectBoundingRect.height / viewportTransform[3],
				objectWidth = objectBoundingRect.width / viewportTransform[0];

			// snap by the horizontal center line
			if (isInRange(objectLeft, activeObjectLeft)) {
				verticalInTheRange = true;
				verticalLines.push({
					x: objectLeft,
					y1: (objectTop < activeObjectTop)
						? (objectTop - objectHeight / 2 - aligningLineOffset)
						: (objectTop + objectHeight / 2 + aligningLineOffset),
					y2: (activeObjectTop > objectTop)
						? (activeObjectTop + activeObjectHeight / 2 + aligningLineOffset)
						: (activeObjectTop - activeObjectHeight / 2 - aligningLineOffset)
				});
				activeObject.setPositionByOrigin(new fabric.Point(objectLeft, activeObjectTop), 'center', 'center');
			}

			// snap by the left edge
			if (isInRange(objectLeft - objectWidth / 2, activeObjectLeft - activeObjectWidth / 2)) {
				verticalInTheRange = true;
				verticalLines.push({
					x: objectLeft - objectWidth / 2,
					y1: (objectTop < activeObjectTop)
						? (objectTop - objectHeight / 2 - aligningLineOffset)
						: (objectTop + objectHeight / 2 + aligningLineOffset),
					y2: (activeObjectTop > objectTop)
						? (activeObjectTop + activeObjectHeight / 2 + aligningLineOffset)
						: (activeObjectTop - activeObjectHeight / 2 - aligningLineOffset)
				});
				activeObject.setPositionByOrigin(new fabric.Point(objectLeft - objectWidth / 2 + activeObjectWidth / 2, activeObjectTop), 'center', 'center');
			}

			// snap by the right edge
			if (isInRange(objectLeft + objectWidth / 2, activeObjectLeft + activeObjectWidth / 2)) {
				verticalInTheRange = true;
				verticalLines.push({
					x: objectLeft + objectWidth / 2,
					y1: (objectTop < activeObjectTop)
						? (objectTop - objectHeight / 2 - aligningLineOffset)
						: (objectTop + objectHeight / 2 + aligningLineOffset),
					y2: (activeObjectTop > objectTop)
						? (activeObjectTop + activeObjectHeight / 2 + aligningLineOffset)
						: (activeObjectTop - activeObjectHeight / 2 - aligningLineOffset)
				});
				activeObject.setPositionByOrigin(new fabric.Point(objectLeft + objectWidth / 2 - activeObjectWidth / 2, activeObjectTop), 'center', 'center');
			}

			// snap by the vertical center line
			if (isInRange(objectTop, activeObjectTop)) {
				horizontalInTheRange = true;
				horizontalLines.push({
					y: objectTop,
					x1: (objectLeft < activeObjectLeft)
						? (objectLeft - objectWidth / 2 - aligningLineOffset)
						: (objectLeft + objectWidth / 2 + aligningLineOffset),
					x2: (activeObjectLeft > objectLeft)
						? (activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset)
						: (activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset)
				});
				activeObject.setPositionByOrigin(new fabric.Point(activeObjectLeft, objectTop), 'center', 'center');
			}

			// snap by the top edge
			if (isInRange(objectTop - objectHeight / 2, activeObjectTop - activeObjectHeight / 2)) {
				horizontalInTheRange = true;
				horizontalLines.push({
					y: objectTop - objectHeight / 2,
					x1: (objectLeft < activeObjectLeft)
						? (objectLeft - objectWidth / 2 - aligningLineOffset)
						: (objectLeft + objectWidth / 2 + aligningLineOffset),
					x2: (activeObjectLeft > objectLeft)
						? (activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset)
						: (activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset)
				});
				activeObject.setPositionByOrigin(new fabric.Point(activeObjectLeft, objectTop - objectHeight / 2 + activeObjectHeight / 2), 'center', 'center');
			}

			// snap by the bottom edge
			if (isInRange(objectTop + objectHeight / 2, activeObjectTop + activeObjectHeight / 2)) {
				horizontalInTheRange = true;
				horizontalLines.push({
					y: objectTop + objectHeight / 2,
					x1: (objectLeft < activeObjectLeft)
						? (objectLeft - objectWidth / 2 - aligningLineOffset)
						: (objectLeft + objectWidth / 2 + aligningLineOffset),
					x2: (activeObjectLeft > objectLeft)
						? (activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset)
						: (activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset)
				});
				activeObject.setPositionByOrigin(new fabric.Point(activeObjectLeft, objectTop + objectHeight / 2 - activeObjectHeight / 2), 'center', 'center');
			}
		}

		if (!horizontalInTheRange) {
			horizontalLines.length = 0;
		}

		if (!verticalInTheRange) {
			verticalLines.length = 0;
		}
	});

	// 结束绘画事件
	canvas.on('before:render', function() {
		canvas.clearContext(canvas.contextTop);
	});

	// 开始绘画事件（也就是图形开始变化）
	canvas.on('after:render', function() {
		for (var i = verticalLines.length; i--; ) {
			drawVerticalLine(verticalLines[i]);
		}
		for (var i = horizontalLines.length; i--; ) {
			drawHorizontalLine(horizontalLines[i]);
		}

		verticalLines.length = horizontalLines.length = 0;
	});

	canvas.on('mouse:up', function() {
		verticalLines.length = horizontalLines.length = 0;
		canvas.renderAll();
	});
}
```

---