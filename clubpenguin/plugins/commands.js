const fs = require('fs')
const database = require('../database/database.js')
const database_manager = require('../database/database_manager.js')
const items = require('../handlers/crumbs/items.json')
const rooms = require('../handlers/crumbs/rooms.json')

let getDatabase = new database_manager()

let prefix = "!"

class handleCommands {
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

    addItem(data, client) {
        let data1 = data.split('%')
        let itemID = data1[6].substr(4)
        let findItem = items.find(item => item.Paper_Item_Id == itemID)
        try {
            if(client.moderator === '1') {
                if(findItem) {
                    let itemAmount = findItem.Cost
                    if(client.coins < itemAmount) {
                        client.send_error(NOT_ENOUGH_COINS)
                    } else {
                        getDatabase.getInventoryTable(itemID, 'ItemID').then(exists => {
                            if(exists >= 1) {
                                let username = exists[0].Username
                                if(username === client.username.toString()) {
                                    client.send_error(400)
                                    return false
                                }
                            } else {
                                client.removeCoins(client, itemAmount)
                                fs.appendFile('./clubpenguin/logs/commands.txt', `${client.username} used the command ${prefix}ai\n`, function(err) {
                                    if(err) {
                                      console.log(err)
                                    }
                                })
                                fs.appendFile('./clubpenguin/logs/items.txt', `${client.username} has added item ${itemID} (${findItem.Label})\n`, function(err) {
                                    if(err) {
                                        console.log(err)
                                    }
                                })
                                database.query(`INSERT INTO inventory (PenguinID, Username, ItemID) VALUES ('${client.id}', '${client.username}', '${itemID}')`)
                                client.send_xt('ai', -1, itemID, client.coins)
                            }
                        })
                    }
                } else {
                    return client.send_error(ITEM_DOES_NOT_EXIST)
                }
            } else {
                fs.appendFile('./clubpenguin/logs/commands.txt', `${client.username} tried to use the command ${prefix}ai while the penguin is not a moderator\n`, function(err) {
                    if(err) {
                      console.log(err)
                    }
                })
                return false
            }
        } catch {
            console.log(`oooooof an error has happened`)
        }
    }

    coins(data, client) { // end game prompt just not working ill fix s00n
        let data1 = data.split('%')
        let coinAmount = data1[6].substr(4)
        console.log(coinAmount)

        if(client.moderator === '1') {
            if(coinAmount > 9999) {
                client.send_xt('mm', -1, `${coinAmount} is to many coins`)
            } else {
                if(isNaN(coinAmount)) {
                    client.send_xt('mm', -1, `Please enter how many coins you want to add`)
                } else {
                    if(coinAmount <= 0) {
                        client.send_xt('mm', -1, `You need to enter a number higher then 0`)
                    } else {
                        fs.appendFile('./clubpenguin/logs/commands.txt', `${client.username} used the command ${prefix}ac\n`, function(err) {
                            if(err) {
                              console.log(err)
                            }
                        })
                        fs.appendFile('./clubpenguin/logs/coins.txt', `${client.username} has earned ${coinAmount} coins\n`, function(err) {
                            if(err) {
                              console.log(err)
                            }
                        })
                        client.addCoins(client, coinAmount)
                        client.send_xt('zo', -1, coinAmount, '', 0, 0, 0)
                    }
                }
            }
        } else {
            fs.appendFile('./clubpenguin/logs/commands.txt', `${client.username} tried to use the command ${prefix}ac while the penguin is not a moderator\n`, function(err) {
                if(err) {
                  console.log(err)
                }
            })
            return false
        }
    }

    joinRoom(data, client) {
        let data1 = data.split('%')
        let roomID = data1[6].substr(4)
        let penguinID = data1[5]

        getDatabase.getPenguinTable(penguinID, 'ID').then(exists => {
            if(client.moderator === '1') {
                fs.appendFile('./clubpenguin/logs/commands.txt', `${client.username} used the command ${prefix}jr\n`, function(err) {
                    if(err) {
                      console.log(err)
                    }
                })
                for(let index in rooms) {
                    let roomName = rooms[index][roomID]['Short_Room_Name']
                    fs.appendFile('./clubpenguin/logs/rooms.txt', `${client.username} has joined room ${roomName} (${roomID})\n`, function(err) {
                        if(err) {
                          console.log(err)
                        }
                    })
                }
                client.send_xt('jr', -1, roomID, client.playerString(exists[0]))
            } else {
                fs.appendFile('./clubpenguin/logs/commands.txt', `${client.username} tried to use the command ${prefix}jr while the penguin is not a moderator\n`, function(err) {
                    if(err) {
                      console.log(err)
                    }
                })
                return false
            }
        })
    }
}

console.log('[Server] Loaded command plugin')

module.exports = handleCommands