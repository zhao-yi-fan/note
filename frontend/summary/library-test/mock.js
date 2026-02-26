const Mock = require('mockjs');
const str = Mock.mock({
  "code": 0,
  "message": "成功",
  "data|5": [
    {
      "id": "@id",
      "title": "@csentence",
      "url":"@url",
      // "image":"@image('200x100)' '#894FC4', '#FFF', 'png', '!'",
      "createAt": "@datetime"
    }
  ]
})

console.log(str);