// 启动一个TCP协议的服务器 模拟握手
// 复用了HTTP的过程
let net = require('net')
const CODE = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
let crypto = require('crypto');
let server = net.createServer(function (socket) {
  // once来自于EventEmitter
  // on 每次都会执行
  // once 只会执行一次
  socket.once('data', function (data) {
    data = data.toString();
    if (data.match(/Connection: Upgrade/)) {
      let rows = data.split('\r\n'); // 拆分成数组
      rows = rows.slice(1, -2); // 数组截取
      let headers = {};
      rows.reduce((memo, item) => {
        let [key, value] = item.split(': '); // 数组中的每一项都有: 冒号空格，将其前后拆分成key,value
        memo[key] = value;
        return memo;
      }, headers)
      console.log(headers);
      if (headers['Sec-WebSocket-Version'] == '13') {
        let SecWebSocketKey = headers['Sec-WebSocket-Key'];
        let SecWebSocketAccept = crypto.createHash('sha1').update(SecWebSocketKey + CODE).digest('base64');
        let response = [
          'HTTP/1.1 101 Switching Protocols',
          'Upgrade: websocket',
          'Connection: Upgrade',
          `Sec-WebSocket-Accept: ${SecWebSocketAccept}`,
          '\r\n'
        ].join('\r\n'); // 响应字符串
        socket.write(response);
        // 后面所有的格式都是基于websocket协议的
        socket.on('data', function (buffers) { // data默认是一个Buffer
          let fin = buffers[0] & 0b10000000 == 0b10000000; // 结束位是true还是false
          let opcode = buffers[0] & 0b00001111; // 操作码
          let isMask = buffers[1] & 010000000 == 0b10000000; // 是否进行了掩码
          let payloadLength = buffers[1] & 0b0111111; // 后七位全是1
          let mask = buffers.slice(2, 6); // 掩码键
          let payload = buffers.slice(6); // 携带的真实数据
          unmask(payload, mask); // 对数据进行反掩码
          // payload = [h,e,l,l,o]
          let response = Buffer.alloc(2 + payloadLength);
          response[0] = 0b10000000 | opcode;
          response[1] = payloadLength;
          payload.copy(response, 2);
          console.log(response);
          socket.write(response);
        })
      }
    }
  })
});
function unmask (payload, mask) {
  for (let i = 0; i < payload.length; i++) {
    payload[i] ^= mask[i % 4];
  }
}
server.listen(9999);


/*
【请求行】
GET ws://localhost:8888/ HTTP/1.1 \r\n
【请求头】
Connection: Upgrade\r\n
Upgrade: websocket\r\n
Sec-WebSocket-Version: 13\r\n
Sec-WebSocket-Key: nkn9FKfNeUAg/SCLsFaD+w==\r\n
\r\n
【无请求体】：因为没有请求体 有两个空行就结束了
 */
/*
【响应行】
HTTP/1.1 101 Switching Protocols\r\n
【响应头】
Upgrade: websocket\r\n
Connection: Upgrade\r\n
Sec-WebSocket-Accept: knnYRiRuQnwyP6A12QAMUeE1Pvc=\r\n
【无响应体】
*/

