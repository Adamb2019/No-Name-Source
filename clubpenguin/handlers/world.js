const net = require('net')

const server = net.createServer(function(connection) {
    console.log('Client connected to world server')

    connection.on('end', function() {
        console.log('Client disconnected from world server')
    })
});

server.listen(9875, function() {
    console.log('world server listening on port 9875')
});