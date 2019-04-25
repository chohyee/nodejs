//面向对象
//同过原型继承创建对象
exports.inherit = function(p){
    if( p == null) throw TypeError();
    if( Object.create){
        return Object.create(p)
    }
    var t = typyof(p);
    if( t !== "object" && t !== "function") throw TypeError();
    function f(){};
    f.prototype = p;
    return new f(); //使用f()创建p的继承对象
}
