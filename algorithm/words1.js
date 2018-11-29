// node trie.js --i=an
const args = require('yargs').argv
const word = args.i;
const n = args.n;
// const data = require('./small-words').default;
const data = require('./all-words').default;

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  isValid(str) {
    return /^[a-z1-9]+$/i.test(str);
  }

  // 核心方法
  insert(word) {
    // addWord
    if (this.isValid(word)) {
      var cur = this.root;
      for (var i = 0; i < word.length; i++) {
        var c = word.charCodeAt(i);
        c = this.getIndex(c); // 减少‘0’的charCode
        var node = cur.son[c];
        if (node == null) {
          var node = (cur.son[c] = new TrieNode());
          node.value = word.charAt(i);
          node.numPass = 1; // 有N个字符串经过它
        } else {
          node.numPass++;
        }
        cur = node;
      }
      cur.isEnd = true; // 有字符串到此节点已经结束
      cur.numEnd++; // 这个字符串重复次数

      return true;
    } else {
      return false
    }
  }

  getIndex(c){
    if(c < 58){//48-57
      return c - 48
    }else if(c < 91){//65-90
      return c - 65 + 11
    }else {//> 97 
      return c - 97 + 26+ 11
    }
  }

  // 先序遍历-核心方法
  preTraversal(cb) {
    function preTraversalImpl(root, str, cb) {
      cb(root, str);
      for (let i = 0, n = root.son.length; i < n; i++) {
        let node = root.son[i];
        if (node) {
          preTraversalImpl(node, str + node.value, cb)
        }
      }
    }

    preTraversalImpl(this.root, '', cb)
  }

}

class TrieNode {
  constructor() {
    this.numPass = 0; // 有多少单词经过这个节点
    this.numEnd = 0; // 有多少个单词就此结束
    this.son = [];
    this.value = ''; // value为单个字符
    this.isEnd = false;
  }
}

console.time('----------')
var trie = new Trie();
data.forEach((item) => {
  trie.insert(item)
})
console.timeEnd('----------')

const main = (word) => {
  var obj = {}
  var ary = []
  trie.preTraversal(function(node, str){
    // console.log(str, node)
    if(str.indexOf(word) === 0 && node.isEnd){
      obj[str] = { len: str.length, numPass: node.numPass, numEnd: node.numEnd }
      ary.push({ value: str, len: str.length, numPass: node.numPass, numEnd: node.numEnd })
    }
  })

  return {
    obj,
    ary
  }
}

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
  console.log(`用户输入：${word}`)
  console.time('*************')
  const res = main(word);
  let ary = res.ary
  let obj = res.obj
  console.log(JSON.stringify(obj))
  ary.sort((a, b) => (a.len - b.len))
  ary = ary.map((item) => (item.value))
  ary = ary.slice(0, n)
  ary.sort(arrSortMinToMax)
  console.log(`打印结果：${ary}`)
  console.timeEnd('*************')
}

logger()
