const net = require('net')
const parseString = require('xml2js').parseString
const penguin = require('../../penguin.js')
const code = require('./code.js')
const errros = require('../../errors.js')
const database = require('../../database/database.js')
const database_manager = require('../../database/database_manager.js')
const connections = require('../../../connections/worlds.json')

let getDatabase = new database_manager()

const server = net.createServer(function(connection) {
    let client = new penguin(connection)
    let redeemCode = new code()
    console.log(client.username)
    console.log('[Info] Penguin connected to redemption server')

    connection.on('end', function() {
        console.log('[Info] Penguin disconnected from redemption server')
    })

    connection.on('data', function(data) {
        let data1 = data.toString().split('\0')[0]
        console.log(`[Info] INCOMING XML: ${data1}`)
        if(verChk(data1)) {
            client.send_xml('<msg t="sys"><body action="apiOK" r="0"></body></msg>')
            console.log(`OUTGOING XML: <msg t="sys"><body action="apiOK" r="0"></body></msg>`)
        } else {
            if(rndK(data1)) {
                client.send_xml('<msg t="sys"><body action="rndK" r="-1"><k>nodeJS</k></body></msg>')
                console.log(`OUTGOING XML: <msg t="sys"><body action="rndK" r="-1"><k>nodeJS</k></body></msg>`)
            } else {
                accessRedemption(data1, client)
                console.log(data1)
                if(data1.indexOf("rsc") >= 0) {
                    redeemCode.checkCode(data1, client)
                }
            }
        }
    })
});

server.listen(connections.redemption.port, function() {
    console.log('[Server] Redemption server listening on port 9000')
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
            getDatabase.getPenguinTable(username, 'nickname').then(exists => {
                if(exists) {
                    let loginKey = results[0].LoginKey
                    client.send_error(101)
                }  
            })
        }
    })
}

// first book received %xt%red%rgbq%-1%1%
// second book received %xt%red%rgbq%-1%2%
// recieve code %xt%red%rsc%-1%ADDDDDDDDDDDDD%