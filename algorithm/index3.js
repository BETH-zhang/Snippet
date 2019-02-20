/**

# 计算一个指定数组指定位置的数

该队列满足三个条件：
* 1.第一个数（index为0）是1
* 2.对于队列中的任一个数x, 同时 2x+1和 3x+1 也在该数组中
* 3.该数组从小到大排列

其实就是这样的一个无限的数组

[1, 3, 4, 7, 9, 10, 13, 15, 19, 21, 22, 27, …]

输入10给输出22

### 条件
数组内的数字不可以重复
 */

const args = require('yargs').argv
const i = args.i;
const j = args.j;

class Demo {
  constructor() {
    this.ary = [1]
    this.delCount = 0
  }

  sort3(value) {
    let low = 0;
    let high = this.ary.length - 1;
    let count = 0;
    console.log('****** sort3:', this.ary)
    while (low <= high) {
      console.log('low:'+ low, '  ----high:', high)
      var mid = parseInt((high + low) / 3);
      if (this.ary[mid] < value && value < this.ary[mid + 1]) {
        this.ary.splice(mid + 1, 0, value)
        return 1;
      } else if (this.ary[mid - 1] < value && value < this.ary[mid]) {
        this.ary.splice(mid, 0, value)
        return 1;
      } else if (this.ary[mid] < value) {
        low = mid + 3;
      } else if (value < this.ary[mid]) {
        high = mid - 1;
      }

      if (low >= high) {
        this.ary.push(value)
        return 1; 
      }

      count++ 
    }
  }

  sort2(value) {
    let low = 0;
    let high = this.ary.length - 1;
    let count = 0;
    console.log('****** sort2:', this.ary)
    if (low > high) {
      this.ary.push(value)
      return 1;
    }

    while (low <= high) {
      console.log('low:'+ low, '  ----high:', high)

      var mid = parseInt((high + low) / 2);
      if (!mid && this.ary.length === 1) {
        this.ary.push(value)
        return 1;
      } else if (this.ary[mid - 1] < value && value < this.ary[mid]) {
        this.ary.splice(mid, 0, value)
        return 1;
      } else if (this.ary[mid] < value && value < this.ary[mid + 1]) {
        this.ary.splice(mid + 1, 0, value)
        return 1;
      } if (this.ary[mid] < value) {
        low = mid + 2;
      } else if (value < this.ary[mid]) {
        high = mid - 1;
      }

      if (low >= high) {
        this.ary.push(value)
        return 1; 
      }
      count++
    }
  }

  init(len) {
    if (!len) {
      console.log('len not value')
      return null
    }
    // 初始化 10 个数字，找一下规律
    while (this.delCount + this.ary.length < len) {
      const x2 = this.ary[0] * 2 + 1
      const x3 = this.ary[0] * 3 + 1
      console.log('')
      console.log('')
      console.log(`_________第${this.delCount + 1}次循环：原数组 `,this.ary)
      console.log('当前计算的数字：', x2, x3)
      console.log(`\n 删除 ${this.ary[0]} \n`)
      this.ary.shift()
      if (this.ary.indexOf(x2) === -1) {
        this.sort2(x2)
      }
      if (this.ary.indexOf(x3) === -1) {
        this.sort3(x3)
      }
      this.delCount ++
    }
    return this.ary
  }

  getValue(index) {
    console.log(this.ary, i, this.delCount)
    // i - this.delCount
    return this.ary[i - this.delCount - 1]
  }
}

console.time('----------')
const demo = new Demo()
demo.init(i)
const getValue = demo.getValue(i)
console.log('getValue:', getValue)
console.timeEnd('----------')