const net = require('net')
const parseString = require('xml2js').parseString
const database = require('../../database/database.js')
const database_manager = require('../../database/database_manager.js')
const bcrypt = require('bcrypt')
const fetch = require('node-fetch')
const penguin = require('../../penguin.js')
const crypto = require('../../crypto.js')
const generateKey = require('../../crypto.js')
const worlds = require('../../../connections/worlds.json')
const errors = require('../../errors.js')

let getDatabase = new database_manager()
let penguinsOnline = []

const server = net.createServer(function(connection) {
    let client = new penguin(connection)
    penguinsOnline.push(connection)
    console.log(`[Info] Penguin connected to the login server || Their are currently ${penguinsOnline.length} penguin's online`)

    connection.on('end', function() {
        penguinsOnline.splice(penguinsOnline.indexOf(connection), 1)
        console.log(`[Info] Penguin disconnected to the login server || Their are currently ${penguinsOnline.length} penguin's online`)
    })

    connection.on('data', function(data) {
        let data1 = data.toString().split('\0')[0]
        if(policy(data1)) {
            client.send_xml('<cross-domain-policy><allow-access-from domain="*.localhost" to-ports="*" /></cross-domain-policy>')
        } else {
            if(verChk(data1)) {
                client.send_xml('<msg t="sys"><body action="apiOK" r="0"></body></msg>')
            } else {
                if(rndK(data1)) {
                    client.send_xml('<msg t="sys"><body action="rndK" r="-1"><k>nodeJS</k></body></msg>')
                } else {
                    login(data1, client)
                }
            }
        }
    })
})

server.listen(worlds.login.port, function() {
    console.log('[Server] Login server listening on port 6112')
});

function policy(data) {
    if(data === '<policy-file-request/>') {
        console.log(`[Info] INCOMING XML: ${data}`)
        return true
    }
}

function verChk(data) {
    if(data === "<msg t='sys'><body action='verChk' r='0'><ver v='153' /></body></msg>") {
        console.log(`[Info] INCOMING XML: ${data}`)
        return true
    }
}

function rndK(data) {
    if(data === "<msg t='sys'><body action='rndK' r='-1'></body></msg>") {
        console.log(`[Info] INCOMING XML: ${data}`)
        return true
    }
}

function login(data, client) {
    parseString(data, function (err, result) {
        if(result) {
            console.log(`[Info] INCOMING XML: ${data}`)
            let generate = new crypto()
            let username = result.msg.body[0].login[0].nick[0].toLowerCase()
            let password = result.msg.body[0].login[0].pword[0]
            let randomKey = generate.randomkey()
            getDatabase.getPenguinTable(username, 'username').then(async exists => {
                if(exists.length < 1) {
                    console.log(`${username} failed to login as username doesnt exist`)
                    return client.send_error(USERNAME_NOT_FOUND)
                }

                let pass = exists[0].Password
                let id = exists[0].ID
                let compare = await bcrypt.compare(password, pass)
                if(compare === false) {
                    console.log(`${username} failed to login as password doesnt match`)
                    return client.send_error(INCORRECT_PASSWORD)
                }

                if(exists[0].Active === '0') {
                    return client.send_error(ACCOUNT_NOT_ACTIVATED)
                }

                if(exists[0].PermaBan === '1') {
                    return client.send_error(BAN_FOREVER)
                }

                fetch('https://api.ipify.org?format=json')
                .then(res => res.json())
                .then(json => {
                    getDatabase.getIPBansTable(json.ip, 'IPAddress').then(exists1 => {
                        if(exists1.length >= 1) {
                            return client.disconnect()
                        }

                        getDatabase.updatePenguinTable(randomKey, 'LoginKey', 'username', username).then(exists2 => {
                            if(exists2) {
                                getDatabase.getPenguinTable(username, 'username').then(exists3 => {
                                    if(exists3.length >= 1) {
                                        let loginKey = exists3[0].LoginKey
                                        database.query(`INSERT INTO Login (PenguinID, Username, IPAddress) VALUES ('${exists3[0].ID}', '${exists3[0].Username}', '${json.ip}')`)
                                        return client.send_xt('l', -1, id, loginKey, '', '100,5')
                                    }
                                })
                            }
                        })
                    })
                })
            })
        }
    })
}

