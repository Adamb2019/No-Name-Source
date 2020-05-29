const net = require('net')

const server = net.createServer(function(connection) {
    console.log('Client connected to login server')

    connection.on('end', function() {
        console.log('Client disconnected from login server')
    })

    connection.on('data', function(data) {
        console.log(data.toString())
        if(data.toString() === '<policy-file-request/>') {
            data.write('<cross-domain-policy><allow-access-from domain="localhost" to-ports="*" /></cross-domain-policy>')   
            console.log('sent')
        } else {
            console.log('not the same')
        }
    })
});

server.listen(6112, function() {
    console.log('login server listening on port 6112')
});