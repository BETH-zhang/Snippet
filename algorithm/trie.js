// node trie.js --i=an
const args = require('yargs').argv
const word = args.i;
const n = args.n;
// const data = require('./small-words').default;
const data = require('./all-words').default;

/**
 * 1.根节点不包含字符，除根节点外的每一个子节点都包含一个字符
 * 2.从根节点到某一节点的路径上的字符链接起来，就是该节点对应的字符串
 * 3.每个节点的所有子节点包含的字符都不相同
 * 
 * 应用：
 * 1.字符串的快速检索
 * 2.字符串排序
 * 3.最长公共前缀
 * 4.自动匹配前缀显示后缀
 * 5.指针模板的实现
 */

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

  remove(word) {
    if (this.isValid(word)) {
      var cur = this.root;
      var array = [];
      var n = word.length;
      for (var i = 0; i < n; i++) {
        var c = word.charCodeAt(i);
        c = this.getIndex(c);
        var node = cur.som[c];
        if (node) {
          array.push(node)
          cur = node
        } else {
          return false
        }
      }

      if (array.length === n) {
        array.forEach(function() {
          cur.numPass--
        })
        cur.numEnd--
        if (cur.numEnd == 0) {
          cur.isEnd = false
        }
      }
    } else {
      return false
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

  // 在字典树中查找是否存在某字符串为前缀开头的字符串(包括前缀字符串本身)
  isContainPrefix(word) {
    if (this.isValid(word)) {
      var cur = this.root;
      for (var i = 0; i < word.length; i++) {
        var c = word.charCodeAt(i);
        c = this.getIndex(c); // 减少‘0’的charCode
        if (cur.son[c]) {
          cur = cur.son[c];
        } else {
          return false
        }
      }
      return true;
    } else {
      return false
    }
  }

  // 在字典树种查找是否存在某字符串（不为前缀）
  isContainWord(str) {
    if (this.isValid(word)) {
      var cur = this.root;
      for (var i = 0; i < word.length; i++) {
        var c = word.charCodeAt(i);
        c = this.getIndex(c);
        if (cur.son[c]) {
          cur = cur.son[c];
        } else {
          return false
        }
      }
      return cur.isEnd;
    } else {
      return false;
    }
  }

  // 统计以指定字符串为前缀的字符串数量
  countPrefix(word) {
    if (this.isValid(word)) {
      var cur = this.root;
      for (var i = 0; i < word.length; i++) {
        var c = word.charCodeAt(i);
        c = this.getIndex(c);
        if (cur.son[c]) {
          cur = cur.son[c];
        } else {
          return 0;
        }
      }
      return cur.numPass;
    } else {
      return 0;
    }
  }

  // 统计某字符串出现的次数方法
  countWord(word) {
    if (this.isValid(word)) {
      var cur = this.root;
      for (var i = 0; i < word.length; i++) {
        var c = word.charCodeAt(i);
        c = this.getIndex(c);
        if (cur.son[c]) {
          cur = cur.son[c]
        } else {
          return 0;
        }
      }
      return cur.numEnd;
    } else {
      return 0;
    }
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
  var ary = []
  trie.preTraversal(function(node, str){
    // console.log(str, node.isEnd)
    if(str.indexOf(word) === 0 && node.isEnd){
      ary.push({ value: str, len: str.length })
    }
  })

  return ary
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
  let ary = main(word)
  ary.sort((a, b) => (a.len - b.len))
  ary = ary.map((item) => (item.value))
  ary = ary.slice(0, n)
  ary.sort(arrSortMinToMax)
  console.log(`打印结果：${ary}`)
  console.timeEnd('*************')
}

logger()
