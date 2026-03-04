import { REACT_TEXT, REACT_FORWARD_REF } from "./constants";
import { addEvent } from './event'
/**
 * 把虚拟DOM变成真实DOM插入到容器内部
 * @param {*} vdom 虚拟DOM
 * @param {*} container 容器
 */
function render (vdom, container) {
  mount(vdom, container)
}

function mount (vdom, parentDOM) {
  let newDOM = createDOM(vdom)
  if (newDOM) {
    parentDOM.appendChild(newDOM)

  }
  return newDOM;
}

/**
 * 把虚拟DOM转成真实DOM
 */
export function createDOM (vdom) {
  if (!vdom) return null;
  let { type, props, ref } = vdom;
  let dom; // 真实DOM
  if (ref && type.$$typeof === REACT_FORWARD_REF) {
    return mountForwardComponent(vdom);
  } else if (type === REACT_TEXT) { // 如果这个元素是一个文本的话
    dom = document.createTextNode(props.content)
  } else if (typeof type === 'function') {
    if (type.isReactComponent) { // 说明它是一个类组件
      return mountClassComponent(vdom);
    }
    return mountFunctionComponent(vdom);

  } else {
    dom = document.createElement(type); // div span p
  }
  // 处理属性
  if (props) {
    updateProps(dom, {}, props); // 更新属性
    if (props.children) {
      let children = props.children;
      if (typeof children === 'object' && children.type) { // 说明这是一个React元素
        mount(children, dom)
      } else if (Array.isArray(children)) {
        reconcileChildren(props.children, dom)

      }
    }
  }
  vdom.dom = dom; // 让虚拟DOM的dom属性指向这个DOM对应的真实DOM
  if (ref) ref.current = dom; // 把真实DOM赋值给ref.current
  return dom;
}

function mountForwardComponent (vdom) {
  let { type, props, ref } = vdom;
  let renderVdom = type.render(props, ref)
  vdom.oldRenderVdom = renderVdom;
  return createDOM(renderVdom);
}


function mountClassComponent (vdom) {
  let { type: ClassComponent, props, ref } = vdom;
  let classInstance = new ClassComponent(props);
  if (ref) ref.current = classInstance;
  let renderVdom = classInstance.render(props);
  classInstance.oldRenderVdom = vdom.oldRenderVdom = renderVdom;
  return createDOM(renderVdom);
}

function mountFunctionComponent (vdom) {
  let { type, props } = vdom;
  let renderVdom = type(props);
  vdom.oldRenderVdom = renderVdom; // 现在没用到 后面进行组件更新使用
  return createDOM(renderVdom);
}

function reconcileChildren (childrenVdom, parentDOM) {
  childrenVdom.forEach(childVdom => mount(childVdom, parentDOM));
}

/**
 * 把新的属性更新到真实DOM上
 * @param {*} dom 真实DOM
 * @param {*} oldProps 旧的属性对象
 * @param {*} newProps 新的属性对象
 */
function updateProps (dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === 'children') {
      continue; // 此处忽略子节点的处理
    } else if (key === 'style') { // style
      let styleObj = newProps[key];
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (key.startsWith('on')) {
      // dom[key.toLocaleLowerCase()] = newProps[key];
      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
    } else {
      dom[key] = newProps[key]; // className
    }

  }
}

export function findDOM (vdom) {
  if (!vdom) return null;
  if (vdom.dom) { // dom={type: 'h1'}
    return vdom.dom;
  } else {
    // 类组件 还是函数组件，他们虚拟DOM身上没有dom属性，
    return findDOM(vdom.oldRenderVdom);
  }
}

/**
 * dom-diff核心是比较 新旧DOM的差异，然后把差异同步到真实DOM上
 * @param {*} parentDOM 
 * @param {*} oldVdom 
 * @param {*} newVdom 
 */
export function compareTwoVdom (parentDOM, oldVdom, newVdom) {
  let oldDOM = findDOM(oldVdom);
  // 根据新的虚拟DOM得到新的真实DOM
  let newDOM = createDOM(newVdom);
  // 把老的真实DOM替换成
  parentDOM.replaceChild(newDOM, oldDOM);
}

const ReactDOM = {
  render
}

export default ReactDOM









