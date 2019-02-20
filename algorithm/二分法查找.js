// 非递归算法
function binary_search(arr, key) {
  var low = 0,
      high = arr.length - 1;
  while(low <= high){
      var mid = parseInt((high + low) / 2);
      if(key == arr[mid]){
          return  mid;
      }else if(key > arr[mid]){
          low = mid + 1;
      }else if(key < arr[mid]){
          high = mid -1;
      }else{
          return -1;
      }
  }
};
var arr = [1,2,3,4,5,6,7,8,9,10,11,23,44,86];
console.time('----------')
var result = binary_search(arr,10);
console.log(result); // 9 返回目标元素的索引值       
console.timeEnd('----------')

// 递归算法
function binary_search(arr,low, high, key) {
  if (low > high){
      return -1;
  }
  var mid = parseInt((high + low) / 2);
  if(arr[mid] == key){
      return mid;
  }else if (arr[mid] > key){
      high = mid - 1;
      return binary_search(arr, low, high, key);
  }else if (arr[mid] < key){
      low = mid + 1;
      return binary_search(arr, low, high, key);
  }
};
var arr = [1,2,3,4,5,6,7,8,9,10,11,23,44,86];
console.time('1----------')
var result = binary_search(arr, d10);

console.log(result); // 9 返回目标元素的索引值  
console.timeEnd('1----------')