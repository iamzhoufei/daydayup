/**
 * 题目：剑指 Offer 26. 树的子结构
 * 链接：https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/
 * GitHub：https://github.com/iamzhoufei
 * 
输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)
B是A的子结构， 即 A中有出现和B相同的结构和节点值。

例如:
给定的树 A:

     3
    / \
   4   5
  / \
 1   2
给定的树 B：

   4 
  /
 1
返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。

示例 1：
输入：A = [1,2,3], B = [3,1]
输出：false

示例 2：
输入：A = [3,4,5,1,2], B = [4,1]
输出：true

限制：
0 <= 节点个数 <= 10000

 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function (A, B) {
    // 约定空树不是任意一个树的子结构
    if (!A || !B) return false;

    /**
        1、A树以A节点为根节点的子树包含B树
        2、树B是树A中左子树的子结构
        3、树B是树A中右子树的子结构
    */

    return isSameTree(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
};

function isSameTree(a, b) {
    // b 节点为空时，表示B树已经遍历完成时，没有出现与 A树节点不相同 或者 A树节点为空的情况，所以直接返回true
    if (!b) {
        return true;
    }

    // a 节点为空时，（此时b节点不为空），说明 A树的长度 小于 B树的长度，所以A树肯定不包含B树，所以返回 false
    if (!a) {
        return false;
    }

    // a 节点有值 且 b 节点有值，但是两个节点的值不相同时，返回 false
    if (a.val !== b.val) {
        return false;
    }

    // 分别递归比较 两棵树当前节点的左子节点是否相同 && 右子节点是否相同
    return isSameTree(a.left, b.left) && isSameTree(a.right, b.right);
}