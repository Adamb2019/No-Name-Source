const net = require('net')
const parseString = require('xml2js').parseString
const penguin = require('../../penguin.js')
const database = require('../../database/database.js')
const errors = require('../../errors.js')
const worlds = require('../../../connections/worlds.json')

let playersOnline = []

const server = net.createServer(function(connection) {
    let client = new penguin(connection)
    playersOnline.push(connection)
    console.log('Penguin connected to world server')

    connection.on('end', function() {
        playersOnline.splice(playersOnline.indexOf(connection), 1)
        console.log('Penguin disconnected from world server')
    })

    connection.on('data', function(data) {
        let data1 = data.toString().split('\0')[0]
        if(verChk(data1)) {
            client.send_xml('<msg t="sys"><body action="apiOK" r="0"></body></msg>')
        } else {
            if(rndK(data1)) {
                client.send_xml('<msg t="sys"><body action="rndK" r="-1"><k>nodeJS</k></body></msg>')
            } else {
                login(data1, client)
            }
        }
    })
});

server.listen(worlds.world.port, function() {
    console.log('world server listening on port 9875')
});

function verChk(data) {
    if(data === "<msg t='sys'><body action='verChk' r='0'><ver v='153' /></body></msg>") {
        console.log(`Received ${data}`)
        return true
    }
}

function rndK(data) {
    if(data === "<msg t='sys'><body action='rndK' r='-1'></body></msg>") {
        console.log(`Received ${data}`)
        return true
    }
}

function login(data, client) {
    parseString(data, function (err, result) {
        if(result) {
            let username = result.msg.body[0].login[0].nick[0].toLowerCase()
            let password = result.msg.body[0].login[0].pword[0]
            let key = password.substr(32)
            database.query(`SELECT * FROM penguins WHERE username = '${username}'`, async function(err, results) {
                let loginKey = results[0].LoginKey
                if(results[0].LoginKey === "") {
                    client.disconnect()
                } else {
                    if(key === loginKey) {
                        client.send_xt('l')
                        client.send_xt('js', -1, 0, 1)
                        client.send_xt('gps', -1, '')
                        client.send_xt('lp', -1, client.playerString(results[0]))
                    } else {
                        client.send_error(INCORRECT_PASSWORD)
                    }
                }
            })
        }
    })
}