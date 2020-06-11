const fs = require('fs')
const addItem = require('../handlers/world/commands/addItem.js')
const handlePlayersOnline = require('../handlers/world/commands/playersOnline.js')

let playersOnline = new handlePlayersOnline()
let addItemCommand = new addItem()

let prefix = "!"

class handleCommands {
    online(data, client, online) { // players online
        playersOnline.playersOnline(data, client, online)
    }

    addItem(data, client) {
        if(!client.moderator === '1' && !client.username === 'Adam'
        && !client.username === 'Adam1') {
            return false
        } else {
            addItemCommand.item(data, client)
        }
    }
}

module.exports = handleCommands