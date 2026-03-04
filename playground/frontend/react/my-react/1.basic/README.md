还是使用老的React.createElement
cross-env DISABLE_NEW_JSX_TRANSFORM=true
cross-env 用来设置环境变量的 跨平台（mac window linux 设置环境变量命令不一样）

mac: export DISABLE_NEW_JSX_TRANSFORM=true 
windows: set DISABLE_NEW_JSX_TRANSFORM=true 


React17以前
<h1></h1>   
React.createElement('h1',{
  id: 'title',
  key: 'title',
  ref: 'title',
}, 'hello')

React17
import {jsx as _jsx} from 'react/jsx-runtime'
let element = _jsx('h1', {
  id: 'title',
  key: 'title',
  children: 'hello'
}, 'title')