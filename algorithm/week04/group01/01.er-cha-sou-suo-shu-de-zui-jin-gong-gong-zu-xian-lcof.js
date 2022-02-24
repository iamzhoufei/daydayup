/**
 * 题目：剑指 Offer 68 - I. 二叉搜索树的最近公共祖先
 * 链接：https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-lcof/
 * GitHub：https://github.com/iamzhoufei
*/

/**
给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”
例如，给定如下二叉搜索树:  root = [6,2,8,0,4,7,9,null,null,3,5]

示例 1:
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
输出: 6 
解释: 节点 2 和节点 8 的最近公共祖先是 6。

示例 2:
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
输出: 2
解释: 节点 2 和节点 4 的最近公共祖先是 2, 因为根据定义最近公共祖先节点可以为节点本身。
 

说明:
所有节点的值都是唯一的。
p、q 为不同节点且均存在于给定的二叉搜索树中。

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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    // 处理异常情况
    if (!root) return null; 

    // 在遍历的过程中，如果根节点不为空
    while (root) {
        // 判断 p, q 是否都大于当前节点，是 => 根据搜索二叉树的定义，p, q 两个节点位于当前节点的右子树中
        if (p.val > root.val && q.val > root.val) {
            root = root.right;

        // 判断 p, q 是否都小于当前节点，是 => 根据搜索二叉树的定义，p, q 两个节点位于当前节点的左子树中
        } else if (p.val < root.val && q.val < root.val) {
            root = root.left;
        
        // 如果 p, q 对于当前节点值的大小判断不统一，说明出现分歧，那么当前节点就是它们出现分歧的节点（公共祖先）
            // 当 p 或 q 任一出现等于当前节点的情况时，根据题意，当前节点就是公共祖先节点
        } else {
            return root;
        }
    }

};