/**
 * 题目：面试题 02.08.环路检测
 * 链接：https://leetcode-cn.com/problems/linked-list-cycle-lcci/
 * GitHub：https://github.com/iamzhoufei
 * 
给定一个链表，如果它是有环链表，实现一个算法返回环路的开头节点。若环不存在，请返回 null。
如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

示例 1：
输入：head = [3,2,0,-4], pos = 1
输出：tail connects to node index 1
解释：链表中有一个环，其尾部连接到第二个节点。

示例 2：
输入：head = [1,2], pos = 0
输出：tail connects to node index 0
解释：链表中有一个环，其尾部连接到第一个节点。

示例 3：
输入：head = [1], pos = -1
输出：no cycle
解释：链表中没有环。

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
 * @return {ListNode}
 */

/**
 * 思路：题目要求判断链表中是否存在环。我们可以这样思考，当我们去遍历这个链表的时候，如果存在环，那么必然存在两个节点相同的情况
 * 所以我们可以使用 Set 来保存节点（因为Set是值的集合，且值是唯一的）
 */

var detectCycle = function (head) {
    const set = new Set();
    // 判断当前的节点是不是 null（判断链表是否已经遍历完成）
    while (head !== null) {
        // 先检查 Set 中是否保存过这个节点，是则说明这个节点就是环的入口，返回这个节点即可
        if (set.has(head)) return head;
        // 如果 Set 中没有保存过这个节点，就去保存
        set.add(head)
        // 最后将指针指向下一个节点
        head = head.next;
    }
    // 当所有指针都遍历完，并且Set中都没有相同的值时，说明当前链表不存在环，根据题意，返回null
    return null;
};

var detectCycle = function (head) {
    // 判断边界情况
    if (head === null) return null;

    // 定义快慢两个指针
    let slow = head, fast = head;

    // 当快指针存在时
    while (fast !== null) {
        // 慢指针先走一步
        slow = slow.next;
        // 判断快指针的下一个节点是否存在
        if (fast.next !== null) {
            // 存在 => 表示当前快指针不是最后一个节点，于是走两步（定义快指针的速度是慢指针的两倍）
            fast = fast.next.next;
        } else {
            // 不存在 => 表示当前快指针是最后一个节点，所以此链表中不存在环（有环意味着没有终点null）
            return null;
        }
        /**
         *  当快慢指针相遇的时候
         * （1）表示当前链表存在环 
         * （2）定义：
         *  a = head 到 环入口 的距离；
         *  b = 环入口 到 相遇点的距离；
         *  c = 相遇点 继续向前到 环入口的距离；
         *  n = 为快指针走完的回环圈数【注意是走完的圈数，如果走了1.5圈 = 走完1圈】
         *       
         *  慢指针：a+b
         *  快指针：a + n(b + c) + b
         *  因为 快指针的速度是慢指针的两倍
         *  所以 可得 快指针走过的距离是 慢指针的两倍  2(a+b) = a + n(b + c) + b
         *
         *  化简之后可得 a = c + (n − 1)(b + c)
         *  可以发现 b + c 就是回环的长度，所以当 n = 1时，a = c
         *  所以 从链表头部开始的节点向前 一定会 遇到 从环中走出，回到入环点的慢指针
         *  
         */
        if (fast === slow) {
            // 定义 point 从链表头部开始
            let point = head;
            // 如果二者不相等，说明还没有到达入环点
            while (point !== slow) {
                slow = slow.next;
                point = point.next;
            }
            // 到达入环点，返回当前节点
            return point;
        }
    }


    return null;
}