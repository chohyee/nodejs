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

//检测属性，判断属性是否在某个对象中 in,hasOwnPreperty(),propertyIsEnumerable()
var mm = foo.inherit({name:'vyliu',ages:18});
console.log('name' in mm);
console.log('values' in mm);

