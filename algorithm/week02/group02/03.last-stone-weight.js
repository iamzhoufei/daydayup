/**
 * 题目：1046. 最后一块石头的重量
 * 链接：https://leetcode-cn.com/problems/last-stone-weight/
 * GitHub：https://github.com/iamzhoufei
*/

/*
有一堆石头，每块石头的重量都是正整数。

每一回合，从中选出两块 最重的 石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，且 x <= y。那么粉碎的可能结果如下：

如果 x == y，那么两块石头都会被完全粉碎；
如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。
最后，最多只会剩下一块石头。返回此石头的重量。如果没有石头剩下，就返回 0。

示例：
输入：[2,7,4,1,8,1]
输出：1

解释：
先选出 7 和 8，得到 1，所以数组转换为 [2,4,1,1,1]，
再选出 2 和 4，得到 2，所以数组转换为 [2,1,1,1]，
接着是 2 和 1，得到 1，所以数组转换为 [1,1,1]，
最后选出 1 和 1，得到 0，最终数组转换为 [1]，这就是最后剩下那块石头的重量。
 
提示：
1 <= stones.length <= 30
1 <= stones[i] <= 1000
*/

/**
 * @param {number[]} stones
 * @return {number}
 */

var lastStoneWeight = function (stones) {
    // 首先对数组进行降序排序
    stones = stones.sort((a, b) => a - b);

    // 如果当前数组还有长度，就取出两个最大的值进行相减
    if (stones.length > 1) {
        // 使用 pop 非常巧妙，既取到了两个最大的值，同时也将这两个值从数组中删除
        let d = stones.pop() - stones.pop();

        // 如果两个最大的值有差（这里不用取绝对值，因为第一个pop的值肯定大于等于第二个pop的值）
        if (d) {
            // 就把这个差值放入数组末尾
            stones.push(d);
        }
        // 开始递归，重新对数组进行排序，重复操作
        lastStoneWeight(stones);
    }

    // 最后当数组只剩一个值时，它无法再与其他值做比较，结束递归
    return stones?.length ? stones[0] : 0;
};