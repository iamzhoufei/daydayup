/**
 * 题目：110. 平衡二叉树
 * 链接：https://leetcode-cn.com/problems/balanced-binary-tree/
 * GitHub：https://github.com/iamzhoufei
*/

/*

给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：
一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。

示例 1：
输入：root = [3,9,20,null,null,15,7]
输出：true

示例 2：

输入：root = [1,2,2,3,3,null,null,4,4]
输出：false

示例 3：
输入：root = []
输出：true

提示：
树中的节点数在范围 [0, 5000] 内
-104 <= Node.val <= 104

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
 *  从下到上的递归
 */
var isBalanced = function (root) {
    // 根据题目示例，空节点是平衡二叉树
    if (!root) return true;

    // 定义递归函数，判断【以当前节点为根节点的树】是否是平衡二叉树
    // 如果这棵树是平衡二叉树，递归函数会返回这棵树的最大高度，否则返回-1
    function recursion(root) {
        // 如果是空节点，不记录节点高度
        if (!root) return 0;

        // 递归获取当前节点左右子树的高度
        const leftHeight = recursion(root.left);
        const rightHeight = recursion(root.right);

        /**
         *  左子树不是平衡二叉树
         *  右子树不是平衡二叉树
         *  当前节点的左右子树分别都是平衡二叉树，但是它们的高度差 > 1
        */
        if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
            // 出现以上三种情况时，递归函数返回 -1， 标识【以当前节点为根节点的树】不是平衡二叉树
            return -1;
        } else {
            /**
             * 这棵树是平衡二叉树
             * 递归函数返回【以当前节点为根节点的树】的最大高度（左右子树的最大高度 + 当前节点）
             */
            return Math.max(leftHeight, rightHeight) + 1;
        }
    }

    /**
     * 最终判断根节点是否有高度，
     * 大于等于0 -> 平衡二叉树；
     * 等于-1 -> 非平衡二叉树
     */
    return recursion(root) >= 0;
};

/**
 *  从上到下的递归
 */
var isBalanced = function (root) {
    if (!root) return true;

    /**
        平衡二叉树的高度 = Math.max(recursion(root.left), recursion(root.right)) + 1
    */

    /**
        递归函数用于获取当前节点的最大高度
    */
    function recursion(root) {
        if (!root) return 0;
        return Math.max(recursion(root.left), recursion(root.right)) + 1;
    }

    /**
        判断是否是平衡二叉树的条件

        当前节点的子树是否是平衡二叉树
        当前节点的左子树是否是平衡二叉树
        当前节点的右子树是否是平衡二叉树

        从上到下的递归，每个节点都会被遍历到，并且有些节点会被遍历多次
    */
    return Math.abs(recursion(root.left) - recursion(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right);
};