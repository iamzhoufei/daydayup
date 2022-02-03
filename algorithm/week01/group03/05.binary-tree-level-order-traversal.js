/**
 * 题目：102. 二叉树的层序遍历
 * 链接：https://leetcode-cn.com/problems/binary-tree-level-order-traversal/
 * GitHub：https://github.com/iamzhoufei
 * 

给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。

示例 1：
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]

示例 2：
输入：root = [1]
输出：[[1]]

示例 3：
输入：root = []
输出：[]

提示：
树中节点数目在范围 [0, 2000] 内
-1000 <= Node.val <= 1000

*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (!root) return [];
    // 最开始定义一个队列，初始值是根节点
    const queue = [root];

    // 定义最终返回的数组
    const result = [];

    // 如果队列中有值，表示还有还有一个层级的节点没有被遍历
    while (queue.length) {
        // 获取当前队列的长度，在清空当前层级的队列时需要用到
        let length = queue.length;

        // 存储当前层级的节点数组
        const level = [];

        // 逐个遍历当前层级的节点
        while (length--) {
            // 队列中的第一个节点出队列，并修改队列的长度
            const node = queue.shift();

            // 将当前出队列的节点值保存到level中（属于同一层级）
            level.push(node.val);

            // 如果当前出队列的节点存在子节点，就把它们放入队列，作为下一层级的节点
            if (node.left) { queue.push(node.left) };
            if (node.right) { queue.push(node.right) };
        }

        // 将当前层级放入result
        result.push(level)
    }

    return result;
};