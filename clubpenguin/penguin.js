const database = require('./database/database.js')
const rooms = require('./handlers/crumbs/rooms.json')
const items = require('./handlers/crumbs/items.json')

let clients = []

class penguin {
    constructor(socket) {
      this.socket = socket
    }

    disconnect() {
      console.log('got destroyed')
      this.socket.destroy()
      clients.splice(clients.indexOf(this.socket), 1)
    }

    send_xml(data) {
      if(this.socket)  {
        this.socket.write(data + '\0')
      }
    }  

    send_xt(...args) {
      let packet = args.join('%')
      console.log(`OUTGOING XT: ${args}`)
      this.socket.write('%xt%' + packet + '%' + '\0')
    }

    send_error(error) {
      console.log(`OUTGOING ERROR: ${error}`)
      this.socket.write('%xt%e%-1%' + error + '%' + '\0')
    }

    playerStuff(result) { // for anything else when ur not sending the playerString
      let dayCreated = DATE_FORMAT(result.age)
      console.log(dayCreated)
      this.id = result.ID
      this.username = result.Username
      this.created = result.Created // doesnt return pLayers age rn
      this.loginKey = result.LoginKey
      this.approved = result.Approved
      this.active = result.Active
      this.safecChat = result.SafeChat
      this.moderator = result.Moderator
      this.banned = result.Banned
      this.permaBan = result.PermaBan
      this.color = result.Color
      this.coins = result.Coins
      this.head = result.Head
      this.face = result.Face
      this.neck = result.Neck
      this.body = result.Body
      this.hand = result.Hand
      this.feet = result.Feet
      this.photo = result.Photo
      this.flag = result.Flag
    }

    playerString(result) { // for load player packet
      let playerArray = [ 
      this.id = result.ID,
      this.username = result.Username,
      45,
      this.age = 100, // for now random WILL change soon to pengo age
      this.moderator = result.Moderator,
      this.coins = result.Coins,
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
      1,
      this.rank = 1
      ]
      return playerArray.join('|')
    }

    joinServer(data, client) {
      client.send_xt('l')
      client.send_xt('js', -1, 0, 1, data.Moderator)
      // client.send_xt('gps', -1, '') pLayer stamps but rn stamps arent added
      client.send_xt('lp', -1, client.playerString(data), client.coins, 0, 1440, Math.floor(new Date() / 1000), client.age, 1000, 187, "", 7)
      client.sendInventory(client)
      client.joinRoomOnLogin(data, client)
      clients.push(client.username)
    }

    joinRoomOnLogin(data, client) {
      let roomIds = [100] // put ids of the rooms you want to join on spawn
      let randomRooms = roomIds[Math.floor(Math.random() * roomIds.length)]
      if(randomRooms) {
        clients.push(client.username)
        client.send_xt('jr', -1, randomRooms, client.playerString(data))
      } else {
        client.disconnect()
      }
    }

    doesRoomExist(data, client) {
      database.query(`SELECT * FROM penguins WHERE username = '${client.username}'`, function(err, results) {
        let data1 = data.split('%')
        let roomID = data1[5]
  
        for(let index in rooms) {
          let checkIfExist = rooms[index][roomID]['Room_Id']
          if(checkIfExist > 900) {
            client.send_xt('jg', -1, roomID) 
          } else {
            if(checkIfExist) {
              clients.push(client.username)
              client.send_xt('jr', -1, roomID, client.playerString(results[0]))
            } else {
              client.send_xt('jr', -1, 100, client.playerString(results[0]))
            }
          }
        }
      })
    }

    getInventory(client) { // NEED TO USE PROMISE SO IT WAITS
      let inventory = ['414', '1']
      database.query(`SELECT * FROM inventory WHERE username = '${client.username}'`, function(err, result) {
        Object.keys(result).forEach(function (item) {
          let items = result[item].ItemID
          console.log(items)
          inventory.push(items)
        })
        console.log(inventory.join('%'))
      })
      console.log(`hello ${inventory.join('%')}`)
      return inventory.join('%')
    }

    async getInventory(client) {
      let inventory = ['414']
      return new Promise(function(resolve, reject) {
        database.query(`SELECT * FROM inventory WHERE username = '${client.username}'`, async function(err, result) {
          Object.keys(result).forEach(function (item) {
            let items = result[item].ItemID
            inventory.push(items)
            return resolve(inventory.join('%'))
          })
        })
      })
    }

