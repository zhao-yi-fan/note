/**
 * 1.当前模块 type: module模块
 */
// 导入 pkg1(type: commonjs)的 cjs模块
// import * as pkg1 from 'pkg1';
// console.log('pkg1:', pkg1); // [Module: null prototype] { default: { aa: 'common' } }
// console.log('pkg1:', pkg1.default); // { aa: 'common' }

// import pkg1 from 'pkg1';
// console.log('pkg1:', pkg1); // { aa: 'common' }


// 导入 pkg1(type: commonjs)的 esm模块 
// import * as pkg1 from 'pkg1';
// console.log('pkg1:', pkg1); // Unexpected token 'export'


// 导入 pkg1(type: module)的 esm模块
// import * as pkg1 from 'pkg1';
// console.log('pkg1:', pkg1); // [Module: null prototype] { default: { aa: 'esm' } }
// console.log('pkg1:', pkg1.default); // { aa: 'esm' }

// import pkg1 from 'pkg1';
// console.log('pkg1:', pkg1); //{ aa: 'esm' }


// 导入 pkg1(type: module)的 cjs模块
// import * as pkg1 from 'pkg1';
// console.log('pkg1:', pkg1); // ReferenceError: module is not defined


// 使用require语法
// const pkg1 = require('pkg1');
// console.log('pkg1:', pkg1); // require is not defined

/**
 * 2.当前模块 type: commonjs模块
 */
// 导入 pkg1(type: module)的 cjs模块
// const pkg1 = require('pkg1');
// console.log('pkg1:', pkg1); // require() of ES modules is not supported.


// 导入 pkg1(type: module)的 esm模块
// const pkg1 = require('pkg1');
// console.log('pkg1:', pkg1); // Error [ERR_REQUIRE_ESM]: Must use import to load ES Module


// 导入 pkg1(type: common)的 cjs模块
// const pkg1 = require('pkg1');
// console.log('pkg1:', pkg1); // { aa: 'common' }


// 导入 pkg1(type: common)的 esm模块
// const pkg1 = require('pkg1');
// console.log('pkg1:', pkg1); // SyntaxError: Unexpected token 'export'


// 使用import语法
// import pkg1 from 'pkg1';
// console.log('pkg1:', pkg1); // SyntaxError: Cannot use import statement outside a module