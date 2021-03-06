/**
# 算法题

需求描述:
输入一个[1-9] 的数字，对应打印出数字组成的菱形图案，数字是按照顺时针旋转。

```html
比如：

输入：1
输出：
  1
4 5 2
  3

输入：2
输出：
     1
  8  9  2
7 12 13 10 3
  6  11  4
     5
```

### 要求
1.输入的数字范围 [1, 9]
2.按照要求图形打印
 */
const args = require('yargs').argv
const i = args.i;

class DiamondPattern {
  constructor() {
    this.number = 1
    this.row = 0
    this.total = 0
    this.data = [[]]
  }

  input(number) {
    this.number = number > 0 && number < 10 ? number : 1
    this.getTotal()
    this.init()
    this.update(0, this.number, 1)
    // this.whileUpdate()
    this.output()
  }

  getTotal() {
    this.row = this.number * 2 + 1
    let col = 0
    for (let i = 1; i <= this.number; i++) {
      col += this.row - i * 2
    }
    this.total = this.row + col * 2
    // console.log(this.total)
  }

  init() {
    const len = this.row
    const ary = Array(len).fill(0).map(() => (Array(len).fill(0)))
    this.data = ary
    // console.log(this.data)
  }

  update(x, y, num) {
    if (this.data[x][y]) {
      this.update(x + 1, y, num)
      return null
    }

    this.data[x][y] = num
    
    if (x === this.number && y === this.number) {
      // console.log(x, y, this.number, this.total)
      return null
    } else if (num >= this.total) {
      // console.log(x, y, this.number, this.total)
      return null
    }

    // [0, 2] - [1, 3] 2 - 1 = 1 5 - 1 = 4
    const rightBottom = (x >= 0 && x < this.number) && (y >= this.number && y < (this.row - 1))
    // [2, 4] - [3, 3]
    const leftBottom = (x >= this.number && x < (this.row - 1)) && (y <= (this.row - 1) && y > this.number)
    // [4, 2] - [3, 1]
    const leftTop = (x <= (this.row - 1) && x > this.number) && (y <= this.number && y > 0)
    // [2, 0] - [1, 1]
    const rightTop = (x <= this.number && x > 0) && (y >= 0 && y < this.number)
    if (rightBottom) {
      this.update(x + 1, y + 1, num + 1)
    } else if (leftBottom) {
      this.update(x + 1, y - 1, num + 1)
    } else if (leftTop) {
      this.update(x - 1, y - 1, num + 1)
    } else if (rightTop) {
      this.update(x - 1, y + 1, num + 1)
    }
  }

  whileUpdate () {
    let x = 0
    let y = this.number
    let num = 1
    let noEnd = true

    while (noEnd) {
      if (this.data[x][y]) {
        x = x = 1
        y = y
        num = num
      } else {
        this.data[x][y] = num

        if ((x === this.number && y === this.number) || num >= this.total) {
          noEnd = false
          break
        }
        
        // [0, 2] - [1, 3] 2 - 1 = 1 5 - 1 = 4
        const rightBottom = (x >= 0 && x < this.number) && (y >= this.number && y < (this.row - 1))
        // [2, 4] - [3, 3]
        const leftBottom = (x >= this.number && x < (this.row - 1)) && (y <= (this.row - 1) && y > this.number)
        // [4, 2] - [3, 1]
        const leftTop = (x <= (this.row - 1) && x > this.number) && (y <= this.number && y > 0)
        // [2, 0] - [1, 1]
        const rightTop = (x <= this.number && x > 0) && (y >= 0 && y < this.number)
        if (rightBottom) {
          x = x + 1
          y = y + 1
          num = num + 1
        } else if (leftBottom) {
          x = x + 1
          y = y - 1
          num = num + 1
        } else if (leftTop) {
          x = x - 1
          y = y - 1
          num = num + 1
        } else if (rightTop) {
          x = x - 1
          y = y + 1
          num = num + 1
        }
      }
    }
  }

  output() {
    const star = Array(this.number * 15).fill('*')
    console.log(`${star.join('')}`)
    this.data.forEach((item) => {
      let str = ''
      item.forEach((subItem) => {
        if (subItem && `${subItem}`.length === 3) {
          str += `   ${subItem}`
        } else if (subItem && `${subItem}`.length === 2) {
          str += `    ${subItem}`
        } else if (subItem && `${subItem}`.length === 1) {
          str += `     ${subItem}`
        } else {
          str += '      '
        }
      })
      console.log(str)
    })
    console.log(`${star.join('')}`)
  }
}

const res = new DiamondPattern()
res.input(i || 1)


/**
 * 
 * 二维数组转成一维数组
 * 取余
 * 
 * row = (13 / 4 = 3) + 1
 * col = 13 % 4 = 1
 * 
 * 颜色，确定任意两个，其他的再怎么调，都不难看
 * www.w3cschool.com/colors
 * 
 * [1, 4, 5, 2, 3]
 * 
 * 取余：
 * 1. 矩阵的，一维二维的转换
 * 2. 时间戳  一天的秒数取余 x % (24 * 60 * 60)
 * 3. 周四 2019年的今天是 365 % 7 + 4 = 5 (2018 / 4) 闰年
 * 4. 0-9的随机数
 */