/**
* 题目：347. 前 K 个高频元素
* 链接：https://leetcode-cn.com/problems/top-k-frequent-elements/
* GitHub：https://github.com/iamzhoufei
*/

/** 
给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。

示例 1:
输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]

示例 2:
输入: nums = [1], k = 1
输出: [1]

提示：
1 <= nums.length <= 105
k 的取值范围是 [1, 数组中不相同的元素的个数]
题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的
 
进阶：你所设计算法的时间复杂度 必须 优于 O(n log n) ，其中 n 是数组大小。
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
    // 定义一个map，用于保存每个元素和它出现的次数
    const map = new Map();
    // 定义一个set，保存数组中不重复的元素
    const result = Array.from(new Set(nums));

    // 遍历数组
    for (let i = 0; i < nums.length; i++) {
        // 如果数组中存储过了当前元素，那么当前元素的出现次数 + 1
        if (map.has(nums[i])) {
            map.set(nums[i], map.get(nums[i]) + 1)
        } else {
            // 没有存储过当前元素（本次是当前元素第一次出现），那么设置出现次数为1
            map.set(nums[i], 1)
        }
    }

    // 对不重复的数组按照map中存储的出现次数进行降序排序
    // 排序完成后截取前 k 个元素，返回即可
    return result.sort((a, b) => map.get(b) - map.get(a)).slice(0, k)
};

/**
 * 更优解需要使用 堆
 */