    sendInventory(client) {
      return client.send_xt('gi', -1, client.getInventory(client))
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
          database.query(`INSERT INTO inventory (PenguinID, Username, ItemID) VALUES ('${client.id}', '${client.username}', '${itemID}')`)
          return client.send_xt('ai', -1, itemID, client.coins)
        }
      } else {
        return client.send_error(ITEM_DOES_NOT_EXIST)
      }
    }

    addCoins(client, amount) {
      database.query(`SELECT * FROM penguins WHERE username = '${client.username}'`, function(err, results) {
        let playerCoins = client.coins
        let coinsAdd = amount
        let newCoins = +playerCoins + coinsAdd

        database.query(`UPDATE penguins SET coins = '${newCoins}' WHERE username = '${client.username}'`)
        playerCoins = newCoins

        return newCoins
      })
    }

    removeCoins(client, amount) {
      database.query(`SELECT * FROM penguins WHERE username = '${client.username}'`, function(err, results) {
        let playerCoins = client.coins
        let coinsRemove = amount
        let newCoins = playerCoins - coinsRemove

        database.query(`UPDATE penguins SET coins = '${newCoins}' WHERE username = '${client.username}'`)
        playerCoins = newCoins
        console.log(playerCoins)
  
        return newCoins // coin removal works but when it resets coins to 0 on player interface NEEDS FIXING!!
      })
    }

    heartBeat(client) {
      return client.send_xt('h', -1)
    }
  
    updateColor(data, client) {
      let data1 = data.split('%')
      let colorID = data1[5]
      let color = client.color
  
      database.query(`UPDATE penguins SET Color = '${colorID}' WHERE username = '${client.username}'`)
      color = colorID
      return client.send_xt('upc', -1, client.id, colorID)
    }

    updateHead(data, client) {
      let data1 = data.split('%')
      let headID = data1[5]
      let head = client.headID
  
      database.query(`UPDATE penguins SET Head = '${headID}' WHERE username = '${client.username}'`)
      head = headID
      return client.send_xt('uph', -1, client.id, headID)
    }

    
    updateFace(data, client) {
      let data1 = data.split('%')
      let faceID = data1[5]
      let face = client.faceID
  
      database.query(`UPDATE penguins SET Face = '${faceID}' WHERE username = '${client.username}'`)
      face = faceID
      return client.send_xt('upf', -1, client.id, faceID)
    }

    
    updateNeck(data, client) {
      let data1 = data.split('%')
      let neckID = data1[5]
      let Neck = client.neckID
  
      database.query(`UPDATE penguins SET Neck = '${neckID}' WHERE username = '${client.username}'`)
      neck = neckID
      return client.send_xt('upn', -1, client.id, neckID)
    }

    
    updateBody(data, client) {
      let data1 = data.split('%')
      let bodyID = data1[5]
      let body = client.bodyID
  
      database.query(`UPDATE penguins SET Body = '${bodyID}' WHERE username = '${client.username}'`)
      body = bodyID
      return client.send_xt('upb', -1, client.id, bodyID)
    }

    
    updateHand(data, client) {
      let data1 = data.split('%')
      let handID = data1[5]
      let hand = client.handID
  
      database.query(`UPDATE penguins SET Hand = '${handID}' WHERE username = '${client.username}'`)
      hand = handID
      return client.send_xt('upa', -1, client.id, handID)
    }

    
    updateFeet(data, client) {
      let data1 = data.split('%')
      let feetID = data1[5]
      let feet = client.feetID
  
      database.query(`UPDATE penguins SET Feet = '${feetID}' WHERE username = '${client.username}'`)
      feet = feetID
      return client.send_xt('upe', -1, client.id, feetID)
    }


    updateBackground(data, client) {
      let data1 = data.split('%')
      let backgroundID = data1[5]
      let background = client.photo
  
      database.query(`UPDATE penguins SET Photo = '${backgroundID}' WHERE username = '${client.username}'`)
      background = backgroundID
      return client.send_xt('upp', -1, client.id, backgroundID)
    }

    
    updatePin(data, client) {
      let data1 = data.split('%')
      let pinID = data1[5]
      let pin = client.pinID
  
      database.query(`UPDATE penguins SET Flag = '${pinID}' WHERE username = '${client.username}'`)
      pin = pinID
      return client.send_xt('upl', -1, client.id, pinID)
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
