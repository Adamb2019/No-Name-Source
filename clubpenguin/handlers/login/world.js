const net = require('net')
const penguin = require('../../penguin.js')
const worlds = require('../../../connections/worlds.json')

// cant connect to a world server needs fixing

const server = net.createServer(function(connection) {
    let client = new penguin(connection)
    console.log('Client connected to world server')

    connection.on('end', function() {
        console.log('Client disconnected from world server')
    })

    connection.on('data', function(data) {
        console.log(data.toString())
    })
});

server.listen(worlds.world.port, function() {
    console.log('world server listening on port 9875')
});