/**
 * 题目：373. 查找和最小的 K 对数字
 * 链接：https://leetcode-cn.com/problems/find-k-pairs-with-smallest-sums/
 * GitHub：https://github.com/iamzhoufei
*/

/**
 给定两个以 升序排列 的整数数组 nums1 和 nums2 , 以及一个整数 k 。

定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2 。
请找到和最小的 k 个数对 (u1,v1),  (u2,v2)  ...  (uk,vk) 。

示例 1:
输入: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
输出: [1,2],[1,4],[1,6]
解释: 返回序列中的前 3 对数：
     [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]

示例 2:
输入: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
输出: [1,1],[1,1]
解释: 返回序列中的前 2 对数：
     [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
     
示例 3:
输入: nums1 = [1,2], nums2 = [3], k = 3 
输出: [1,3],[2,3]
解释: 也可能序列中所有的数对都被返回:[1,3],[2,3]
 

提示:
    1 <= nums1.length, nums2.length <= 105
    -109 <= nums1[i], nums2[i] <= 109
    nums1 和 nums2 均为升序排列
    1 <= k <= 1000
*/


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */

var kSmallestPairs = function (nums1, nums2, k) {
    const pq = new Heap([], (a, b) => a[0] + a[1] < b[0] + b[1]);
    for (const num1 of nums1) {
        for (const num2 of nums2) {
            const item = [num1, num2];
            pq.push(item);
            if (pq.size > k) {
                // 引用相同，说明后面的数字对都会出队，所以可以提前退出
                if (pq.pop() === item) break;
            }
        }
    }
    return pq.getData();
};

class Heap {
    constructor(data, cmp) {
        this.data = [null].concat(data);
        this.cmp = cmp;
        for (let i = data.length >> 1; i > 0; i--) this.down(i);
    }
    get size() {
        return this.data.length - 1;
    }
    get top() {
        return this.data[1];
    }
    getData() {
        return this.data.slice(1);
    }
    swap(i, j) {
        [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
    }
    up(i) {
        if (i <= 1) return;
        const p = i >> 1;
        if (this.cmp(this.data[p], this.data[i])) {
            this.swap(i, p);
            this.up(p);
        }
    }
    down(i) {
        let j = i;
        const n = this.data.length;
        if (i >= n - 1) return;
        const l = i << 1, r = l + 1;
        if (l < n && this.cmp(this.data[i], this.data[l])) i = l;
        if (r < n && this.cmp(this.data[i], this.data[r])) i = r;
        if (j !== i) {
            this.swap(i, j);
            this.down(i);
        }
    }
    push(item) {
        this.up(this.data.push(item) - 1);
    }
    pop() {
        this.swap(1, this.data.length - 1);
        const res = this.data.pop();
        this.down(1);
        return res;
    }
}