//5、

function Fn() {
    this.x = 100;
    this.y = 200;
    this.getX = function () {
        console.log(this.x);
    }
}
Fn.prototype.getX = function () {
    console.log(this.x);
};
Fn.prototype.getY = function () {
    console.log(this.y);
};
var f1 = new Fn;
var f2 = new Fn;
console.log(f1.getX === f2.getX);//=> f
console.log(f1.getY === f2.getY);//=> t
console.log(f1.__proto__.getY === Fn.prototype.getY);//=> t
console.log(f1.__proto__.getX === f2.getX);//=> f
console.log(f1.getX === Fn.prototype.getX);//=> f
console.log(f1.constructor);//=> Fn
console.log(Fn.prototype.__proto__.constructor);//=> Object
f1.getX();//=> this:f1   100
f1.__proto__.getX();//=> this:f1.__proto__   => console.log(f1.__proto__.x) => undefined  (向Object.prototype查找也没有y属性)
f2.getY();//=> this:f2 => console.log(f2.y) => 200
Fn.prototype.getY();//=> this:Fn.prototype => console.log(Fn.prototype.y) => undefined  (向Object.prototype查找也没有y属性)
