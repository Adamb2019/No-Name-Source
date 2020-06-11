const fs = require('fs')

let prefix = "!"

class handlePlayersOnline {
    playersOnline(data, client, online) {
        let data1 = data.split('%')
        let msgContent = data1[6].toLowerCase()
        
        if(msgContent === `${prefix}playersonline` && client.moderator === '1') {
            fs.appendFile('./clubpenguin/logs/commands.txt', `${client.username} used the command ${prefix}playersOnline\n`, function(err) {
                if(err) {
                  console.log(err)
                }
            })
            client.send_xt('mm', -1, `There are currently ${online} penguin's online`)
        } else {
            fs.appendFile('./clubpenguin/logs/commands.txt', `${client.username} tried to use the command ${prefix}playersOnline while the penguin is not a moderator\n`, function(err) {
                if(err) {
                  console.log(err)
                }
            })
            return false
        }
    }
}

module.exports = handlePlayersOnline