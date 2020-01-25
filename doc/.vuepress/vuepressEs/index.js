// vuepress-es 主入口

let { readDirToObjTreeTool } = require('./tool.js'); // 工具函数
let { createNavData } = require('./navData.js'); // 生成导航栏
let { createSidebarData } = require('./sidebarData.js'); // 生成侧边栏

let dirObjTree = readDirToObjTreeTool() // 文件对象

class VuepressEs {
  
  constructor(navDataConfig = null) {  //构造器
    // 1.导航栏文案配置
    this.navDataConfig = navDataConfig
  }

  // 生成导航栏
  getNavData() {
    return createNavData(dirObjTree, this.navDataConfig);
  }

  // 生成侧边栏
  getSidebarData() {
    return createSidebarData(dirObjTree);
  }
}

module.exports = VuepressEs