/**
 * 题目：剑指 Offer 54. 二叉搜索树的第k大节点
 * 链接：https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/
 * GitHub：https://github.com/iamzhoufei
 * 
给定一棵二叉搜索树，请找出其中第 k 大的节点的值。

示例 1:
输入: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
输出: 4

示例 2:
输入: root = [5,3,6,2,4,null,null,1], k = 3
       5
      / \
     3   6
    / \
   2   4
  /
 1
输出: 4

限制：
1 ≤ k ≤ 二叉搜索树元素个数
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargest = function (root, k) {
    // 利用搜索二叉树的特性：比当前节点值小的节点都在当前节点的左子树，大的节点都在当前节点的右子树
    // 同时 根据中序遍历的特性 左 - 根 - 右，最后获得的中序遍历数组的顺序就是 从小到大排列的
    const result = [];

    function inOrder(root) {
        if (!root) return result;

        inOrder(root.left);
        result.push(root.val);
        inOrder(root.right);
    }

    inOrder(root);

    // 上面是中序遍历的递归代码
    // 在一个从小到大排列的数组中拿到 第k大 的值，从数组末尾开始 第k个元素 就是需要的值
    return result[result.length - k]
};