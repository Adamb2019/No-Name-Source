const rooms = require('./handlers/crumbs/rooms.json')
const database_manager = require('./database/database_manager.js')
const penguin = require('./penguin.js')
const roomData = require('../connections/roomData.json')

let penguins = []
let getDatabase = new database_manager()

class Room {
  joinRoomOnLogin(data, client) {
    let roomIds = [100]
    let randomRooms = roomIds[Math.floor(Math.random() * roomIds.length)]
    getDatabase.getRoomTable('1', 'ID').then(async exists => {
      if(exists.length >= 1) {
        for(let index in rooms) {
          let roomName = rooms[index][randomRooms]['Short_Room_Name']
          let maxPlayers = rooms[index][randomRooms]['Max_Users']
          let roomCount = exists[0][roomName]
          if(randomRooms) {
            if(roomCount < maxPlayers) {
              penguins.push(client)
              this.removeUser(client)
              await getDatabase.updatePenguinTable(randomRooms, 'Room', 'Username', client.username).then(exists1 => {
                if(exists1) {
                  return true
                }
              })
              client.send_xt('jr', -1, randomRooms, client.playerString(data))
              let roomCount = exists[0][roomName] =+ 1
              await getDatabase.updateRoomTable(roomCount, roomName, 'ID', '1').then(exists2 => {
                if(exists2) {
                  return true
                }
              })
            } else {
              client.send_error(210)
            }
          } else {
            client.disconnect()
          }
        }
      }
    })
  }

  addUser(data, client) {
    let data1 = data.split('%')
    let roomID = data1[5]
    for(let index in rooms) {
      getDatabase.getPenguinTable(client.username, 'Username').then(exists => {
        if(exists.length >= 1) {
          getDatabase.getRoomTable('1', 'ID').then(async exists1 => {
            if(exists1.length >= 1) {
              let roomExist = rooms[index][roomID]['Room_Id']
              let roomName = rooms[index][roomID]['Short_Room_Name']
              let maxPlayers = rooms[index][roomID]['Max_Users']
              let roomCount = exists1[0][roomName]
              if(roomExist >= 900) {
                penguins.push(client)
                getDatabase.updatePenguinTable(roomName, 'Room', 'Username', client.username).then(exists2 => {
                  if(exists2) {
                    return true
                  }
                })
                client.send_xt('jg', -1, roomID) 
              } else {
                if(roomExist) {
                  if(roomCount < maxPlayers) {
                    penguins.push(client)
                    client.send_xt('jr', -1, roomID, client.playerString(exists[0]))
                    let roomCount = exists[0][roomName] =+ 1
                    this.removeUser(client)
                    await getDatabase.updateRoomTable(roomCount, roomName, 'ID', '1').then(exists3 => {
                      if(exists3) {
                        return true
                      }
                    })
                    await getDatabase.updatePenguinTable(roomName, 'Room', 'Username', client.username).then(exists4 => {
                      if(exists4) {
                        return true
                      }
                    })
                  } else {
                    client.send_error(210)
                  }
                } else {
                  penguins.push(client)
                  getDatabase.updatePenguinTable(roomName, 'Room', 'Username', client.username).then(exists5 => {
                    if(exists5) {
                      return true
                    }
                  })
                  client.send_xt('jr', -1, 100, client.playerString(results[0]))
                }
              }
            }
          })
        } else {
          client.disconnect()
        }
      })
    }
  }

  removeUser(client) {
    getDatabase.getRoomTable('1', 'ID').then(exists => {
      if(exists.length >= 1) {
        getDatabase.getPenguinTable(client.username, 'Username').then(async exists1 => {
          if(exists1.length >= 1) {
            let currentRoom = exists1[0].Room
            let currentRoomCount = exists[0][currentRoom]
            let newRoomCount = currentRoomCount - 1
            await getDatabase.updateRoomTable(newRoomCount, currentRoom, 'ID', '1').then(exists2 => {
              if(exists2) {
                client.send_xt('rp', -1, currentRoom, exists1[0].ID)
              }
            })
          }
        })
      }
    })
  }
}

module.exports = Room