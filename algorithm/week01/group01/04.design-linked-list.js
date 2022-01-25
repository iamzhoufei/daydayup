/**
 * 题目：707. 设计链表
 * 链接：https://leetcode-cn.com/problems/design-linked-list/
 * GitHub：https://github.com/iamzhoufei
 * 
设计链表的实现。您可以选择使用单链表或双链表。单链表中的节点应该具有两个属性：val 和 next。val 是当前节点的值，next 是指向下一个节点的指针/引用。如果要使用双向链表，则还需要一个属性 prev 以指示链表中的上一个节点。假设链表中的所有节点都是 0-index 的。
在链表类中实现这些功能：

get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。
 

示例：
MyLinkedList linkedList = new MyLinkedList();
linkedList.addAtHead(1);
linkedList.addAtTail(3);
linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
linkedList.get(1);            //返回2
linkedList.deleteAtIndex(1);  //现在链表是1-> 3
linkedList.get(1);            //返回3
 
提示：
所有val值都在 [1, 1000] 之内。
操作次数将在  [1, 1000] 之内。
请不要使用内置的 LinkedList 库。

 */

var MyLinkedList = function () {
    this._head = null;
    this._tail = null;
    this._size = 0;
};

/**
 * 预先定义一个创建节点的构造函数
 */

class ListNode {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}


/** 
 * 先定义一个获取链表中节点的方法
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.getNode = function (index) {
    // 先判断 index 的范围，不在范围内则直接返回 null
    if (index < 0 || index >= this._size) return null;

    // 创建一个哨兵节点，并将新节点的 next 指向 this._head
    let cur = new ListNode(0, this._head);

    // 哨兵节点到需要查找的节点的距离为 index + 1
    // 所以在遍历时，设置 index 为自减
    // 如果 index  === -1，表示 cur 为需要查找的节点

    while (index-- >= 0) {
        // 不满足退出循环的条件，则 cur 向前一位
        cur = cur.next;
    }

    // 或者 新定义一个计数变量 count ，从 哨兵节点开始计数
    // 当 count === index + 1 时，cur 为需要查找的节点

    // let count = 0;
    // while(count < index + 1){
    //     count++;
    //     cur = cur.next;
    // }

    return cur;
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
    if (index < 0 || index >= this._size) return -1;
    return this.getNode(index).val;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
    // 创建这个新节点，并将这个节点的next指向 当前链表的 head
    const node = new ListNode(val, this._head);
    // 再将当前链表的 head 指向这个新创建的节点
    this._head = node;
    // 同时需要判断，原本节点是否为空，为空的话， this._head === this._tail === null
    // 所以在只有一个节点的情况下，head 与 tail 指向的是同一个节点
    if (!this._tail) {
        this._tail = node;
    }
    this._size++;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
    // 既然是向链表的最后添加一个节点，那么这个节点的next指向的必然是null
    const node = new ListNode(val, null);
    this._size++;

    // 如果有尾节点
    if (this._tail) {
        // 将 tail 指针所指向的节点的next属性指向新的节点
        this._tail.next = node;
        // 并将 tail 指针 更新为新的节点
        this._tail = node;
        return;
    }

    // 没有尾节点，说明链表是空的
    this._tail = node;
    this._head = node;
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
    // 先判断索引是否有效
    if (index > this._size) return;

    if (index === this._size) {
        this.addAtTail(val);
        return;
    };

    if (index <= 0) {
        this.addAtHead(val);
        return;
    }

    // 其它情况就是正常插值
    const node = this.getNode(index - 1);
    node.next = new ListNode(val, node.next);
    this._size++;
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
    // 先判断索引是否有效
    if (index < 0 || index >= this._size) return;

    // 判断删除的节点类型
    // 删除的是头节点
    if (index === 0) {
        this._head = this._head.next;
        this._size--;
        return;
    }

    const prevNode = this.getNode(index - 1);
    prevNode.next = prevNode.next.next;

    // 删除的是尾节点
    if (index === this._size - 1) {
        this._tail = prevNode;
    }
    this._size--;
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */