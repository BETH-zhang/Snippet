// node words.js --i=an
const args = require('yargs').argv
const str = args.i;
const n = args.n;
// const data = ['and','ant','as','at','cn','com']
// const data = require('./small-words').default;
const data = require('./all-words').default;

function main(str) {
  if (!str) {
    return null
  }

  const ary = [];
  data.forEach((item) => {
    if (item.indexOf(str) === 0) {
      ary.push({
        value: item,
        len: item.length
      })
    }
  })

  return ary
}

// function arrMinNum(arr) {
//   var minNum = Infinity,
//     index = -1,
//     minVul = "";
//   for (var i = 0; i < arr.length; i++) {
//     if (typeof (arr[i]) == "string") {
//       if (arr[i].charCodeAt() < minNum) {
//         minNum = arr[i].charCodeAt();
//         minVul = arr[i];
//         index = i;
//       }
//     } else {
//       if (arr[i] < minNum) {
//         minNum = arr[i];
//         minVul = arr[i]
//         index = i;
//       }
//     }
//   };
//   return {
//     "minNum": minVul,
//     "index": index
//   };
// }

function arrSortMinToMax(a, b) {
  if (a.length < b.length) {
    return a - b;
  } else if (a.length > b.length) {
    return b - a;
  } else {
    for (var i = 0; i < a.length; i++) {
      if (a[i].charCodeAt() !== b[i].charCodeAt()) {
        return a[i].charCodeAt() - b[i].charCodeAt()
      }
    }
    return 0
  }
}

const logger = () => {
  console.log(`用户输入：${str}`)
  console.time('*************')
  let ary = main(str)
  ary.sort((a, b) => (a.len - b.len))
  ary = ary.map((item) => (item.value))
  ary = ary.slice(0, n)
  ary.sort(arrSortMinToMax)
  console.log(`打印结果：${ary}`)
  console.timeEnd('*************')
}

logger()