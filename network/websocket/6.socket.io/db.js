let mongoose = require('mongoose');
let conn = mongoose.createConnection('mongodb://localhost/chat', { useNewUrlParser: true, useUnifiedTopology: true }); // 端口号不写默认27017
let MessageSchema = new mongoose.Schema({
  username: String,
  content: String,
  createAt: { type: Date, default: Date.now }
});
let Message = conn.model('Message', MessageSchema);
module.exports = { Message }