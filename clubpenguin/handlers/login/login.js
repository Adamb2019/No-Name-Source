const net = require('net')
const parseString = require('xml2js').parseString
const database = require('../../database/database.js')
const bcrypt = require('bcrypt')
const penguin = require('../../penguin.js')
const worlds = require('../../../connections/worlds.json')

const server = net.createServer(function(connection) {
    let client = new penguin(connection)
    console.log('Client connected to login server')

    connection.on('end', function() {
        console.log('Client disconnected from login server')
    })

    connection.on('data', function(data) {
        let data1 = data.toString().split('\0')[0]
        if(policy(data1)) {
            connection.write('<cross-domain-policy><allow-access-from domain="*.localhost" to-ports="*" /></cross-domain-policy>' + '\0')
        } else {
            if(verChk(data1)) {
                connection.write('<msg t="sys"><body action="apiOK" r="0"></body></msg>' + '\0')
            } else {
                if(rndK(data1)) {
                    connection.write('<msg t="sys"><body action="rndK" r="-1"><k>{0}</k></body></msg>' + '\0')
                } else {
                    login(data1)
                }
            }
        }

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

        function login(data) {
            parseString(data, function (err, result) {
                if(result) {
                    let username = result.msg.body[0].login[0].nick[0]
                    let password = result.msg.body[0].login[0].pword[0]

                    database.query(`SELECT * FROM penguins WHERE username = '${username}'`, function(err, results) {
                        if(results.length < 1) {
                            // connection.write('e', -1, 150)
                        }
                    })
                }
            })
        }
    })
});

server.listen(worlds.login.port, function() {
    console.log('login server listening on port 6112')
});

