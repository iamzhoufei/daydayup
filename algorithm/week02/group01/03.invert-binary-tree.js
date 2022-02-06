/**
 * 题目：226. 翻转二叉树
 * 链接：https://leetcode-cn.com/problems/invert-binary-tree/
 * GitHub：https://github.com/iamzhoufei
 
给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。

示例 1：
输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]

示例 2：
输入：root = [2,1,3]
输出：[2,3,1]

示例 3：
输入：root = []
输出：[]
 
提示：
树中节点数目范围在 [0, 100] 内
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
 * @return {TreeNode}
 */

// 递归法（先局部，再整体）
var invertTree = function (root) {
    if (root === null) return root;

    // 将当前节点的左子树和右子树递归翻转
    const left = invertTree(root.left);
    const right = invertTree(root.right);

    // 最后交换当前节点的左右两棵子树
    root.left = right;
    root.right = left;

    return root;
};

// BFS（层序遍历法）（先整体，再局部）
var invertTree = function (root) {
    if (root === null) return root;

    // 层序遍历需要手动维护一个队列
    const queue = [root];

    // 队列中还有节点 -> 表示这棵树还没有遍历完
    while (queue.length) {
        // 拿到队列中的第一个节点（同时队列长度 - 1）
        const node = queue.shift();

        // 将这个节点的左右子树交换
        [node.left, node.right] = [node.right, node.left];

        // 交换之后，判断左右两个子节点是否不为空，不为空就放入队列中，等下一轮遍历时继续交换
        if (node.left) { queue.push(node.left) };
        if (node.right) { queue.push(node.right) };
    }

    // 最终返回树的根节点（根节点不会改变）
    return root;
};
