const rooms = require('./handlers/crumbs/rooms.json')
const database = require('./database/database.js')

let penguins = {}

class Room {
  joinRoomOnLogin(data, client) {
    let roomIds = [100, 110, 120, 130, 140] // put ids of the rooms you want to join on spawn
    let randomRooms = roomIds[Math.floor(Math.random() * roomIds.length)]
    if(randomRooms) {
      client.send_xt('jr', -1, randomRooms, client.playerString(data))
    } else {
      client.disconnect()
    }
  }

  addUser(data, client) {
    let data1 = data.split('%')
    let roomID = data1[5]

    for(let index in rooms) {
      database.query(`SELECT * FROM penguins WHERE Username = '${client.username}'`, function(err, results) {
        let roomExist = rooms[index][roomID]['Room_Id']
        if(roomExist >= 900) {
          client.send_xt('jg', -1, roomID) 
        } else {
          if(roomExist) {
            client.send_xt('jr', -1, roomID, client.playerString(results[0]))
          } else {
            client.send_xt('jr', -1, 100, client.playerString(results[0]))
          }
        }
      })
    }
  }

  removeUser(data, client) {

  }
}

module.exports = Room