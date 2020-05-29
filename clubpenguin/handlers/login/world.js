const net = require('net')
const worlds = require('../../connections/worlds.json')

const server = net.createServer(function(connection) {
    console.log('Client connected to world server')

    connection.on('end', function() {
        console.log('Client disconnected from world server')
    })
});

server.listen(worlds.world.port, function() {
    console.log('world server listening on port 9875')
});