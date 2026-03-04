let key = 'nkn9FKfNeUAg/SCLsFaD+w==';
let accept = 'knnYRiRuQnwyP6A12QAMUeE1Pvc=';
const CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
let crypto = require('crypto');
let result = crypto.createHash('sha1').update(key + CODE).digest('base64');
console.log(result);


