/**
 * 题目：725. 分隔链表
 * 链接：https://leetcode-cn.com/problems/design-linked-list/
 * GitHub：https://github.com/iamzhoufei
 * 
给你一个头结点为 head 的单链表和一个整数 k ，请你设计一个算法将链表分隔为 k 个连续的部分。
每部分的长度应该尽可能的相等：任意两部分的长度差距不能超过 1 。这可能会导致有些部分为 null 。
这 k 个部分应该按照在链表中出现的顺序排列，并且排在前面的部分的长度应该大于或等于排在后面的长度。
返回一个由上述 k 部分组成的数组。
 
示例 1：
输入：head = [1,2,3], k = 5
输出：[[1],[2],[3],[],[]]
解释：
第一个元素 output[0] 为 output[0].val = 1 ，output[0].next = null 。
最后一个元素 output[4] 为 null ，但它作为 ListNode 的字符串表示是 [] 。

示例 2：
输入：head = [1,2,3,4,5,6,7,8,9,10], k = 3
输出：[[1,2,3,4],[5,6,7],[8,9,10]]
解释：
输入被分成了几个连续的部分，并且每部分的长度相差不超过 1 。前面部分的长度大于等于后面部分的长度。
 
提示：
链表中节点的数目在范围 [0, 1000]
0 <= Node.val <= 1000
1 <= k <= 50
 */


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode[]}
 */
var splitListToParts = function (head, k) {
    /**
        计算数组长度
     */
    let n = 0;
    let temp = head;
    while (temp !== null) {
        n++;
        temp = temp.next;
    }

    // 外层数组的长度是k（因为需要被拆分为k部分）
    const parts = new Array(k).fill(null);

    /**
        计算数组中每个部分的长度
     */

    const quotient = Math.floor(n / k);
    const remainder = n % k;

    /**
        根据数量关系可得 数组中每个部分的长度为：
        前 remainder 个部分中，每个部分包含 quotient + 1 个节点；
        其余部分，每部分包含 quotient 个节点
        所以下面就根据这些条件去填充数组
     */

    let cur = head;

    // 注意有个判断条件 cur !== null，用于判断当前对于链表的遍历是否结束
    for (let i = 0; i < parts.length && cur !== null; i++) {
        parts[i] = cur;
        // 每个部分的长度，由上面 数组中每个部分的长度 可得
        let partSize = quotient + (i < remainder ? 1 : 0);

        // 在遍历链表时，将当前的节点放入当前部分的数组中
        // 如果当前部分的长度达到要求，则退出循环
        for (let j = 1; j < partSize; j++) {
            cur = cur.next;
        }
        // 这里就完成了一个部分数据的填充
        // 接下来需要进行链表节点关系的拆分，并将 cur 指向 cur 的下一个节点
        const next = cur.next;
        cur.next = null;
        cur = next;
    }
    return parts;
};