const net = require('net')
const parseString = require('xml2js').parseString
const penguin = require('../../penguin.js')
const errros = require('../../errors.js')
const database = require('../../database/database.js')
const connections = require('../../../connections/worlds.json')

const server = net.createServer(function(connection) {
    let client = new penguin(connection)
    console.log('Penguin connected to redemption server')

    connection.on('end', function() {
        console.log('Penguin disconnected from redemption server')
    })

    connection.on('data', function(data) {
        let data1 = data.toString().split('\0')[0]
        console.log(`received ${data1}`)
        if(verChk(data1)) {
            client.send_xml('<msg t="sys"><body action="apiOK" r="0"></body></msg>')
        } else {
            if(rndK(data1)) {
                client.send_xml('<msg t="sys"><body action="rndK" r="-1"><k>nodeJS</k></body></msg>')
            } else {
                accessRedemption(data1, client)
            }
        }
    })
});

server.listen(connections.redemption.port, function() {
    console.log('redemption server listening on port 9000')
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

function accessRedemption(data, client) {
    parseString(data, function (err, result) {
        if(result) {
            let username = result.msg.body[0].login[0].nick[0].toLowerCase()
            let password = result.msg.body[0].login[0].pword[0]
            let key = password.substr(32)
            console.log(key)
            database.query(`SELECT * FROM penguins WHERE username = '${username}'`, async function(err, results) {
                let loginKey = results[0].LoginKey
                console.log(loginKey)
                if(key !== loginKey) {
                    database.query(`UPDATE penguins SET LoginKey = '' where Username = '${username}'`)
                    client.disconnect()
                    console.log('didnt match')
                } else {
                    if(loginKey === "") {
                        client.disconnect()
                        console.log('empty')
                    } else {
                        client.send_xt('rjs')
                        console.log('worked')
                    }
                }
            })
        }
    })
}
