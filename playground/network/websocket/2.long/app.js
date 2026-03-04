let express = require('express')
let app = express();

app.use(express.static(__dirname));

app.get('/clock', function (req, res) {
  let $timer = setInterval(() => {
    let date = new Date();
    let seconds = date.getSeconds();
    if (seconds % 5 === 0) {
      res.send(date.toLocaleString())
      clearInterval($timer)
    }
  }, 1000);
})

app.listen(8000, function () {
  console.log('server is running')
})