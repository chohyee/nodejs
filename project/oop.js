/*
 *对象
 1.原型：每一个对象(null)除外，都和另一个对象相关联，另一个对象就是原型，从其继承属性；
 2.所有内置构造函数都有一个继承自Object.prototype的原型，例如Array.prototype继承自Object.prototype;

 3.对象特性：
 ①对象的原型
 ②对象的类
 ③对象的扩展标记

 4.创建对象的方法
 ①直接量方法
 ②new方法
 ③object.create()方法
 * */
var foo = require('./util.js')
var cc = foo.inherit({x:3,y:6,z:[1,2,3]})
console.log(cc.x)

//对象属性访问  -- 一种避免访因属性不存在而导致问错误的方法
var len1 = cc && cc.buttle && cc.buttle.length;//将会返回cc.buttle.length的值
var len2 = cc && cc.z && cc.z.length;//将返回cc.z.length的值
console.log(len1)
console.log(len2)

//删除属性，只能删除自身属性，delete删除只是断除对象与属性的关联
var a = {x:1}; b = a.x; delete a.x;//这样会导致内存泄漏

//检测属性，判断属性是否在某个对象中 in,hasOwnProperty(),propertyIsEnumerable()
//hasOwnProperty()检测对象的自有属性返回true
//propertyIsEnumerable()检测对象的自有属性且为可枚举返回true
var mm = foo.inherit({name:'vyliu',ages:18});
mm.address = 'shenzhen';
console.log('in:','name' in mm);
console.log('in:','values' in mm);
console.log('hasOwnProperty:',mm.hasOwnProperty('address'))



//查看对象的原型
var dx = foo.inherit(mm)
console.log('mm对象的原型:',dx.prototype)

var a = new Array()
console.log(a.prototype)

//枚举类的属性
var p = {a:1,b:2,c:function f(m){
    return m;
}}

var a = {a:2,d:1,d:function d(n){
    return n;    
}}

//this关键字
//this在函数体内表示指向这个点的对象
//存储器属性
var p = {
    x:1,
    y:2,
    //r是可读写的存储器属性
    get r(){
        return Math.sqrt(this.x*this.x+this.y*this.y);
    },
    set r(newValue){
        var oldvalue = Math.sqrt(this.x*this.x+this.y*this.y);
        var ratio = newvalue/oldvalue;
        this.x*=ratio;
        this.y*=ratio;
    },
    //theta是只读存储器属性
    //
    get theta(){
        return Math.atan2(this.y,this.x);
    }
}

//存储属性可以被继承
var tmp = foo.inherit(p)
console.log(tmp.theta)


//私有属性,变量前$符号
//这个序列严格自增(不能减的)
var serial = {
    //该数据属性包含下一个序列号
    //$暗示该属性是私有的
    $n:0,
    //返回当前值，然后自增
    get next(){
        return this.$n++;
    },
    set next(n){
        if(n>=this.$n)this.$n=n;
        else throw "序列号的值不能比当前的小";
    }
}

console.log(serial.next);
serial.next = 10;
//serial.next = 0; //失效，不能这么干
console.log(serial.next);



