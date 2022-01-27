/**
 * 题目：105. 从前序与中序遍历序列构造二叉树
 * 链接：https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 * GitHub：https://github.com/iamzhoufei
 * 
给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。

示例 1:
输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
输出: [3,9,20,null,null,15,7]

示例 2:
输入: preorder = [-1], inorder = [-1]
输出: [-1]
 
提示:
1 <= preorder.length <= 3000
inorder.length == preorder.length
-3000 <= preorder[i], inorder[i] <= 3000
preorder 和 inorder 均 无重复 元素
inorder 均出现在 preorder
preorder 保证 为二叉树的前序遍历序列
inorder 保证 为二叉树的中序遍历序列

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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    // preorder 根 左 右
    // inorder 左 根 右

    // 保存中序遍历数组中每个节点的 值 和 索引
    // 主要是为了在中序遍历数组中找到根节点的索引（mid）
    const map = new Map();

    for (let i = 0; i < inorder.length; i++) {
        map.set(inorder[i], i);
    }

    function build(pStart, pEnd, iStart, iEnd) {
        // 这些参数分别代表 当前树的节点 在前序遍历数组 和 中序遍历数组中的索引位置

        // 如果前序遍历的开始索引大于结束索引，表示前序遍历数组已经使用完成
        if (pStart > pEnd) return null;

        // 根据前序遍历的规则可知，第一个元素就是根节点
        const root = preorder[pStart];

        const rootNode = new TreeNode(root);

        // 找到根节点的索引
        const mid = map.get(root);

        // 通过中序遍历数组，计算出左子树的节点长度
        const leftLength = mid - iStart;

        rootNode.left = build(pStart + 1, pStart + leftLength, iStart, mid - 1);
        rootNode.right = build(pStart + leftLength + 1, pEnd, mid + 1, iEnd);

        return rootNode;
    }

    return build(0, preorder.length - 1, 0, inorder.length - 1);
};