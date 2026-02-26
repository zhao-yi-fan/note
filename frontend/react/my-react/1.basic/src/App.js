import React from 'react'

export let element = <h2>hello</h2>

/*
 执行时会报错：
 在此文件没有引入 React
 但经过babel
 React.createElement(); 

 编写代码报错：
 在编写代码阶段，因为代码没有用到React变量，引入eslint会报错

 */