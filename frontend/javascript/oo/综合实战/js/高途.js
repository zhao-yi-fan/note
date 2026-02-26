// 第二题
function Company() {
  var instance = {
    name: 'a1',
    getName() {
      console.log(this.name);
    },
    getName1: () => {
      console.log(this.name);
    }
  };
  this.name = 'a2';
  this.getName2 = function () {
    console.log(this.name);
  }
  return instance;
}
Company.prototype.name = 'a3';
Company.prototype.getName2 = function () {
  console.log(this.name);
}
var company = new Company();
company.getName();
company.getName1();
company.getName2();

以上代码打印结果为： a2 a2 a2
// 正确答案 a1 a2 Uncaught TypeError: company.getName2 is not a function