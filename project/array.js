/*
 *数组,数组是对象的特殊形式，JavaScript的数组是动态的
 javascript数组不存在越界错误，试图查询不存在的元素时会报undefined
 * */

//数组的长度
var a = new Array();
console.log(a.length);

//数组元素删除和添加
a[0] = "zero";
a[1] = "one";
a.push("three");//在尾部插入数据
a.push("four","five");
a[a.length] = "six";
a.unshift("seven");//首部插入数据

delete a[1];//数组length属性不变，并且后面的元素不会往前移动补充，因此这种数组成为稀疏数组
console.log(a);//[ 'seven', <1 empty item>, 'one', 'three', 'four', 'five', 'six' ]

a.pop();//从数组尾部弹出一个元素，并将长度length减1
console.log(a);
a.shift();//从数组首部弹出一个元素，并将每个元素依次下移1
console.log(a);

//数组不应该用for/in循环，for/in能够枚举继承的属性名


//forEach方法遍历数组
var data = [1,2,3,4,5];
var sumOfSquares = 0;
data.forEach(
    function(x){//把数组中的每个子元素传给该函数
        sumOfSquares += x*x;
    }
);

console.log(sumOfSquares);

//数组方法
//join()，将数组中的元素转化为字符串并拼接在一起
var b = [1,2,3];
console.log(b.join(''));//123,指定分割符
console.log(b.join());//1,2,3

//reverse(),翻转数组元素,在原数组上重排操作
a.reverse();
console.log(a);//[ 'five', 'four', 'three', 'one', <1 empty item> ]

//sort(),排序，并返回排序后的数组,undefined元素会被排到数组尾部；按其他方式进行排序，需要自定义函数，假设第一个参数应该在前，比较函数应该返回大于0的数值，反之，第一个参数
//在后，比较函数应该返回小于0的数值，相等就返回0
var s = [];
s[0] = 10;
s[1] = 20;
s[3] = 30;
console.log(s);
s.sort();
for(var i; i>=0;i=s.length-1){
    if(!s[i]){
        s.pop();
    }            
}
console.log('去undefiend后，数组s为:',s);
