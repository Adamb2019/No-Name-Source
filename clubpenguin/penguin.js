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
    this.rank = 2
    ]
    return playerArray.join('|')
  }

  joinRoom(data, client) {
    return client.send_xt('jr', -1, 100, client.playerString(data))
  }

  doesRoomExist(data, client) { // not even sure if works lmao
    for(let i = 0; i < rooms.length; i++) {
      if(data !== rooms[i].Room_Id) {
        client.disconnect()
      }
    }
  }

  getInventory(items) {
    let inventory = ['413', '1', '2'] // this was a test ill leave it here for now...
    let itemIds = items.ItemID
    inventory.push(itemIds)
    console.log(itemIds)
    return inventory.join('%')
  }

  sendInventory(client, items) {
    return client.send_xt('gi', -1, this.getInventory(items))
  }

  joinServer(data, client, items) {
    client.send_xt('l')
    client.send_xt('js', -1, 0, 1, data.Moderator)
    // client.send_xt('gps', -1, '') player stamps but rn stamps arent added
    client.send_xt('lp', -1, client.playerString(data), client.coins, 0, 1440, Math.floor(new Date() / 1000), client.age, 1000, 187, "", 7)
    console.log(client.username)
    this.sendInventory(client, items)
    this.joinRoom(data, client)
  }
}

module.exports = penguin