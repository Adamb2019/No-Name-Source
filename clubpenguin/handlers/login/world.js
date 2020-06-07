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

                if(data1.indexOf("s#upc") >= 0) { // if player is changing color
                    client.updateColor(data1, client)
                }

                if(data1.indexOf("s#uph") >= 0) { // if player is changing head
                    client.updateHead(data1, client)
                }

                if(data1.indexOf("s#upf") >= 0) { // if player is changing face
                    client.updateFace(data1, client)
                }

                if(data1.indexOf("s#upn") >= 0) { // if player is changing neck
                    client.updateNeck(data1, client)
                }

                if(data1.indexOf("s#upb") >= 0) { // if player is changing body
                    client.updateBody(data1, client)
                }

                if(data1.indexOf("s#upa") >= 0) { // if player is changing hand
                    client.updateHand(data1, client)
                }

                if(data1.indexOf("s#upe") >= 0) { // if player is changing feet lmao sounds weird :/
                    client.updateFeet(data1, client)
                }

                if(data1.indexOf("s#upp") >= 0) { // if player is changing background
                    client.updateBackground(data1, client)
                }

                if(data1.indexOf("s#upl") >= 0) { // if player is changing pin
                    client.updatePin(data1, client)
                }

                if(data1.indexOf("z%zo") >= 0) { // end game packet
                    client.gameOver(data1, client)
                }

                client.heartBeat(client)
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
            let username = result.msg.body[0].login[0].nick[0].toLowerCase()
            let password = result.msg.body[0].login[0].pword[0]
            let key = password.substr(32)
            database.query(`SELECT * FROM penguins WHERE Username = '${username}'`, async function(err, results) {
                let loginKey = results[0].LoginKey
                if(results[0].LoginKey === "") {
                    client.disconnect()
                } else {
                    if(key === loginKey) {
                        console.log(data)
                        client.joinServer(results[0], client)
                        console.log(data)
                    } else {
                        client.send_error(INCORRECT_PASSWORD)
                    }
                }
            })
        }
    })
}