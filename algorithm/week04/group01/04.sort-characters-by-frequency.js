/**
* 题目：451. 根据字符出现频率排序
* 链接：https://leetcode-cn.com/problems/sort-characters-by-frequency/
* GitHub：https://github.com/iamzhoufei
*/

/** 
给定一个字符串，请将字符串里的字符按照出现的频率降序排列。
示例 1:
输入:
"tree"

输出:
"eert"

解释:
'e'出现两次，'r'和't'都只出现一次。
因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。

示例 2:
输入:
"cccaaa"

输出:
"cccaaa"

解释:
'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
注意"cacaca"是不正确的，因为相同的字母必须放在一起。

示例 3:
输入:
"Aabb"

输出:
"bbAa"

解释:
此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
注意'A'和'a'被认为是两种不同的字符。
*/

/**
 * @param {string} s
 * @return {string}
 */

/**
 * topK 请使用 堆来解决！
 */

var frequencySort = function (s) {
    const map = new Map();
    const array = s.split('');
    const set = [...new Set(array)];

    for (let i = 0; i < array.length; i++) {
        if (map.has(array[i])) {
            // 如果 map 中存储过了当前字符，就在map的映射末尾添加一个字符
            map.set(array[i], `${map.get(array[i])}${array[i]}`)
        } else {
            // 如果 map 中没有存储过当前字符，就在map的映射中创建一个字符
            map.set(array[i], array[i])
        }
    }

    // 按照 map 中保存的字符长度进行降序排列
    const resultArray = set.sort((a, b) => map.get(b).length - map.get(a).length)

    let result = '';

    // 遍历数组，拼接字符串
    for (let i = 0; i < resultArray.length; i++) {
        result += map.get(resultArray[i])
    }

    return result;
};