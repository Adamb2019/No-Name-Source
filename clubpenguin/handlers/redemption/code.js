const redemption = require('./redemption.js')
const database = require('../../database/database.js')
const database_manager = require('../../database/database_manager.js')

let getDatabase = new database_manager()

// %xt%red%rsc%-1%ADDDDDDDDD% - code
class code {
    checkCode(data, client, account) {
        let data1 = data.split('%')
        let code = data1[5].toLowerCase()
        let player = client.playerString(account)
        getDatabase.getRedemptionCodeTable(code, 'code').then(exists => {
            if(exists.length < 1) {
                client.send_error(20720)
            } else {
                let code = results[0].Code.toLowerCase()
                console.log(code)
            }
        })
    }
}

module.exports = code