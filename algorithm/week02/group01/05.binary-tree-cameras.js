/**
 * 题目：968. 监控二叉树
 * 链接：https://leetcode-cn.com/problems/binary-tree-cameras/
 * GitHub：https://github.com/iamzhoufei
 
给定一个二叉树，我们在树的节点上安装摄像头。
节点上的每个摄影头都可以监视其父对象、自身及其直接子对象。计算监控树的所有节点所需的最小摄像头数量。

示例 1：
输入：[0,0,null,0,0]
输出：1
解释：如图所示，一台摄像头足以监控所有节点。

示例 2：
输入：[0,0,null,0,null,0,null,null,0]
输出：2
解释：需要至少两个摄像头来监视树的所有节点。 上图显示了摄像头放置的有效位置之一。

提示：
给定树的节点数的范围是 [1, 1000]。
每个节点的值都是 0。

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
 * @return {number}
 */
var minCameraCover = function (root) {
    if (!root) return 0;

    // 定义节点的三种状态
    const NONE = 0;
    const CAMERA = 1;
    const COVERED = 2;

    // 需要摄像头的个数
    let count = 0;

    function traversal(node) {
        // 空节点 -> 一定是【被覆盖】
        if (node === null) return COVERED;

        /**
            当前节点不是空节点（存在子节点）
            获取当前节点的左右子节点的状态

            再根据左右子节点的状态去倒推当前节点的状态
        */

        const left = traversal(node.left);
        const right = traversal(node.right);

        // 如果左右子节点都是【被覆盖】，当前节点不需要【摄像头】
        if (left === COVERED && right === COVERED) return NONE;

        // 如果左右子节点有一个是【未覆盖】，那么当前节点必须是【摄像头】，才可以使它的子节点是【被覆盖】
        if (left === NONE || right === NONE) { count += 1; return CAMERA; };

        // 左右子节点只要存在一个【摄像头】，说明当前节点一定是【被覆盖】
        if (left === CAMERA || right === CAMERA) return COVERED;
    }

    if (traversal(root) === NONE) {
        count += 1;
    }

    return count;
};

