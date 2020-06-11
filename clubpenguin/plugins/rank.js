const database = require('../database/database.js')
/* 
91 - 3 months
182 - 6 months
273 - 9 months
365 - 12 months
*/
let threeMonths = 91
let sixMonths = 182
let nineMonths = 273
let year = 365

class rank {
    rankUpdate(client) {
        database.query(`SELECT * FROM penguins WHERE username = '${client.username}'`, function(err, results) {
            if(results) {
                let penguinAge = 91
                let rank = results[0].Rank
                if(penguinAge === threeMonths) {
                    if(!rank === 1) {
                        client.disconnect()
                    } else {
                        if(rank === '1') {
                            database.query(`UPDATE penguins SET Rank = '2' WHERE username = '${client.username}'`)
                        } else {
                            return false
                        }
                    }
                }
    
                if(penguinAge === sixMonths) {
                    if(!rank === 2) { 
                        client.disconnect()
                    } else {
                        if(rank === 2) {
                            database.query(`UPDATE penguins SET Rank = '3' WHERE username = '${client.username}'`)
                            console.log(`Updated ${client.username} to rank 3`)
                        } else {
                            return false
                        }
                    }
                }
    
                if(penguinAge === nineMonths || penguinAge > nineMonths) {
                    if(!rank === 3) {
                        client.disconnect()
                    } else {
                        if(rank === 3) {
                            database.query(`UPDATE penguins SET Rank = '4' WHERE username = '${client.username}'`)
                            console.log(`Updated ${client.username} to rank 4`)
                        } else {
                            return false
                        }
                    }
                }
    
                if(penguinAge === year || penguinAge > year) {
                    if(!rank === 4) {
                        client.disconnect()
                    } else {
                        if(rank === 4) {
                            database.query(`UPDATE penguins SET Rank = '6' WHERE username = '${client.username}'`)
                            console.log(`Updated ${client.username} to rank 6`)
                        } else {
                            return false
                        }
                    }
                }
            } 
        })
    }
}

module.exports = rank