/**
Task：计算一个整数区间[n: m]中数字k(0~9)出现的`次数`
Example:
问题: [10: 20]  k = 3
结果: 1
[13]

问题: [111: 122]  k = 2
结果: 5
[112,120,121,122]
 */

const args = require('yargs').argv
const str = args.i;
const ary = str.split(',')
const s = Number(ary[0]);
const b = Number(ary[1]);
const k = Number(ary[2]);

class Demo {
  constructor() {
    this.count = 0
    this.ary = []
  }

  initTest(min, max, key) {
    for (let i = min; i <= max; i++) {
      const str = i.toString()
      for (let j = 0; j < str.length; j++) {
        if (str[j] === `${key}`) {
          this.count += 1
        }
      }
      if (str.indexOf(`${key}`) > -1) {
        this.ary.push(i)
      }
    }
  }

  countDigitOne(n, k) {
    if (n < 10 && k == 0) {
      return 1;
    }
    let sum = 0;
    let level = 1;
    // while(n / level != 0){
    while(level < 1000) {
      if (k == 0 && n / (level * 10) == 0) {// 最高位不能为0
        break;
      }
      const current = Math.floor((n / level) % 10); // 计算当前位 （个位）
      const before = Math.floor(n / (10 * level)); // 计算当前位高位
      const after = n - Math.floor(n / level) * level; // 计算当前位的低位

      // if (n === 122) {
      //   console.log('>>>>>>>>>>>>>>>>>>>')
      //   console.log('当前位:', level, ' 当前位值：', current, ' 当前位高位：', before, ' 当前位低位', after)
      // }

      const oldSum = sum
      if (current > k) {
        sum += (before + 1) * level;
        // if (n === 122) {
        //   console.log(`${current} > ${k} : sum = ${oldSum} + (${before} + 1) * ${level} = ${sum}`)
        // }
      } else if (current < k) {
        sum += (before) * level;
        // if (n === 122) {
        //   console.log(`${current} < ${k} : sum = ${oldSum} + (${before}) * ${level} = ${sum}`)
        // }
      } else {
        sum += (before) * level + after + 1;
        // if (n === 122) {
        //   console.log(`${current} == ${k} : sum = ${oldSum} + (${before}) * ${level} + ${after} + 1 = ${sum}`)
        // }
      }
      level *= 10;
    }

    return sum;
  }

  digitCounts(n, k) {
    let current = 0;
    let before = 0;
    let after = 0;
    let index = 1, n_count = 0;
    if (n == 0 && k == 0) {
      return 1;
    }
    while (n / index != 0) {
      if (k == 0 && n / (index * 10) == 0) { // 最高位不能为0
        break;
      }
      current = Math.floor((n / index) % 10);
      before = Math.floor(n / (index * 10));
      after = n - Math.floor(n / index) * index;
      if (current > k) {
        n_count = n_count + (before + 1) * index;
      } else if (current < k) {
        n_count = n_count + before * index;
      } else {
        n_count = n_count + before * index + after + 1;
      }
      index *= 10;
    }
    return n_count;
  }

