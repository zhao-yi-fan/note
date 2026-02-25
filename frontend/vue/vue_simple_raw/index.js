import { nodeOps } from './runtime-dom'
export function render (vnode, container) {
  patch(null, vnode, container);
}

/**
 * 
 * @param {*} n1 老的虚拟节点
 * @param {*} n2 新的虚拟节点
 * @param {*} container 容器
 */


function patch (n1, n2, container) {
  if (typeof n2.tag == 'string') {
    mountElement(n2, container);
  } else {

  }

}

function mountElement (vnode, container) {
  const { tag, children, props } = vnode;
  let el = (vnode.el = nodeOps.createElement(tag));
  if (Array.isArray(children)) {
    mountChildren(children, el);
  } else {
    nodeOps.hostSetElementText(el, children);
  }
  nodeOps.insert(el, container)
}

function mountChildren (children, container) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    patch(null, child, container);
  }
}