var fs = require("fs");
var path = require('path')
var stat = fs.stat;

// 首页介绍文档模板
let dataReadme = `---
home: true
heroImage: https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/github%E5%9B%BE%E7%89%87/notes/3.png
actionText: 🔥速查 →
actionLink: /1.quickcheck/
features:
- title: 快速查阅
  details: 多节点CDN加速，让网站访问速度更快；优化目录结构，让用户查阅更快
- title: 保证网站高度可用
  details: 自动化工具实现CI/CD，快速更新此网站，不断成长，不断完善，给用户越来越优质的体验
- title: 项目思想核心
  details: 学过的东西，时间花一遍就行，剩下的交给此项目，不担心遗忘，举一反三，触类旁通，这是项目达到的最终效果，此项目可能达不到最终效果，但是作为另一个可以达到此效果项目（itztool（开发者 + itztool = 超人））的前置知识库还是可以的
footer: MIT Licensed | © Copyright 2019 朱昆鹏 - All Rights Reserved
---`

function init() {

  // 判断如果有docs目录，就删除掉 docs目录
  // node 只可以删除空文件夹和文件 ，所以只可以递归删除文件夹下文件
  if (fs.existsSync(path.join(__dirname,'docs'))) {
    delDir(path.join(__dirname,'docs'))
  }

  // 创建目录
  fs.mkdirSync(path.join(__dirname, 'docs'))
  fs.mkdirSync(path.join(__dirname, './docs/.vuepress'))
  console.log('1.如果上面没有报错，文件夹就创建成功 (同步)')

  // 复制 1.quickcheck && 2.note 到 docs目录下（涉及到node文件夹的复制）
  exists('./1.quickcheck','./docs/1.quickcheck',copy) // 文件夹复制
  exists('./2.note','./docs/2.note',copy) // 文件夹复制
  exists('./3.other','./docs/3.other',copy) // 文件夹复制

  console.log('2.文件夹复制成功 (异步)')


  // 0 复制 README.md 到 docs/下面，要不会vuepress会产生404
  fs.writeFile('./docs/README.md', dataReadme,  function(err) {
    if (err) {
      return console.error(err);
    }
    console.log('0. README.md写入成功（异步）')
  })

  // ① ：将 record.md 内容复制到 1.quickcheck 和 2.note下，并且名字都叫做 README.md
  // 异步读取
  fs.readFile('record.md', function (err, data) {
    
    if (err) {
        return console.error(err);
    }
    // console.log("异步读取: " + data.toString());

    // 异步写入
    fs.writeFile('./docs/1.quickcheck/README.md', data,  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("4.quickcheck README.md 数据写入成功！ (异步)");
    });

    fs.writeFile('./docs/2.note/README.md', data,  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("5.note README.md 数据写入成功！ (异步)");
    });

    fs.writeFile('./docs/3.other/README.md', data,  function(err) {
      if (err) {
          return console.error(err);
      }
      console.log("6.other README.md 数据写入成功！ (异步)");
    });

  });


  // ② 遍历 1.quickcheck 和 2.note 文件夹，生成路径导航

  // 读取目录,并根据此生成规则写入 config.js中
  let strOne = ''
  let one = fs.readdirSync('./1.quickcheck')
  one.forEach(item => {
      if (!/.md/.test(item) && item !== '.DS_Store') {

        let files2 = []
        let files2Str = ''
        fs.readdirSync(path.join('./1.quickcheck', item)).forEach( item1 => {
          // Mac系统下的问题
          if (item1 !== '.DS_Store') {
            files2.push(`${path.join(path.join('./1.quickcheck', item), item1)}`)
          }
        })

        files2.forEach( item2 => {
          files2Str += `
          '${item2}',`
        })

        strOne += `
          {
            title: '${item}',
            children: [${files2Str}]
          },
        `
      }
  })

  let strTwo = ''
  let two = fs.readdirSync('./2.note')
  two.forEach(item => {
      if (!/.md/.test(item) && item !== '.DS_Store') {

        let files2 = []
        let files2Str = ''
        fs.readdirSync(path.join('./2.note', item)).forEach( item1 => {
          // Mac系统下的问题
          if (item1 !== '.DS_Store') {
            files2.push(`${path.join(path.join('./2.note', item), item1)}`)
          }
        })

        files2.forEach( item2 => {
          files2Str += `
          '${item2}',`
        })

        strTwo += `
          {
            title: '${item}',
            children: [${files2Str}]
          },
        `
      }
  })

  let strThree = ''
  let three = fs.readdirSync('./3.other')
  three.forEach(item => {
      if (!/.md/.test(item) && item !== '.DS_Store') {

        let files3 = []
        let files3Str = ''
        fs.readdirSync(path.join('./3.other', item)).forEach( item1 => {
          // Mac系统下的问题
          if (item1 !== '.DS_Store') {
            files3.push(`${path.join(path.join('./3.other', item), item1)}`)
          }
        })

        files3.forEach( item3 => {
          files3Str += `
          '${item3}',`
        })

        strThree += `
          {
            title: '${item}',
            children: [${files3Str}]
          },
        `
      }
  })

  // 写入
  let configStr = `
  module.exports = {
    title: 'Notes',
    description: '知识速查（了不起的个人工具库）',
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    themeConfig: {
      repo: 'https://github.com/zhukunpenglinyutong/notes',
      //导航
      nav: [
        { text: '速查', link: '/1.quickcheck/' },
        { text: '前端体系', link: '/2.note/' },
        { text: '其他', link: '/3.other/' }
      ],
      // 侧边栏
      sidebar: {
        '/1.quickcheck': [
          ${strOne}
        ],
        '/2.note': [
          ${strTwo}
        ],
        '/3.other': [
          ${strThree}
        ]
      }
    },
    serviceWorker: true,
  }
  `

  fs.writeFile('./docs/.vuepress/config.js', configStr,  function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("3.configStr 数据写入成功！(异步)");
  })

}

// 复制文件夹的辅助函数
function copy (src, dst) {
  //读取目录
  fs.readdir(src,function(err,paths){
      // console.log(paths)
      if(err){
          throw err;
      }
      paths.forEach(function(path){
          var _src=src+'/'+path;
          var _dst=dst+'/'+path;
          var readable;
          var writable;
          stat(_src,function(err,st){
              if(err){
                  throw err;
              }
              
              if(st.isFile()){
                  readable=fs.createReadStream(_src);//创建读取流
                  writable=fs.createWriteStream(_dst);//创建写入流
                  readable.pipe(writable);
              }else if(st.isDirectory()){
                  exists(_src,_dst,copy);
              }
          });
      });
  });
}
// 复制文件夹（主）
function exists (src, dst, callback) {
  //测试某个路径下文件是否存在
  fs.exists(dst,function(exists){
      if(exists){//不存在
          callback(src,dst);
      }else{//存在
          fs.mkdir(dst,function(){//创建目录
              callback(src,dst)
          })
      }
  })
}

// 删除文件夹
function delDir(path){
  let files = [];
  if(fs.existsSync(path)){
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()){
              delDir(curPath); //递归删除文件夹
          } else {
              fs.unlinkSync(curPath); //删除文件
          }
      });
      fs.rmdirSync(path);
  }
}

init() // 启动