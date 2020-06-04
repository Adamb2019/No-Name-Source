const fs = require('fs')
const rooms = require('../crumbs/rooms.json')

for(let i = 0; i < rooms.length; i++) {
    console.log(rooms[i])
}

// for(let index in rooms) {
//     let roomIds = rooms[index]['Room_Id']
//     if(100 === roomIds) {
//         console.log('trueee')
//     } else {
//         console.log('nahh')
//     }
// }
class handleJoinRoom {
    joinRoomLogin(client) {
        for(let i = 0; i < rooms.length; i++) {
            let spawnRooms = [rooms[i].Room_Id] // gets all room ids
            let randomRoom = spawnRooms[Math.floor(Math.random() * spawnRooms.length)]
            if(randomRoom === rooms[i].Room_Id) {
                client.send_xt('jr', -1, randomRoom)
            } else {
                client.disconnect()
            }
        }
    }

    joinRoom(data, client) {
        // for(let i = 0; i < rooms.length; i++) {
        //     if(100 === rooms[i].Room_Id) {
        //         client.send_xt('jr', -1, 100, client.playerString(data))
        //     }
        // }

        return client.send_xt('jr', -1, 100, client.playerString(data))
    }

    doesRoomExist(data, client) {
        for(let i = 0; i < rooms.length; i++) {
            if(data !== rooms[i].Room_Id) {
                client.disconnect()
            }
        }
    }
}

module.exports = handleJoinRoom