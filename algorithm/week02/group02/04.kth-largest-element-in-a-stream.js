/**
 * 题目：703. 数据流中的第 K 大元素
 * 链接：https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/
 * GitHub：https://github.com/iamzhoufei
*/
 
/*
设计一个找到数据流中第 k 大元素的类（class）。注意是排序后的第 k 大元素，不是第 k 个不同的元素。

请实现 KthLargest 类：
KthLargest(int k, int[] nums) 使用整数 k 和整数流 nums 初始化对象。
int add(int val) 将 val 插入数据流 nums 后，返回当前数据流中第 k 大的元素。
 
示例：
输入：
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]

输出：
[null, 4, 5, 5, 8, 8]

解释：
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8

提示：
1 <= k <= 104
0 <= nums.length <= 104
-104 <= nums[i] <= 104
-104 <= val <= 104
最多调用 add 方法 104 次
题目数据保证，在查找第 k 大元素时，数组中至少有 k 个元素

*/

/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
    // 堆大小
    this.size = k;
    this.minHeap = new MinHeap();
    // 把数据都添加到堆中
    for (const x of nums) {
        this.add(x);
    }
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
    if (this.minHeap.size() < this.size) {
        this.minHeap.offer(val);
    } else if (val > this.minHeap.peek()) {
        this.minHeap.poll();
        this.minHeap.offer(val);
    }
    return this.minHeap.peek();
};
// 最小堆
class MinHeap {
    constructor(data = []) {
        this.data = data;
        this.comparator = (a, b) => a - b;
        this.heapify();
    }
    // 建堆
    heapify() {
        if (this.size() < 2) return;
        // 将每个元素插入，往上冒到合适位置
        for (let i = 1; i < this.size(); i++) {
            this.bubbleUp(i);
        }
    }
    // 获得堆顶元素
    peek() {
        if (this.size() === 0) return null;
        return this.data[0];
    }
    // 往小顶堆中插入元素
    offer(value) {
        this.data.push(value);
        // 在最后的位置插入且向上冒泡
        this.bubbleUp(this.size() - 1);
    }
    // 移除顶堆元素
    poll() {
        if (this.size() === 0) {
            return null;
        }
        const result = this.data[0];
        const last = this.data.pop();
        if (this.size() !== 0) {
            // 最末尾元素放到堆顶
            this.data[0] = last;
            // 向下调整直至放到合适位置
            this.bubbleDown(0);
        }
        return result;
    }

    bubbleUp(index) {
        while (index > 0) {
            // 获得父节点索引
            const parentIndex = (index - 1) >> 1;
            // 如果要调整的节点比父节点的值还要小，就需要一直往上冒
            if (this.comparator(this.data[index], this.data[parentIndex]) < 0) {
                // 交换位置往上冒
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    bubbleDown(index) {
        const lastIndex = this.size() - 1;
        while (true) {
            // 获得要调整的节点的左子节点和右子节点的索引
            const leftIndex = index * 2 + 1;
            const rightIndex = index * 2 + 2;
            let findIndex = index;
            // 如果左/右子节点的值小于当前要调整的节点的值
            if (
                leftIndex <= lastIndex &&
                this.comparator(this.data[leftIndex], this.data[findIndex]) < 0
            ) {
                findIndex = leftIndex;
            }
            if (
                rightIndex <= lastIndex &&
                this.comparator(this.data[rightIndex], this.data[findIndex]) < 0
            ) {
                findIndex = rightIndex;
            }
            // 则要交换
            if (index !== findIndex) {
                this.swap(index, findIndex);
                index = findIndex;
            } else {
                break;
            }
        }
    }
    // 交换元素
    swap(index1, index2) {
        [this.data[index1], this.data[index2]] = [
            this.data[index2],
            this.data[index1],
        ];
    }
    // 获得堆大小
    size() {
        return this.data.length;
    }
}