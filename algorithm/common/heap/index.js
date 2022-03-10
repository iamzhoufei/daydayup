/**
* JavaScript中堆的设计
* GitHub：https://github.com/iamzhoufei
*/

/**
 * 构建一个大顶堆
 */
class Heap {
    constructor() {
        /**
         * 元素编号从0开始
         * 父节点的编号为 Math.floor((n-1) / 2)
         * 左子节点的编号为 2n+1; 右子节点的编号为 2n+2;
         */
        this.data = [];
        this.size = this.data.length;
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2)
    }

    getLeftIndex(index) {
        return 2 * index + 1
    }

    getRightIndex(index) {
        return 2 * index + 2
    }

    // 比较函数
    compare(a, b) {
        return a - b
    }

    // 元素向上调整的方法
    shiftUp(index) {
        // 如果当前元素的编号不为0（为0意味着当前元素是堆顶元素） 并且 当前元素值 大于 父元素的值 时
        while (index && this.data[index] > this.data[this.getParentIndex(index)]) {

            // 交换当前元素与父元素的位置
            this.swap(index, this.getParentIndex(index));

            // 同时将当前元素的编号修改为父元素的编号
            index = this.getParentIndex(index)
        };
        return;
    }

    // 元素向下调整的方法
    shiftDown(top) {
        // last => 堆中最后一个元素的下标
        let last = this.size - 1;

        // 根据堆顶元素的下标去计算它的右子节点的下标（一个元素的子节点的最大下标位于右子节点处）
        // 如果计算得出的右子节点的下标 <= 最后一个元素的下标，说明当前节点不是最后一层的元素
        while (top * 2 + 2 <= last) {
            // temp 指向的是三元组中最大值的下标，初始设置为top（三元组中顶部元素的下标）
            let temp = top;

            // 如果 当前三元组中的最大值 < 左子节点的值 => 说明左子节点的值更大，那么就将temp指向左子节点的下标
            if (this.data[temp] < this.data[this.getLeftIndex(top)]) { temp = this.getLeftIndex(top) };

            // 如果 top 节点的右子树存在 并且 当前三元组中的最大值 < 右子节点的值 => 说明右子节点是三元组中的最大值，将 temp 指向右子节点的下标
            if (this.getRightIndex(top) <= last && this.data[temp] < this.data[this.getRightIndex(top)]) { temp = this.getRightIndex(top) };

            // 如果 三元组中最大值的下标 === 当前三元组中顶部元素的下标 => 说明当前三元组的大小关系是正确的，不需要继续向下调整
            if (temp === top) break;

            // 到达此处，说明 三元组中最大值的下标 不是 三元组顶部元素的下标 =>  最大值元素 和 顶部元素需要交换位置
            this.swap(temp, top)

            // 交换位置之后，将 top 设置为当前最大值的下标，并且 以这个最大值为顶部元素 进行下一次循环
            top = temp;
        };
    }

    // 交换两个指定下标的元素
    swap(idx1, idx2) {
        [this.data[idx1], this.data[idx2]] = [this.data[idx2], this.data[idx1]]
    }

    // 返回堆顶元素
    peek() {
        return this.data[0];
    }

    // 添加元素
    add(val) {
        // 将添加的元素放置在堆的末尾
        this.data[this.size++] = val;

        // 插入元素后，对最后一个元素进行向上调整
        this.shiftUp(this.size - 1);

        console.log(this.data);
    }

    // 弹出并返回堆顶元素
    pop() {
        // 判断特殊情况，如果当前堆中没有元素，直接返回 null
        if (this.size === 0) return;

        // 将堆的最后一个元素与堆顶元素交换
        this.swap(0, this.size - 1)
        // this.data[0] = this.data[this.size - 1];

        // 将堆的长度减一（完全二叉树使用连续的存储空间保存数据）
        this.data.length -= 1;

        // 再手动将 size - 1
        this.size -= 1;

        // top => 三元组中顶部元素的下标，删除元素的话就是从堆顶开始向下调整
        this.shiftDown(0);

        console.log(this.data);
        return;
    }
}

const heap = new Heap();

heap.add(1);
heap.add(3);
heap.add(2);
heap.add(6);
heap.add(5);
heap.add(7);
heap.pop();
