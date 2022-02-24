/**
 * 题目：215. 数组中的第K个最大元素
 * 链接：https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
 * GitHub：https://github.com/iamzhoufei
*/
 
/*
给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例 1:
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5

示例 2:
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
 
提示：
1 <= k <= nums.length <= 104
-104 <= nums[i] <= 104

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    // 使用小顶堆，那么第k大的元素就是堆顶元素

    let heap = new Heap(); // 小顶堆
    for (let num of nums) {
        heap.push(num);
        if (heap.size > k) heap.pop();
    }

    console.log(heap);
    return heap.peek();
};

class Heap {
    constructor() {
        this.array = [0];
    }

    /**
    * 根据可迭代对象生成堆
    * @param {*} data iterable 对象
    */
    static heapify(data) {
        let heap = new Heap();
        for (let item of data) {
            heap.push(item);
        }
        return heap;
    }

    // 向堆中增加元素
    push(val) {
        const { up, array } = this;
        // 在数组末尾添加元素
        array.push(val);
        // 将末尾的元素上浮
        up(array.length - 1);
    }

    // 将堆顶元素弹出，并返回弹出的元素
    pop() {
        const { size, array, down, swap } = this;

        // 如果数组中没有元素，返回 null
        if (size === 0) return null;

        // 将数组中最后一个元素与第一个元素交换位置（此时的第一个元素是删除堆顶元素时的第二个元素）
        swap(1, array.length - 1);

        // 将数组中的第一个元素弹出，并保存在变量中
        const val = array.pop();

        // 将堆顶的元素下沉到正确的位置
        down(1);

        // 返回弹出的堆顶元素
        return val;
    }

    // 堆中元素数量
    get size() {
        return this.array.length - 1;
    }

    peek() {
        return this.array[1];
    }

    // 让第k个元素上浮
    up(k) {
        console.log(this);
        let { parent, compare, swap } = this;
        // 如果 k 不是第一个元素，并且 当前元素比它的父元素的优先级更高 => 交换两个节点
        while (k > 1 && compare(array[k], array[parent(k)])) {
            swap(parent(k), k);
            k = parent(k);
        }
    }

    // 让第k个元素下沉
    down(k) {
        const { array, size, left, right, compare, swap } = this;
        // 如果k位于最后一层，就不再下沉
        while (left(k) <= size) {
            let child = left(k);
            if (right(k) <= size && compare(array[right(k)], array[child])) {
                child = right(k);
            }

            if (compare(array[k], array[child])) return;

            swap(k, child);

            k = child;
        }
    }

    parent (index) { return Math.floor(index / 2) };
    left (index) { return index * 2 };
    right (index) { return index * 2 + 1 };

    // 比较函数，因为这道题使用小顶堆，所以 值小的元素 优先级更高
    compare = (a, b) => { return a < b };

    // 交换函数，用于交换两个元素值
    swap(i, j) {
        let arr = this.array;
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
}