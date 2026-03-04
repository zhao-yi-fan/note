let ejs = require('ejs');
let fs = require('fs');


let users = ['geddy', 'neil', 'alex'];
const str = '<p>[?= users.join(" | "); ?]</p>'
const result1 = ejs.render(str, { users: users },
  {
    delimiter: '?', openDelimiter: '[', closeDelimiter: ']'
  }, function (err, str) {
    console.log(err);
    console.log(str);
  });
console.log(result1);



let html = fs.readFileSync('./1.ejs-template.html').toString();
const result2 = ejs.render(html, { users: users });

console.log(result2);