const net = require('net')
const parseString = require('xml2js').parseString
const penguin = require('../../penguin.js')
const handleCommands = require('../../plugins/commands.js')
const Room = require('../../room.js')
// const igloo = require('../world/igloo.js')
const database = require('../../database/database.js')
const database_manager = require('../../database/database_manager.js')
const errors = require('../../errors.js')
const worlds = require('../../../connections/worlds.json')

let penguinsOnline = []
let getDatabase = new database_manager()

const server = net.createServer(function(connection) {
    let client = new penguin(connection)
    console.log(connection)
    let commands = new handleCommands()
    let roomSystem = new Room()
    // let handleIgloo = new igloo()
    penguinsOnline.push(connection)
    console.log(`[Info] Penguin connected to the world server || Their are currently ${penguinsOnline.length} penguin's online`)

    connection.on('end', function() {
        penguinsOnline.splice(penguinsOnline.indexOf(connection), 1)
        console.log(`[Info] Penguin disconnected to the world server || Their are currently ${penguinsOnline.length} penguin's online`)
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
                if(data1.indexOf("xt") >= 0) { // checks to see if packet contains XT 
                    console.log(`[Info] INCOMING XT: ${data1}`)
                }

                if(data1.indexOf("j#jr") >= 0) { // jadd user to room
                    roomSystem.addUser(data1, client, roomSystem)
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

                if(data1.indexOf("!playersonline") >= 0) { // players online command
                    commands.playersOnline(data1, client, penguinsOnline.length)
                }

                if(data1.indexOf("!ai") >= 0) { // add item + ai command
                    commands.addItem(data1, client)
                }

                if(data1.indexOf("!ac") >= 0) { // add coins command
                    commands.coins(data1, client)
                }

                if(data1.indexOf("!jr") >= 0) { // join room command
                    commands.joinRoom(data1, client)
                }

                if(data1.indexOf("g#gm") >= 0) { // get player igloo
                    handleIgloo.handleGetIgloo(data1, client)
                }
                
                client.heartBeat(client) // penguins heartbeat
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
            getDatabase.getPenguinTable(username, 'username').then(exists => {
                if(exists.length >= 1) {
                    let loginKey = exists[0].LoginKey
                    if(loginKey === "") {
                        client.disconnect()
                    } else {
                        if(key === loginKey) {
                            client.joinServer(exists[0], client)
                        } else {
                            client.send_error(INCORRECT_PASSWORD)
                        }
                    }
                }
            })
        }
    })
}