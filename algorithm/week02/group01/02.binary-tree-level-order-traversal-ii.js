/**
 * 题目：107. 二叉树的层序遍历 II
 * 链接：https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/
 * GitHub：https://github.com/iamzhoufei
 
给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

示例 1：
输入：root = [3,9,20,null,null,15,7]
输出：[[15,7],[9,20],[3]]

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

// 大致过程与 二叉树的层序遍历I 相同，只是在将level放入result的时候，使用了 unshift 而不是 push
// 通过 unshift 实现将当前节点的下一层级节点放在当前节点的前面

var levelOrderBottom = function (root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length) {
        let length = queue.length;

        const level = [];

        while (length--) {
            const node = queue.shift();
            level.push(node.val);

            if (node.left) { queue.push(node.left) };
            if (node.right) { queue.push(node.right) };
        }

        // 只有这里不同！
        result.unshift(level)
    }

    return result;
};