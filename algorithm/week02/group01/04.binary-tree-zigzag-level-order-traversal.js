/**
 * 题目：103. 二叉树的锯齿形层序遍历
 * 链接：https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal/
 * GitHub：https://github.com/iamzhoufei
 
给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

示例 1：
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[20,9],[15,7]]

示例 2：
输入：root = [1]
输出：[[1]]

示例 3：
输入：root = []
输出：[]
 
提示：
树中节点数目在范围 [0, 2000] 内
-100 <= Node.val <= 100

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

var zigzagLevelOrder = function (root) {
    if (!root) return [];

    // 整体解法与 二叉树的层序遍历相同，只需要额外定义一个变量来记录当前遍历的层级
    let isOdd = false;

    const result = [];

    const queue = [root];

    while (queue.length) {
        let length = queue.length;
        const level = [];

        // 到新的一层后，更改奇偶数行的标识
        isOdd = !isOdd;

        while (length--) {
            const node = queue.shift();

            /**
             * 关键在这
             * 如果是奇数行，当前层级的值加在 level 末尾
             * 如果是偶数行，当前层级的值加在 level 开头
             */
            isOdd ? level.push(node.val) : level.unshift(node.val);

            if (node.left) { queue.push(node.left) };
            if (node.right) { queue.push(node.right) };
        }
        result.push(level)
    }

    return result;
};