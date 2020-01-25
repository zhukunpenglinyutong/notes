const shelljs = require('shelljs'); // 前端写shell
const fs = require('fs');
const path = require('path');

/**
 * 遍历文件夹，生成 真实文件对象树
 * @return { name: '文件夹名称', data: [ {...}, {...} ], path: '路径'}
 */
function readDirToObjTreeTool() {

  let foldPath = shelljs.pwd().stdout // 当前目录的绝对路径

  console.log('当前路径的绝对路径：', foldPath)
  let objTree = []

  function recursion(foldPath, data, isRootPath = true) {

    let files = fs.readdirSync(foldPath)

    // 1.目录循环
    files.forEach(item => {
      // 如果有配置表，这里还需要进行配置过滤一下

      let isDir = fs.statSync(`${foldPath}/${item}`).isDirectory()

      // 判断逻辑：是文件，并且不是以 .开头的隐藏文件，并且不是 node_modules && build
      if (isDir && !/^\./.test(item) && item !== 'node_modules' && item !== 'build') {
        data.push({
          name: item,
          data: [],
          path: `${foldPath}/${item}`
        })
      } else if (!isRootPath) {
        if (item !== '.DS_Store') data.push(item);
      }

    })

    // 2.遍历目录循环（递归）
    data.length > 0 && data[0].name !== undefined
      ? data.forEach(item => { if (item.path) recursion(item.path, item.data, false) })
      : ''
  }

  recursion(foldPath, objTree)

  return objTree
}

module.exports = {
  readDirToObjTreeTool: readDirToObjTreeTool
}