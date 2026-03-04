//2、用友面试题
//(1)
var fullName = 'language';
var obj = {
    fullName: 'javascript',
    prop: {
        getFullName: function () {
            return this.fullName;
        }
    }
};
console.log(obj.prop.getFullName());// undefined (obj 中的fullName 是属性, 不是变量)
var test = obj.prop.getFullName;
console.log(test());//'language'


//(2)
var name = 'window';
var Tom = {
    name: "Tom",
    show: function () {
        console.log(this.name);
    },
    wait: function () {
        var fun = this.show;
        fun();
    }
};
Tom.wait();// 'window'