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
var foo = require('./util.js');
var cc = foo.inherit({x:3,y:6,z:[1,2,3]});
console.log(cc.x);

//对象属性访问  -- 一种避免访因属性不存在而导致问错误的方法
var len1 = cc && cc.buttle && cc.buttle.length;//将会返回cc.buttle.length的值
var len2 = cc && cc.z && cc.z.length;//将返回cc.z.length的值
console.log(len1);
console.log(len2);

//删除属性，只能删除自身属性，delete删除只是断除对象与属性的关联
var a = {x:1}; b = a.x; delete a.x;//这样会导致内存泄漏

//检测属性，判断属性是否在某个对象中 in,hasOwnProperty(),propertyIsEnumerable()
//hasOwnProperty()检测对象的自有属性返回true
//propertyIsEnumerable()检测对象的自有属性且为可枚举返回true
var mm = foo.inherit({name:'vyliu',ages:18});
mm.address = 'shenzhen';
console.log('in:','name' in mm);
console.log('in:','values' in mm);
console.log('hasOwnProperty:',mm.hasOwnProperty('address'));



//查看对象的原型
var dx = foo.inherit(mm);
console.log('mm对象的原型:',dx.prototype);

var a = new Array();
console.log(a.prototype);

//枚举类的属性
var p = {a:1,b:2,c:function(m){
    return m;
}};

var a = {a:2,d:1,d:function(n){
    return n;    
}};
console.log('-:',a.d(3));
console.log('-:',p.c(2));
//枚举类型的自有属性的名称
console.log('枚举类型的自有属性的名称:',Object.getOwnPropertyNames(p));
//所有自有属性的名称
console.log('所有自有属性的名称:',Object.keys(p));

//this关键字
//this在函数体内表示指向这个点的对象
//存储器属性(直接定义存储器属性)
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
};

//存储属性可以被继承
var tmp = foo.inherit(p);
console.log(tmp.theta);


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
};

console.log(serial.next);
serial.next = 10;
//serial.next = 0; //失效，不能这么干
console.log(serial.next);


//属性的特性,一个属性包含名字和四个特性(描述符)，分别为值，可写性，可枚举性，可配置性
//value,writable,enumerable,configurable,均为布尔值
//查询自有的描述符
//对于存储器属性，描述符为读取(get，函数类型)，写入(set，函数类型)，可枚举(enumerable，布尔)，可配置(configurable，布尔)等
var des = {x:1,y:1,c:function c(){
        return 'success';
    }   
};

var boo = Object.getOwnPropertyDescriptor(des,'c');
console.log('des对象的c属性的描述符为：',boo);
//修改自有的描述符
Object.defineProperty(des,'c',{value:2,writable:true,enumerable:false,configurable:true});
var boo = Object.getOwnPropertyDescriptor(des,'c');
console.log('des对象的c属性的描述符为：',boo);

//批量修改/新增自有属性，第一个参数为对象，第二个参数为映射表, Object.defineProperties()
var a = {};
var obb = Object.defineProperties(a,{//返回对象
    x:{value:10,writable:true,enumerable:false,configurable:true},
    y:{value:20,writable:true,enumerable:false,configurable:true},
    c:{get:function(){return this.x+this.y;},enumerable:true,configurable:true}
});
console.log(obb.c);

/*对象的三个属性
①原型属性(prototype)
②类属性(class)
③可扩展性(extensible)*/

//查询原型
console.log('obb的原型是:',Object.getPrototypeOf(obb));
//检查一个对象是否是另一个对象的原型
console.log('对象Object.prototype是否是对象obb的原型:',Object.prototype.isPrototypeOf(obb));
console.log('对象a是否是对象obb的原型:',a.isPrototypeOf(obb));//由此可见，Object.defineProperties并不能产生继承

//类的属性，类的属性是一个字符串
console.log(obb.toString());
//调用util.js中封装好的方法来获取对象的类属性
var m = {x:12,y:14};
var newob = new Array();
console.log('newob的类属性为:',foo.classof(newob));//Array
//自定义的对象，Object.create()创建出来的对象的类属性都是Object，因此自定义等对象没法通过类属性来区分类;

//可扩展性,可扩展性表示是否可以给新对象添加属性，不可扩展是把对象锁起来，不受外界干扰
//判断一个对象是否可扩展
console.log('对象newob扩展性:',Object.isExtensible(newob));
//将对象改为不可扩展，这个操作不会影响该对象的原型，也就是说给该对象原型添加属性，该对象还是能继承
console.log('将newob转为不可扩展对象：',Object.preventExtensions(newob))
console.log('转换后，对象newob扩展性:',Object.isExtensible(newob));
var sealob = new Array();
//判断对象是否封闭，封闭对象不仅不可扩展，而且已有的属性也不能删除和配置，不过已有的可写属性依然可以设置
console.log('对象sealob是否封闭:',Object.isSealed(sealob));
//将对象封闭
console.log('将对象sealob封闭',Object.seal(sealob));
console.log('对象sealob封闭后的封闭属性为:',Object.isSealed(sealob));
//对象冻结，不可扩展，不可配置和删除已有属性，所有数据属性设置为只读，如果对象的存取器属性具有setter方法，存储器不受影响。
var frozenob = new Array();
//判断对象是否冻结
console.log('对象frozenob的冻结状态:',Object.isFrozen(frozenob));
//将对象冻结
console.log('将对象frozenob冻结',Object.freeze(frozenob));
//判断对象是否冻结
console.log('对象frozenob冻结状态为:',Object.isFrozen(frozenob));
//Object.preventExtensions()、Object.seal()、Object.freeze()都是返回传入的对象，也就是说，可以通过函数嵌套的方式调用他们
//创建一个封闭对象，包含一个冻结的原型和一个不可枚举的属性
var o = Object.seal(Object.create(
                          Object.freeze({x:1}),
                          {y:{value:2,writable:true}}          
                          )
                    );
//Object.create()方法中第一个参数是原型，第二个参数是对象描述参数，比如上面的y就是对象新增的属性
console.log('对象o的属性y的值',o.y);
console.log('对象o的属性y是否是自有属性：',o.hasOwnProperty('y'));//true

/*
 * 序列化对象,将对象转化为字符串，将字符串转化为对象
JSON.stringify()和JSON.parse()分别将对象序列化和还原js对象，这些方法都是用json作为数据交换格式，只能序列化对象可枚举的自有属性
JSON.stringify()和JSON.parse()都可以接受两个参数，第一个是对象，第二个是传需要序列化活反序列化的属性列表
*/
var o = {x:1,y:{z:[false,null,""]},w:function f(){return 1},u:undefined};
s = JSON.stringify(o);//函数属性将会被忽略,undefined,Error,RegExp等也会被忽略
p = JSON.parse(s);
console.log(s);//{"x":1,"y":{"z":[false,null,""]}}
console.log(p);//{ x: 1, y: { z: [ false, null, '' ] } }


