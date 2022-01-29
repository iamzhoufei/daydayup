/**
 * 题目：779. 第K个语法符号
 * 链接：https://leetcode-cn.com/problems/k-th-symbol-in-grammar/
 * GitHub：https://github.com/iamzhoufei
 * 
在第一行我们写上一个 0。接下来的每一行，将前一行中的0替换为01，1替换为10。

给定行数 N 和序数 K，返回第 N 行中第 K个字符。（K从1开始）

例子:
输入: N = 1, K = 1
输出: 0

输入: N = 2, K = 1
输出: 0

输入: N = 2, K = 2
输出: 1

输入: N = 4, K = 5
输出: 1

解释:
第一行: 0
第二行: 01
第三行: 0110
第四行: 01101001

注意：
N 的范围 [1, 30].
K 的范围 [1, 2^(N-1)].

 */

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var kthGrammar = function (n, k) {
    // 如果是第一行，直接返回0
    if (n === 1) return 0;

    // 计算每行的长度，每行的长度 = 2 的 n-1 次方，长度必定是偶数
    const length = 2 ** (n - 1);
    const mid = length / 2;

    // 除第一行以外，在每一行字符中，前半段就是前一行，后半段是前一行的反转
    // 前后半段如何区分？长度的中点，mid = length / 2，如果 k < mid，就在前半段；反之就在后半段

    // 判断 k 的位置，如果k在前半段，直接返回上一行的第k个值 kthGrammar(n-1, k) 即可
    // 如果k在后半段，k相对于上一行的位置就应该是 k - mid

    if (k > mid) {
        // k在当前行的后半段
        // 先拿到上一行中k位置的值，再对它做反转
        const val = kthGrammar(n - 1, k - mid);
        return val === 0 ? 1 : 0;
    } else {
        // k在当前行的前半段
        return kthGrammar(n - 1, k);
    }
};