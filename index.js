/*
 * @Author: 李大钊
 * @Date: 2022-04-15 10:39:25
 * @LastEditors: 李大钊
 * @LastEditTime: 2022-04-22 16:23:00
 * @FilePath: \swagger\index.js
 */
//引入依赖
var fs = require("fs");
var path = require("path");
var colors = require("colors");
var axios = require("axios");
var inquirer = require("inquirer");
const wdURl = "http://192.168.188.3:4523/export/openapi/2";

//获取swagger.json数据
async function getData(url) {
  return await axios({ url: url, method: "get" });
}
run();

//选取需要生成的Tag对象
async function getTags(tags) {
  //选择要生成的Tag对象
  const question = {
    type: "checkbox",
    name: "tags",
    message: `请选择要生成的tag对象`.yellow,
    choices: tags,
  };
  let answers = await inquirer.prompt(question);
  return answers.tags;
}

function tagPaths(paths, tag) {
  let tagPaths = [];
  Object.keys(paths).forEach((e) => {
    Object.keys(paths[e]).forEach((j) => {
      if (paths[e][j] && paths[e][j].tags[0] == tag) {
        paths[e][j].url = e.replace(/{/, "${"); //请求url
        tagPaths.push(paths[e]);
      }
    });
  });
  return tagPaths;
}

function tagTemp(urls, basePath) {
  let template = `
  import request from '@/utils/request' 
  const basePath='${basePath}'`;
  urls.forEach((e) => {
    Object.keys(e).forEach((j) => {
      var obj = e[j];
      var body = j == "get" ? "params" : "data";
      var path = [];
      obj.parameters.forEach((e) => {
        if (e.in == "path") {
          path.push(e.name);
        }
      });
      if (path.length) {
        var url = obj.url.replace(/[${}]/g, "");
        var name = url.substring(url.lastIndexOf("/") + 1);
        var query =
          j == "get" ? `${path.toString()},params` : `${path.toString()},data`;
      } else {
        var name = obj.url.substring(obj.url.lastIndexOf("/") + 1);
        var query = j == "get" ? "params" : "data";
      }
      template += `
  // ${obj.summary} 
  export function ${name}(${query}) {  
    return request({    
      url:\`${obj.url}\`,    
      method:'${j}',    
      ${body}  
    })
  }`;
    });
  });
  return template;
}

//创建目标目录
function mkdirsSync(dirpath, mode) {
  try {
    if (!fs.existsSync(dirpath)) {
      let pathtmp;
      dirpath.split(/[/\\]/).forEach(function (dirname) {
        //这里指用/ 或\ 都可以分隔目录  如  linux的/usr/local/services   和windows的 d:\temp\aaaa
        if (pathtmp) {
          pathtmp = path.join(pathtmp, dirname);
        } else {
          pathtmp = dirname;
        }
        if (!fs.existsSync(pathtmp)) {
          if (!fs.mkdirSync(pathtmp, mode)) {
            return false;
          }
        }
      });
    }
    return true;
  } catch (e) {
    log.error("create director fail! path=" + dirpath + " errorMsg:" + e);
    return false;
  }
}

//把单个tag tpl模板生成文件
async function tagFiles(apiPath, tpl, fileName, choices) {
  var fPath = process.cwd() + "\\" + apiPath; //生成目录
  if (!fs.existsSync(fPath)) {
    mkdirsSync(fPath);
    console.log(`创建api目录成功：${fPath}`.green);
  }
  // 要生成的文件完整路径
  fPath += "\\" + fileName + ".js";
  const ex = fs.existsSync(fPath);
  if (ex) {
    choices.push({ name: fPath, value: { tpl: tpl, path: fPath } });
  } else {
    fs.writeFileSync(fPath, tpl);
    console.log(`代码生成成功^_^`.red, `${fPath}`.green);
  }
}

//多个文件
async function repeatConfirm(choices) {
  if (choices.length > 0) {
    const question = {
      type: "checkbox",
      name: "cover",
      message: `以下文件已存在，请勾选要覆盖的文件`.yellow,
      choices: choices,
    };
    inquirer.prompt(question).then((answers) => {
      answers.cover.forEach((e) => {
        fs.writeFileSync(e.path, e.tpl);
        console.log("代码生成成功^_^".red, `${e.path}`.green, "已覆盖".blue);
      });
    });
  }
}

//启动函数
async function run() {
  console.log(`读取json数据......`.yellow);
  // const url = "https://petstore.swagger.io/v2/swagger.json"; //请求json地址
  const url = wdURl; //请求json地址
  const apiPath = "src\\api\\"; //存放api文件地址
  const choices = []; //存储所有重复性文件
  const res = await getData(url);
  const { definitions, paths, tags, basePath } = res.data;
  console.log(`获取tag分类数据成功......`.yellow);
  console.log(tags); //选择要生成的Tag对象
  const answers = await getTags(tags);
  console.log(answers);
  answers.forEach((e) => {
    const urls = tagPaths(paths, e);
    const tpl = tagTemp(urls, basePath);
    tagFiles(apiPath, tpl, e, choices);
  });
  repeatConfirm(choices);
}
