/**
# 算法题

需求描述
根据一个文字算式，对每一个文字进行填数，

```html
比如：
  美 小 技 术 部
*            美
---------------
  部 部 部 部 部
```

### 要求
1.计算出这些文字分别代表的是哪一个数字

2.不同文字的数字不能重复

3.所有数字的范围只能是 1-9

4.目前支持乘法即可，如果想拓展加减乘除都可以，自己决定

5.求出所有解，或者无解

**/

class fillNum {
  constructor() {
    this.aryparam1 = [];
    this.aryparam2 = [];
    this.aryResult = [];
    this.param1 = 0;// 表示被乘数
    this.param2 = 0;// 表示乘数
    this.result = 0;// 表示结果
  }

  // 执行穷举过程
  excute() {
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        for (let k = 0; k <= 9; k++) {
          for (let l = 0; l <= 9; l++) {
            for (let m = 1; m <= 9; m++) {
              this.param1 = i * 10000 + j * 1000 + k * 100 + l * 10 + m;
              this.param2 = i;
              this.result = m * 100000 + m * 10000 + m * 1000 + m * 100 + m * 10 + m
              if ((this.param1 * this.param2) == this.result) {
                this.aryparam1.push(this.param1)
                this.aryparam2.push(this.param2)
                this.aryResult.push(this.result)
              }
            }
          }
        }
      }
    }
  }

  prinit() {
    if (this.aryparam1.length) {
      for (let i = 0; i < this.aryparam1.length; i++) {
        console.log('  ' + this.aryparam1[i])
        console.log('X     ' + this.aryparam2[i])
        console.log('-------')
        console.log(' ' + this.aryResult[i])
      }
    }
  }
}

const main = new fillNum()
main.excute()
main.prinit()

