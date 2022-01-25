/**
 * 题目：面试题 02.04. 分割链表
 * 链接：https://leetcode-cn.com/problems/partition-list-lcci/
 * GitHub：https://github.com/iamzhoufei
 * 
给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。
你不需要 保留 每个分区中各节点的初始相对位置。

示例 1：
输入：head = [1,4,3,2,5,2], x = 3
输出：[1,2,2,4,3,5]

示例 2：
输入：head = [2,1], x = 2
输出：[1,2]
 

提示：

链表中节点的数目在范围 [0, 200] 内
-100 <= Node.val <= 100
-200 <= x <= 200

 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
    // 首先分别定义两个哨兵节点
    const smallHead = new ListNode(0);
    const largeHead = new ListNode(0);

    // 再分别定义两个指针，初始指向大、小两个链表的哨兵节点
    let small = smallHead;
    let large = largeHead;

    // 开始遍历链表，设定遍历条件
    while (head !== null) {
        // 当遍历节点的值 小于 特定值时
        if (head.val < x) {
            // 将small.next指向当前节点，此时 small 链表中开始插入值
            small.next = head;
            // 插入数据完成后，需要将 small 指针更新为 新插入的值（这样才可以一直向后插入值）
            small = small.next;
        } else {
            // 同上
            large.next = head;
            large = large.next;
        }
        // 遍历的自增
        head = head.next;
    }

    // 跳出循环说明遍历结束
    // 由于题目中指明 所有 小于 x 的节点都出现在 大于或等于 x 的节点之前
    // 所以我们最后拼接链表时，large 链表会在末尾
    // 但是由于可能原链表的最后一个值比 特定值 小，所以 large.next 可能不是 null，这样就可能导致出现环路
    // 所以需要手动将 large.next 设置为 null
    large.next = null;

    // 将 small.next 指向 largeHead.next（largeHead一直没有改变，指向 large 的第一个哨兵节点）
    small.next = largeHead.next;

    // 最终返回的是 smallHead.next，因为它也一直没有改变，next指向的是 small 的第一个节点
    return smallHead.next;
};