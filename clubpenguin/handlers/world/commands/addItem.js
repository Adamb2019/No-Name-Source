const fs = require('fs')
const database = require('../../../database/database.js')
const items = require('../../crumbs/items.json')

class addItem {
    // item(data, client) {
    //     let data1 = data.split('%')
    //     let itemID = data1[6].substr(4)
    //     console.log(itemID)
    //     let findItem = items.find(item => item.Paper_Item_Id == itemID)
    //     let itemAmount = findItem.Cost
    //     if(findItem) {
    //         if(client.coins < itemAmount) {
    //             client.send_error(NOT_ENOUGH_COINS)
    //         } else {
    //             database.query(`SELECT * FROM inventory WHERE username = '${client.username}'`, function(err, results) {
    //                 Object.keys(results).forEach(function (item) {
    //                     let items = results[item].ItemID
    //                     if(items === itemID) {
    //                         client.send_error(ALREADY_OWNS_INVENTORY_ITEM)
    //                     }
    //                 })
    //             })
    //             client.removeCoins(client, itemAmount)
    //             fs.appendFile('./clubpenguin/logs/items.txt', `${client.username} has added item ${itemID} (${findItem.Label})\n`, function(err) {
    //                 if(err) {
    //                     console.log(err)
    //                 }
    //             })
    //             database.query(`INSERT INTO inventory (PenguinID, Username, ItemID) VALUES ('${client.id}', '${client.username}', '${itemID}')`)
    //             return client.send_xt('ai', -1, itemID, client.coins)
    //         }
    //            }
    //         } else {
    //             return client.send_error(ITEM_DOES_NOT_EXIST)
    //         }
    //     }
    // }
    item(data, client) {
        let data1 = data.split('%')
        let itemID = data1[6].substr(4)
        let findItem = items.find(item => item.Paper_Item_Id == itemID)
        let itemAmount = findItem.Cost
        try {
            if(client.moderator === '1') {
                if(findItem) {
                    if(client.coins < itemAmount) {
                        client.send_error(NOT_ENOUGH_COINS)
                    } else {
                        database.query(`SELECT * FROM inventory WHERE username = '${client.username}'`, function(err, results) {
                            Object.keys(results).forEach(function (item) {
                                let items = results[item].ItemID
                                if(items === itemID) {
                                    client.send_error(ALREADY_OWNS_INVENTORY_ITEM)
                               }
                            })
                        })
                        client.removeCoins(client, itemAmount)
                        fs.appendFile('./clubpenguin/logs/items.txt', `${client.username} has added item ${itemID} (${findItem.Label})\n`, function(err) {
                            if(err) {
                                console.log(err)
                            }
                        })
                        database.query(`INSERT INTO inventory (PenguinID, Username, ItemID) VALUES ('${client.id}', '${client.username}', '${itemID}')`)
                        return client.send_xt('ai', -1, itemID, client.coins)
                    }
                } else {
                    return client.send_error(ITEM_DOES_NOT_EXIST)
                }
            } else {
                fs.appendFile('./clubpenguin/logs/items.txt', `${client.username} tried to add item ${itemID} (${findItem.Label}) while the penguin is not a moderator\n`, function(err) {
                    if(err) {
                        console.log(err)
                    }
                })
                console.log(`${client.username} tried to add an item while not being a moderator`)
            }
        } catch {
            console.log(`oooooof an error has happened`)
        }
    }
    //     if(client.moderator === '1') {
    //         let data1 = data.split('%')
    //         let itemID = data1[6].substr(4)
    //         let findItem = items.find(item => item.Paper_Item_Id == itemID)
    //         let itemAmount = findItem.Cost

    //         if(findItem) {
    //             if(client.coins < itemAmount) {
    //                 client.send_error(NOT_ENOUGH_COINS)
    //             } else {
    //                 database.query(`SELECT * FROM inventory WHERE username = '${client.username}'`, function(err, results) {
    //                     Object.keys(results).forEach(function (item) {
    //                         let items = results[item].ItemID
    //                         if(items === itemID) {
    //                             client.send_error(ALREADY_OWNS_INVENTORY_ITEM)
    //                        }
    //                     })
    //                 })
    //                 client.removeCoins(client, itemAmount)
    //                 fs.appendFile('./clubpenguin/logs/items.txt', `${client.username} has added item ${itemID} (${findItem.Label})\n`, function(err) {
    //                     if(err) {
    //                         console.log(err)
    //                     }
    //                 })
    //                 database.query(`INSERT INTO inventory (PenguinID, Username, ItemID) VALUES ('${client.id}', '${client.username}', '${itemID}')`)
    //                 return client.send_xt('ai', -1, itemID, client.coins)
    //             }
    //         } else {
    //             return client.send_error(ITEM_DOES_NOT_EXIST)
    //         }
    //     } else {
    //         fs.appendFile('./clubpenguin/logs/items.txt', `${client.username} tried to add item ${itemID} (${findItem.Label}) while the penguin is not a moderator\n`, function(err) {
    //             if(err) {
    //                 console.log(err)
    //             }
    //         })
    //         return false
    //     }
    // }
}

module.exports = addItem