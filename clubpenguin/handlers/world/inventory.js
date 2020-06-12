const database = require('../../database/database.js')
const database_manager = require('../../database/database_manager.js')
const items = require('../crumbs/items.json')

let getDatabase = new database_manager()

class inventory {
  getInventory(client) {
    return new Promise(function(resolve, reject) {
      let inventory = []
      getDatabase.getInventoryTable(`${client.username}`, 'username').then(exists => {
        if(exists) {
          Object.keys(exists).forEach(function (item) {
            let items = exists[item].ItemID
            inventory.push(items)
          })
        }
        return resolve(inventory.join('%'))
      })
    })
  }

  sendInventory(client) {
    this.getInventory(client).then(inventory => {
      if(inventory) {
        return client.send_xt('gi', -1, inventory)
      }
    })
  }
}

module.exports = inventory