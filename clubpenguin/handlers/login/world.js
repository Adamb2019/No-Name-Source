const net = require('net')
const parseString = require('xml2js').parseString
const penguin = require('../../penguin.js')
const database = require('../../database/database.js')
const errors = require('../../errors.js')
const worlds = require('../../../connections/worlds.json')

let penguinsOnline = []

const server = net.createServer(function(connection) {
    let client = new penguin(connection)
    penguinsOnline.push(connection)
    console.log(connection)
    console.log(`Penguin connected to the world server || Their are currently ${penguinsOnline.length} penguin's online`)

    // if(worlds.world.moderator === true && !client.moderator) {
    //     console.log('Penguin trying to connect to a moderator server destorying socket')
    //     client.disconnect()
    // }

    connection.on('end', function() {
        penguinsOnline.splice(penguinsOnline.indexOf(connection), 1)
        console.log(`Penguin disconnected to the world server || Their are currently ${penguinsOnline.length} penguin's online`)
    })

    connection.on('data', async function(data) {
        let data1 = data.toString().split('\0')[0]
        if(verChk(data1)) {
            client.send_xml('<msg t="sys"><body action="apiOK" r="0"></body></msg>')
        } else {
            if(rndK(data1)) {
                client.send_xml('<msg t="sys"><body action="rndK" r="-1"><k>nodeJS</k></body></msg>')
            } else {
                login(data1, client)
                console.log(data1)
                if(data1.indexOf("j#jr") >= 0) { // join room
                    client.doesRoomExist(data1, client)
                }

                if(data1.indexOf("i#ai") >= 0) { // if player is adding an item
                    client.addItem(data1, client)
                }
            }
        }
    })
});

server.listen(worlds.world.port, function() {
    console.log('[Server] World server listening on port 9875')
});

function verChk(data) {
    if(data === "<msg t='sys'><body action='verChk' r='0'><ver v='153' /></body></msg>") {
        return true
    }
}

function rndK(data) {
    if(data === "<msg t='sys'><body action='rndK' r='-1'></body></msg>") {
        return true
    }
}

function login(data, client) {
    parseString(data, async function (err, result) {
        if(result) {
            let username = result.msg.body[0].login[0].nick[0]
            let nickname = result.msg.body[0].login[0].nick[0].toLowerCase()
            let password = result.msg.body[0].login[0].pword[0]
            let key = password.substr(32)
            database.query(`SELECT * FROM penguins WHERE nickname = '${nickname}'`, function(err, results) {
                database.query(`SELECT * FROM inventory WHERE username = '${username}'`, async function(err, results1) {
                    let loginKey = results[0].LoginKey
                    if(results[0].LoginKey === "") {
                        client.disconnect()
                    } else {
                        if(key === loginKey) {
                           await client.joinServer(results[0], client, results1[0])
                        } else {
                            client.send_error(INCORRECT_PASSWORD)
                    }
                }
                })
            })
        }

    })
}