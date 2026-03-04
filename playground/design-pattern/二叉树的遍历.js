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
