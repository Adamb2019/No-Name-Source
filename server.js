const net = require('net')
const worlds = require('./connections/worlds.json')

if(worlds.login.port.length === "") {
    console.log('No login port provided')
}

if(worlds.world.port === "") {
    console.log('No world port provided')
}

// const server = net.createServer(function(connection) {
//     console.log('client connected')
//     connection.on('end', function() {
//         console.log('client disconnected')
//     })

//     connection.on('data', function(data) {
//         console.log(data.toString())
//         if(data === '<policy-file-request/>') {
//             data.send()
//         }
//     })
// });

// server.listen(6112, function() {
//     console.log('server listening on port 6112')
// });