const database = require('./database/database.js')
const fs = require('fs')
const database_manager = require('./database/database_manager.js')
const worlds = require('../connections/worlds.json')
const rooms = require('./handlers/crumbs/rooms.json')
const items = require('./handlers/crumbs/items.json')
const Room = require('./room.js')
const rank = require('./plugins/rank.js')
const inventory = require('./handlers/world/inventory.js')

let penguins = {}
let roomSystem = new Room()
let ranking = new rank()
let getInventory = new inventory()
let getDatabase = new database_manager()

class penguin {
  constructor(socket) {
    this.socket = socket
  }

  disconnect() {
    console.log('got destroyed')
    this.socket.destroy()
  }

  send_xml(data) {
    if(this.socket)  {
      this.socket.write(data + '\0')
    }
  }  

  send_xt(...args) {
    let packet = args.join('%')
    console.log(`[Info] OUTGOING XT: ${args}`)
    this.socket.write('%xt%' + packet + '%' + '\0')
  }

  send_error(error) {
    console.log(`[Info] OUTGOING ERROR: ${error}`)
    this.socket.write('%xt%e%-1%' + error + '%' + '\0')
  }

  playerString(result) { // for load player packet
    let playerArray = [ 
    this.id = result.ID,
    this.username = result.Username,
    45,
    this.color = result.Color,
    this.head = result.Head,
    this.face = result.Face,
    this.neck = result.Neck,
    this.body = result.Body,
    this.hand = result.Hand,
    this.feet = result.Feet,
    this.flag = result.Flag,
    this.photo = result.Photo,
    this.x = 0,
    this.y = 0,
    this.frame = 1,
    1, // is member
    this.rank = result.Rank * 146, // membership rank
    this.coins = result.Coins,
    this.age = 182,
    this.moderator = result.Moderator
    ]
    return playerArray.join('|')
  }

  joinServer(data, client) {
    client.send_xt('l')
    client.send_xt('js', -1, 0, 1, data.Moderator)
    // client.send_xt('gps', -1, '') pLayer stamps but rn stamps arent added
    client.send_xt('lp', -1, client.playerString(data), client.coins, 0, 1440, Math.floor(new Date() / 1000), client.age, 1000, 187, "", 7)
    getInventory.sendInventory(client)
    ranking.rankUpdate(client) // rank system
    roomSystem.joinRoomOnLogin(data, client)
  }

  addItem(data, client) {
    let data1 = data.split('%')
    let itemID = data1[5]
    let findItem = items.find(item => item.Paper_Item_Id == itemID)
    let itemAmount = findItem.Cost
    if(findItem) {
      if(client.coins < itemAmount) {
        client.send_error(NOT_ENOUGH_COINS)
      } else {
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
  }

  addCoins(client, amount) {
    let coinsAdd = amount
    let newCoins = +client.coins + coinsAdd
    
    fs.appendFile('./clubpenguin/logs/coins.txt', `${client.username} has earned ${coinsAdd} coins\n`, function(err) {
      if(err) {
        console.log(err)
      }
    })
    // database.query(`UPDATE penguins SET coins = '${newCoins}' WHERE username = '${client.username}'`)
    getDatabase.updatePenguinTable(newCoins, 'coins', 'username', client.username).then(exists => {
      if(exists) {
        client.coins = newCoins
        return newCoins
      }
    })
  } 

  removeCoins(client, amount) {
    let coinsRemove = amount
    let newCoins = client.coins - coinsRemove

    fs.appendFile('./clubpenguin/logs/coins.txt', `${client.username} has removed ${coinsRemove} coins\n`, function(err) {
      if(err) {
        console.log(err)
      }
    })
    getDatabase.updatePenguinTable(newCoins, 'coins', 'username', client.username).then(exists => {
      if(exists) {
        client.coins = newCoins
        return newCoins
      }
    })
  }

  heartBeat(client) {
    return client.send_xt('h', -1)
  }

  updateColor(data, client) {
    let data1 = data.split('%')
    let colorID = data1[5]

    getDatabase.updatePenguinTable(colorID, 'color', 'username', client.username).then(exists => {
      if(exists) {
        client.color = colorID
        return client.send_xt('upc', -1, client.id, colorID)
      }
    })
  }

  updateHead(data, client) {
    let data1 = data.split('%')
    let headID = data1[5]

    getDatabase.updatePenguinTable(headID, 'head', 'username', client.username).then(exists => {
      if(exists) {
        client.head = headID
        return client.send_xt('uph', -1, client.id, headID)
      }
    })
  }

  
  updateFace(data, client) {
    let data1 = data.split('%')
    let faceID = data1[5]

    getDatabase.updatePenguinTable(faceID, 'face', 'username', client.username).then(exists => {
      if(exists) {
        client.face = faceID
        return client.send_xt('upf', -1, client.id, faceID)
      }
    })
  }

  
  updateNeck(data, client) {
    let data1 = data.split('%')
    let neckID = data1[5]

    getDatabase.updatePenguinTable(neckID, 'neck', 'username', client.username).then(exists => {
      if(exists) {
        client.neck = neckID
        return client.send_xt('upn', -1, client.id, neckID)
      }
    })
  }

  
  updateBody(data, client) {
    let data1 = data.split('%')
    let bodyID = data1[5]

    getDatabase.updatePenguinTable(bodyID, 'body', 'username', client.username).then(exists => {
      if(exists) {
        client.body = bodyID
        return client.send_xt('upb', -1, client.id, bodyID)
      }
    })
  }

    
  updateHand(data, client) {
    let data1 = data.split('%')
    let handID = data1[5]

    getDatabase.updatePenguinTable(handID, 'hand', 'username', client.username).then(exists => {
      if(exists) {
        client.hand = handID
        return client.send_xt('upa', -1, client.id, handID)
      }
    })
  }

  
  updateFeet(data, client) {
    let data1 = data.split('%')
    let feetID = data1[5]

    getDatabase.updatePenguinTable(feetID, 'feet', 'username', client.username).then(exists => {
      if(exists) {
        client.feet = feetID
        return client.send_xt('upe', -1, client.id, feetID)
      }
    })
  }


  updateBackground(data, client) {
    let data1 = data.split('%')
    let backgroundID = data1[5]

    getDatabase.updatePenguinTable(backgroundID, 'photo', 'username', client.username).then(exists => {
      if(exists) {
        client.photo = backgroundID
        return client.send_xt('upp', -1, client.id, backgroundID)
      }
    })
  }

  
  updatePin(data, client) {
    let data1 = data.split('%')
    let pinID = data1[5]

    getDatabase.updatePenguinTable(pinID, 'flag', 'username', client.username).then(exists => {
      if(exists) {
        client.flag = pinID
        return client.send_xt('upl', -1, client.id, pinID)
      }
    })
  }
  
  gameOver(data, client) { // not working needs fixing
    let data1 = data.split('%')
    let score = data1[5]
    console.log(score)
    let addCoins = score / 10
    console.log(addCoins)
    let maxCoins = 15000
    if(score >= maxCoins) {
      client.send_error(800)
      client.disconnect()
    } else {
      if(score <= 0) {
        client.send_xt('zo', -1, client.coins, 0)
      } else {
        client.addCoins(client, addCoins)
       return client.send_xt('zo', -1, client.coins, addCoins)
      }
    }
  }
}

module.exports = penguin