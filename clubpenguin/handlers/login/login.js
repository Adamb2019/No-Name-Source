const net = require('net')
const parseString = require('xml2js').parseString
const database = require('../../database/database.js')
const bcrypt = require('bcrypt')
const penguin = require('../../penguin.js')
const crypto = require('../../crypto.js')
const generateKey = require('../../crypto.js')
const worlds = require('../../../connections/worlds.json')
const errors = require('../../errors.js')

const server = net.createServer(function(connection) {
    let client = new penguin(connection)
    console.log('Penguin connected to login server')

    connection.on('end', function() {
        console.log('Penguin disconnected from login server')
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
    console.log('login server listening on port 6112')
});

function policy(data) {
    if(data === '<policy-file-request/>') {
        console.log(`Recieved ${data}`)
        return true
    }
}

function verChk(data) {
    if(data === "<msg t='sys'><body action='verChk' r='0'><ver v='153' /></body></msg>") {
        console.log(`Recieved ${data}`)
        return true
    }
}

function rndK(data) {
    if(data === "<msg t='sys'><body action='rndK' r='-1'></body></msg>") {
        console.log(`Recieved ${data}`)
        return true
    }
}

function login(data, client) {
    parseString(data, function (err, result) {
        if(result) {
            let generate = new crypto()
            let username = result.msg.body[0].login[0].nick[0].toLowerCase()
            let password = result.msg.body[0].login[0].pword[0]
            let randomKey = generate.randomkey()

            database.query(`SELECT * FROM penguins WHERE username = '${username}'`, async function(err, results) {
                if(results.length < 1) {
                    console.log(`${username} failed to login as username doesnt exist`)
                    client.send_error(USERNAME_NOT_FOUND)
                } else {
                    let pass = results[0].Password
                    let id = results[0].ID
                    let compare = await bcrypt.compare(password, pass)
                    if(compare === false) {
                        console.log(`${username} failed to login as password doesnt match`)
                        client.send_error(INCORRECT_PASSWORD)
                    } else {
                        database.query(`UPDATE penguins SET LoginKey = '${randomKey}' WHERE Username = '${username}'`)
                        database.query(`SELECT * FROM penguins WHERE username = '${username}'`, async function(err, results1) {
                            let loginKey = results1[0].LoginKey
                            console.log(loginKey)
                            console.log('Key updated')
                            client.send_xt('l', -1, id, loginKey, '', '100,5')
                        })
                    }
                }
            })
        }
    })
}
