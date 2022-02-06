/**
 * 题目：589. N 叉树的前序遍历
 * 链接：https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/
 * GitHub：https://github.com/iamzhoufei
 
给定一个 n 叉树的根节点  root ，返回 其节点值的 前序遍历 。
n 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 null 分隔（请参见示例）。

示例 1：
输入：root = [1,null,3,2,4,null,5,6]
输出：[1,3,5,6,2,4]

示例 2：
输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
输出：[1,2,3,6,7,11,14,4,8,12,5,9,13,10]
 
提示：
节点总数在范围 [0, 104]内
0 <= Node.val <= 104
n 叉树的高度小于或等于 1000

*/

/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */

// 递归法
var preorder = function (root) {
    // 题目要求返回数组，所以当根节点为空时，返回空数组
    if (!root) return [];

    // 定义最终返回的数组
    const result = [];

    // 定义递归函数
    function dfs(root) {
        // 当传入的节点不为空时才会执行
        if (root !== null) {
            // 将当前节点的值放入结果数组
            result.push(root.val);
            // 然后去遍历当前节点的所有子节点，并在遍历时递归调用本函数
            root.children.forEach(child => dfs(child))
        }
    }

    // 第一次调用递归，传入根节点
    dfs(root);

    // 返回最终结果
    return result;
};

// 迭代法
var preorder = function (root) {

};