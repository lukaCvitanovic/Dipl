var http = require('http')
var fs = require('fs')

http.createServer((req, res) => {
    console.log("listening on port 9050")
    /*
    var readStream = fs.createReadStream('./gen/moj.css')
    readStream.pipe(res)
    readStream.pause()
    setTimeout(() => {
        readStream.resume()
    }, 2000)*/
}).listen(9050)