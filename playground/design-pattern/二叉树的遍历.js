/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *   this.val = (val===undefined ? 0 : val)
 *   this.left = (left===undefined ? null : left)
 *   this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const result = [];
  if (!root) return result; // 特判空树

  const queue = [root]; // 队列，初始只放根节点

  while (queue.length > 0) {
    const levelSize = queue.length; // 当前层节点数
    const level = []; // 当前层的结果

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // 出队一个节点
      level.push(node.val); // 记录它的值

      // 把下一层的子节点入队
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
};

function tree2array(root) {
  const result = [];
  const queue = [root];
  let sizeLength = 0;
  // 遍历树
  while (queue.length) {
    const currNode = queue.shift();
    console.log("currNode", currNode);

    result.push(currNode.val);
    // 如果有左节点追加
    if (currNode.left) queue.push(currNode.left);

    // 如果有右节点追加
    if (currNode.right) queue.push(currNode.right);
  }

  return result;
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

const node1 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, new TreeNode(6), new TreeNode(7)),
);

console.log(tree2array(node1));
