const database = require('./database/database.js')
const rooms = require('./handlers/crumbs/rooms.json')
const items = require('./handlers/crumbs/items.json')

class penguin {
    constructor(socket){
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
    console.log(`OUTGOING XT: ${args}`)
    this.socket.write('%xt%' + packet + '%' + '\0')
  }
  
  send_error(error) {
    console.log(`OUTGOING ERROR: ${error}`)
    this.socket.write('%xt%e%-1%' + error + '%' + '\0')
  }

  pLayerStuff(result) { // for anything else when ur not sending the pLayerString
    this.id = result.ID
    this.username = result.Username
    this.nickname = result.nickname
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
  
  playerString(result) { // for load pLayer packet
    let pLayerArray = [ 
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
    this.rank = 2
    ]
    return pLayerArray.join('|')
  }

  joinServer(data, client, items) {
    client.send_xt('l')
    client.send_xt('js', -1, 0, 1, data.Moderator)
    // client.send_xt('gps', -1, '') pLayer stamps but rn stamps arent added
    client.send_xt('lp', -1, client.playerString(data), client.coins, 0, 1440, Math.floor(new Date() / 1000), client.age, 1000, 187, "", 7)
    client.sendInventory(client, items)
    client.joinRoomOnLogin(data, client)
  }

  joinRoomOnLogin(data, client) {
    let roomIds = [130] // put ids of the rooms you want to join on spawn
    let randomRooms = roomIds[Math.floor(Math.random() * roomIds.length)]
    console.log(randomRooms)
    return client.send_xt('jr', -1, randomRooms, client.playerString(data))
  }

  doesRoomExist(data, client) { // not even sure if works lmao
    database.query(`SELECT * FROM penguins WHERE username = '${client.username}'`, function(err, results) {
      let data1 = data.split('%')
      let roomID = data1[5]
  
      for(let index in rooms) {
        let checkIfExist = rooms[index][roomID]['Room_Id']
        if(checkIfExist) {
          console.log(roomID)
          return client.send_xt('jr', -1, roomID, client.playerString(results[0]))
        } else {
          client.disconnect()
        }
      }
    })
  }

  getInventory(client, items) {
    database.query(`SELECT * FROM inventory WHERE username = '${client.username}'`, function(err, result) {
      console.log(result[0].ItemID)
      let inventory = ['413', '1', '2'] // this was a test ill leave it here for now...
      // inventory.push(itemIds)
      // console.log(itemIds)
      return inventory.join('%')
    })
  }

  sendInventory(client, items) {
    return client.send_xt('gi', -1, client.getInventory(client, items))
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
        client.send_xt('ai', -1, itemID)
        database.query(`INSERT INTO inventory (PenguinID, Username, ItemID) VALUES (1, '${client.username}', '${itemID}')`)
      }
    } else {
      client.send_error(ITEM_DOES_NOT_EXIST)
    }
  }

  removeCoins(client, amount) {
    database.query(`SELECT * FROM penguins WHERE username = '${client.username}'`, function(err, results) {
      let playerCoins = client.coins
      let coinsRemove = amount
      let removalCoins = playerCoins - coinsRemove

      console.log(`removed ${coinsRemove} from ${client.username} and he had ${playerCoins}`)
      database.query(`UPDATE penguins SET coins = '${removalCoins}' WHERE username = '${client.username}'`)
      return removalCoins // coin removal works but when it resets coins to 0 on player interface NEEDS FIXING!!
    })
  }
}

module.exports = penguin