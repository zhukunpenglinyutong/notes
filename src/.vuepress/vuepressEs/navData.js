/**
 * 生成导航栏
 * @param { Array } 文件对象树
 * @param { Object } 配置文件（全部）
 * @return { Array } 导航栏数组
 */
function createNavData(dirObjTree, config) {
  let navArr = [];

  for (let i = 0; i < dirObjTree.length; i++) {
    if (dirObjTree[i] === undefined) return;
    // 1.生成导航
    navArr.push({
      text: textTool(dirObjTree[i].name, config.navDataConfig),
      link: `/${dirObjTree[i].name}/`
    })
  }

  return navArr
}

// 用于根据配置文件 生成到导航栏
function textTool(data, config) {
  if (config == null) return data;
  for (let i = 0; i < config.length; i++) {
    if (config[i][0] === data) return config[i][1]
  }
  return data
}

module.exports = {
  createNavData: createNavData
}