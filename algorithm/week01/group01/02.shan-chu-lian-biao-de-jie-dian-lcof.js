/**
 * 题目：剑指 Offer 18. 删除链表的节点
 * 链接：https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/
 * 
 * 给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。

返回删除后的链表的头节点。

注意：此题对比原题有改动

示例 1:
输入: head = [4,5,1,9], val = 5
输出: [4,1,9]
解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.

示例 2:
输入: head = [4,5,1,9], val = 1
输出: [4,5,9]
解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.

说明：
题目保证链表中节点的值互不相同
若使用 C 或 C++ 语言，你不需要 free 或 delete 被删除的节点

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
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function (head, val) {
    // 当需要删除头节点时，直接将head的下一个节点作为头节点返回
    if (head.val === val) return head.next;

    // 预先保留一个head
    let prev = head;
    // 当前指向的节点
    let node = prev.next;

    // 如果当前的节点存在
    while (node !== null) {
        // 并且节点的val等于需要删除的val
        if (node.val === val) {
            // 将上一个节点的next指向当前节点的next（跳过当前节点）
            prev.next = node.next;
        }
        // 对于不满足条件的节点继续遍历
        prev = node;
        node = node.next;
    }
    return head;
};