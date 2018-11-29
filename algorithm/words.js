// node words.js --i=an
const args = require('yargs').argv
const str = args.i;
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

const logger = () => {
  console.log(`用户输入：${str}`)
  console.time('*************')
  let ary = main(str)
  ary.sort((a, b) => (a.len - b.len))
  ary = ary.map((item) => (item.value))
  console.log(`打印结果：${ary}`)
  console.timeEnd('*************')
}

logger()