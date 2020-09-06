// 生成导航栏，侧边栏（工具类）
function createSidebarData(dirObjTree) {
  let sidebarData = {};

  for (let i = 0; i < dirObjTree.length; i++) {
    if (dirObjTree[i] === undefined) return;
    
    let twLevelArr = []
    for (let j = 0; j < dirObjTree[i].data.length - 1; j++) {

      let childrenArr = []
      for (let z = 0; z < dirObjTree[i].data[j].data.length; z++) {
        childrenArr.push(`${dirObjTree[i].name}/${dirObjTree[i].data[j].name}/${dirObjTree[i].data[j].data[z]}`)
      }

      twLevelArr.push({
        title: dirObjTree[i].data[j].name,
        children: childrenArr
      })
    }

    sidebarData[`/${dirObjTree[i].name}`] = twLevelArr
  }

  return sidebarData
}

module.exports = {
  createSidebarData: createSidebarData
}