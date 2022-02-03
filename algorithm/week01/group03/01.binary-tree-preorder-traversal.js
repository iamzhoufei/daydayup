/**
 * 题目：144. 二叉树的前序遍历
 * 链接：https://leetcode-cn.com/problems/binary-tree-preorder-traversal/
 * GitHub：https://github.com/iamzhoufei
 * 
给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

示例 1：
输入：root = [1,null,2,3]
输出：[1,2,3]

示例 2：
输入：root = []
输出：[]

示例 3：
输入：root = [1]
输出：[1]

示例 4：
输入：root = [1,2]
输出：[1,2]

示例 5：
输入：root = [1,null,2]
输出：[1,2]

提示：
树中节点数目在范围 [0, 100] 内
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
 * @param {TreeNode} root
 * @return {number[]}
 */

// 递归法
var preorderTraversal = function (root) {
    const result = [];

    // 定义一个递归函数
    function preOrder(root) {
        // 如果当前节点是空节点，直接返回空数组
        if (!root) return result;

        // 不是空节点，将当前节点的val放入数组
        result.push(root.val);

        // 递归获取当前节点的左节点的值 和 右节点的值
        preOrder(root.left);
        preOrder(root.right);
    }

    // 最开始的调用，传入根节点
    preOrder(root);

    // 返回最终的前序遍历数组
    return result;
};

// 迭代法
var preorderTraversal = function (root) {
    // 根 - 左 - 右
    const result = [];

    function preOrder(root) {
        if (!root) return result;

        result.push(root.val);
        preOrder(root.left);
        preOrder(root.right);
    }

    preOrder(root);

    return result;
};