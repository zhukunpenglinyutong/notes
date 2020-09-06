# Cocos2d

## 第一章：三小时开发FlappyBird

---

### 1.Cocos的安装和IDE

- [cocos2d 下载](https://www.cocos.com/products#CocosCreator)
- [编辑器：vscode](https://code.visualstudio.com/)

---

### 2.场景，精灵，节点树 等名词

- 场景（Scene）：类似于 拍电影中的一个场景
- 精灵（Sprite）：相当于 电影中的一个个演员
- 节点树（NodeTree）：和网页的节点树有类似的感觉（就是在 cocos creator 里面可以操作节点的树形结构）
- 节点（Node）:
- 画布（Canvas）:
- 资源（Assets）: 

---

### 3.节点和组件

> 我给一个节点设置，让它当Lable组件，这样可以，设置让它当精灵（Sprite）组件，这也可以，这就是他们之间的关系。这个对于有编程经验的我来讲，还是比较好理解的。（例如Button 是由 按钮精灵图 + 按钮组件 组合而成的）

- Button节点简单使用
  - 节点右键：创建一个UI节点 --> 创建一个Button组件
  - Transition 可以选择 COLOR 可以设置各个情况下按钮的点击状态

---

### 4.第一个脚本

- 创建脚本：在 Assets面板，Script文件夹下 右键创建 Ts脚本文件

---

### 5.帧和函数（基础知识普及）

- 帧：FPS 影像动画中最小单位的单幅影像画面
- 函数：实现某一种功能的代码块

```javascript
// 每刷新一帧页面 都会调用这个函数
update (dt: number) {
    console.log('dt', dt)
}
```

---

### 6.制作小鸟翅膀

```javascript
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    // 小鸟图片1
    @property(cc.Sprite)
    bird1: cc.Sprite = null;

    // 小鸟图片2
    @property(cc.Sprite)
    bird2: cc.Sprite = null;
    
    // 小鸟图片3
    @property(cc.Sprite)
    bird3: cc.Sprite = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    time: number = 10; // 距离上次切换显示小鸟，流逝的时间
    playSeq: number = 0; // 播放顺序

    start () {

    }

    /**
     * 小鸟动画播放函数
     * @param { Node } startNode 会默认全部取消，然后需要传入需要播放的节点
     */
    seditionReset(startNode: any) {
        this.bird1.node.active = false
        this.bird2.node.active = false
        this.bird3.node.active = false
        startNode.node.active = true;
    }

    // 每刷新一帧页面 都会调用这个函数
    update (dt: number) {

        this.time += dt

        if (this.time > 0.5) {
            if (this.bird1.node.active) {
                this.seditionReset(this.bird2)
                this.playSeq = 0;
            } else if (this.bird2.node.active && this.playSeq == 0) { // 正向播放
                this.seditionReset(this.bird3)
            } else if (this.bird2.node.active && this.playSeq == -1) { // 逆向播放
                this.seditionReset(this.bird1)
            } else if (this.bird3.node.active) {
                this.seditionReset(this.bird2)
                this.playSeq = -1;
            }
            this.time = 0;
        }
    }
}
```

---

## 第三章：物理弹球

> 这一章主要是讲 cocos的物理引擎

### 1.物理简介




