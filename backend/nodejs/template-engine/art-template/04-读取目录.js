var fs = require('fs')

fs.readdir('C:/Users/99344/Desktop/2018web/听课/14.node/day02/www', function(err, files){
    if (err) {
        return console.log('目录不存在');
        
    }
    console.log(files);
    
})