  init(min, max, key) {
    console.log('输入：', min, max, key)
    let count = 0;
    let currentMax = 0;
    let currentMin = 0;
    let beforeMax = 0;
    let beforeMin = 0;
    let afterMax = 0;
    let afterMin = 0;
    let level = 1; // 1 个位 10 十位  100 百位
    if (min > max) {
    } else if (min === 0 && max === 0 && key === 0) {
      count = 1;
    } else {
      let num = 1000
      while (level < num) {
        // console.log(max / level, max / level !== 0)
        if (key === 0 && max / (level * 10) === 0) {
          break;
        }
       
        currentMax = Math.floor((max / level) % 10); // 计算最大值的当前位数字
        currentMin = Math.floor((min / level) % 10); // 计算最小值的当前位数字
        beforeMax = Math.floor(max / (level * 10)) // 计算当前位最大值高位个数
        beforeMin = Math.floor(min / (level * 10)) // 计算当前位最小值高位个数
        afterMax = max - Math.floor(max / level) * level; // 计算当前位最大值低位
        afterMin = min - Math.floor(min / level) * level; // 计算当前为最小值低位

        // console.log('******************* ----- start -----')
        
        // console.log(`当前位数字：${currentMin} --- ${currentMax}`, currentMax - currentMin)
        // console.log(`当前位高位：${beforeMin} --- ${beforeMax}`, beforeMax - beforeMin)
        // console.log(`当前位低位：${afterMin} --- ${afterMax}`, afterMax - afterMin)

        let countMax = 0;
        let countMin = 0;
        if (currentMax > key) {
          countMax += (beforeMax + 1) * level;
        } else if (currentMax < key) {
          countMax += (beforeMax) * level;
        } else {
          countMax += (beforeMax) * level + afterMax + 1;
        }

        if (currentMin > key) {
          countMin += (beforeMin + 1) * level;
        } else if (currentMin < key) {
          countMin += (beforeMin) * level;
        } else {
          countMin += (beforeMin) * level + afterMin + 1;
        }

        // console.log(`当前位的 数字次数分别是：${countMax} --- ${countMin}`)
        count += countMax - countMin
        level *= 10;
      }
    }

    if (s % 10 === k) {
      count += 1
    }

    return count
  }

  getValue() {
    return {
      count: this.count,
      ary: this.ary
    }
  }
}

console.time('----------')
const demo = new Demo()
demo.initTest(s, b, k)
const best = demo.init(s, b, k)

console.log(`0、${k} 出现的次数：`, best)

const getValue = demo.getValue()
console.log(`1、${k} 出现的次数：`, getValue.count)
if (getValue.length < 50) {
  console.log(`1.${k} 出现的数字：`, getValue.ary)
}

const delVal = demo.countDigitOne(s, k)
const allVal = demo.countDigitOne(b, k)
let v = 0
if (s % 10 === k) {
  v = 1
}
console.log(`2、${k} 出现的次数是：${allVal} - ${delVal} = `, allVal - delVal + v)

const val = demo.digitCounts(s, k)
const val1 = demo.digitCounts(b, k)
console.log(`3、${k} 出现的次数是：${val1} - ${val} = `, val1 - val + v)

console.timeEnd('----------')






















/*
从 1 至 10，在它们的个位数中，任意的 X 都出现了 1 次。
从 1 至 100，在它们的十位数中，任意的 X 都出现了 10 次。
从 1 至 1000，在它们的千位数中，任意的 X 都出现了 100 次。
这个规律很容易验证，这里不再多做说明。

接下来以 $n=2593, X=5$ 为例来解释如何得到数学公式。从 1 至 2593 中，数字 5 总计出现了 813 次，其中有 259 次出现在个位，260 次出现在十位，294 次出现在百位，0 次出现在千位。

现在依次分析这些数据，首先是个位。从 1 至 2590 中，包含了 259 个 10，因此任意的 X 都出现了 259 次。最后剩余的三个数 2591, 2592 和 2593，因为它们最大的个位数字 3 < X，因此不会包含任何 5。

然后是十位。从 1 至 2500 中，包含了 25 个 100，因此任意的 X 都出现了 $25 \times 10=250$ 次。剩下的数字是从 2501 至 2593，它们最大的十位数字 9 > X，因此会包含全部 10 个 5。最后总计 250 + 10 = 260。

接下来是百位。从 1 至 2000 中，包含了 2 个 1000，因此任意的 X 都出现了 $2 \times 100=200$ 次。剩下的数字是从 2001 至 2593，它们最大的百位数字 5 == X，这时情况就略微复杂，它们的百位肯定是包含 5 的，但不会包含全部 100 个。如果把百位是 5 的数字列出来，是从 2500 至 2593，数字的个数与百位和十位数字相关，是 93+1 = 94。最后总计 200 + 94 = 294。

最后是千位。现在已经没有更高位，因此直接看最大的千位数字 2 < X，所以不会包含任何 5。到此为止，已经计算出全部数字 5 的出现次数。
*/