const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const babylon = require('babylon')
const parser = require('@babel/parser')
const t = require('@babel/types')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const ejs = require('ejs')
const { SyncHook } = require('tapable')
// const { runLoaders } = require('loader-runner')
const { runLoaders } = require('./loader-runner')

// babylon: 将源码转换成ast
// @babel/generator
// @babel/traverse
// @babel/types
class Compiler {
  constructor(config) {
    this.config = config;
    this.entryId; // './src/index.js'
    // 需要保存所有的模块依赖
    this.modules = {};
    this.entryId = config.entry;
    // 工作路径
    this.root = process.cwd();
    this.hooks = {
      entryOption: new SyncHook(),
      compile: new SyncHook(),
      afterCompile: new SyncHook(),
      afterPlugin: new SyncHook(),
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook(),
    }
    let plugins = this.config.plugins
    if (Array.isArray(plugins)) {
      plugins.forEach(plugin => {
        plugin.apply(this)
      })
    }
  }
  getSource (modulePath) {
    let parts = modulePath.replace(/^-?!+/g, '').split('!');
    modulePath = parts.pop();
    // loader转化为绝对路径
    let resolveLoader = loader => path.resolve(this.root, 'loaders', loader)
    let inlineLoaders = parts;
    let preLoaders = [], normalLoaders = [], postLoaders = [];
    const rules = this.config.module.rules;
    let loaders = []; // 最终生效的loader
    rules.forEach(rule => {
      const { test, use } = rule;
      if (test.test(modulePath)) {
        if (rule.enforce === 'pre') {
          preLoaders.push(...use)
        } else if (rule.enforce === 'post') {
          postLoaders.push(...use)
        } else {
          normalLoaders.push(...use)
        }
        if (modulePath.startsWith('!!')) {
          loaders = [...inlineLoaders]
        } else if (modulePath.startsWith('!')) {
          loaders = [...postLoaders, ...inlineLoaders, ...preLoaders]
        } else if (modulePath.startsWith('-!')) {
          loaders = [...postLoaders, ...inlineLoaders]
        } else {
          loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders]
        }
      }
    })
    loaders = loaders.map(resolveLoader)

    return new Promise((resolve, reject) => {
      runLoaders({
        resource: modulePath,
        loaders,
        context: { name: '123' },
        readResource: fs.readFile.bind(fs) // 读取硬盘文件的方法
      }, (err, res) => {
        console.log(err)
        console.log(res, 'res===');
        if (err) {
          reject(reject)
        }
        resolve(res.result[0])
      })
    })
  }
  async buildModule (modulePath, isEntry) {
    let source = await this.getSource(modulePath);
    console.log(source, 'source===');
    // 模块id modulePath = modulePath - this.root = src/index.js
    const moduleName = "./" + path.relative(this.root, modulePath)
    // 是否是入口文件
    if (isEntry) {
      this.entryId = moduleName
    }
    // 文件名字解析文件内容 
    const { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName));
    for (let index = 0; index < dependencies.length; index++) {
      const dep = dependencies[index];
      // await this.buildModule(path.join(this.root, dep), false)
      await this.buildModule(dep, false)
    }

    this.modules[moduleName] = sourceCode;
  }
  emitFile () {
    const main = path.join(this.config.output.path, this.config.output.filename);
    const templateStr = fs.readFileSync(path.join(__dirname, 'main.ejs'), 'utf8');
    const code = ejs.render(templateStr, { entryId: this.entryId, modules: this.modules });
    fs.writeFileSync(main, code)

  }
  parse (source, parentPath) { // 解析源码 AST解析语法树
    const ast = parser.parse(source)
    const dependencies = []
    traverse(ast, {
      CallExpression (p) {
        let node = p.node; // 对应的节点
        // console.log(node.callee.name, 'node==');
        if (node.callee.name === 'require') {
          node.callee.name = '__webpack_require__';
          let moduleName = node.arguments[0].value; // 取到的就是模块的引用名字
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js');
          if (moduleName.includes('!')) {
            let parts = moduleName.replace(/^-?!+/g, '').split('!')
            let filename = parts.pop();
            moduleName = [...parts, './' + path.join(parentPath, filename)].join('!')
          } else {
            moduleName = './' + path.join(parentPath, moduleName);
          }
          dependencies.push(moduleName);
          node.arguments = [t.stringLiteral(moduleName)]; // 反向
        }
      }
    })
    const sourceCode = generator(ast).code;
    return {
      sourceCode,
      dependencies
    }
  }

  async run () {
    this.hooks.run.call();
    this.hooks.compile.call();
    // 执行 并且创建模块的依赖关系
    await this.buildModule(this.entryId, true)
    this.hooks.afterCompile.call();

    // 发射文件
    this.emitFile();
    this.hooks.emit.call();
    this.hooks.done.call();
  }
}

module.exports = Compiler;