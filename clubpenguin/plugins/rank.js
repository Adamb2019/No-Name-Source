const database = require('../database/database.js')
const database_manager = require('../database/database_manager.js')
const penguin = require('../penguin.js')

let getDatabase = new database_manager()
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
        getDatabase.getPenguinTable(client.username, 'username').then(exists => {
            if(exists) {
                let penguinAge = 91
                let rank = exists[0].Rank
                if(penguinAge === threeMonths || penguinAge > threeMonths && penguinAge < sixMonths) {
                    if(!rank === '1') {
                        getDatabase.updatePenguinTable('1', 'Rank', 'Username', client.username).then(exists => { // reset rank cause they cheated 
                            if(exists) {
                                client.disconnect()
                            }
                        })
                    } else {
                        if(rank === '1') {
                            getDatabase.updatePenguinTable('2', 'Rank', 'Username', client.username).then(exists => {
                                if(exists) {
                                    console.log(`Updated ${client.username}'s rank to 2`)
                                }
                            })
                        } else {
                            return false
                        }
                    }
                }

                if(penguinAge === sixMonths || penguinAge > sixMonths && penguinAge < nineMonths) {
                    if(!rank === '2') {
                        getDatabase.updatePenguinTable('2', 'Rank', 'Username', client.username).then(exists => { // reset rank cause they cheated 
                            if(exists) {
                                client.disconnect()
                            }
                        })
                    } else {
                        if(rank === '2') {
                            getDatabase.updatePenguinTable('3', 'Rank', 'Username', client.username).then(exists => {
                                if(exists) {
                                    console.log(`Updated ${client.username}'s rank to 3`)
                                }
                            })
                        } else {
                            return false
                        }
                    }
                }

                if(penguinAge === nineMonths || penguinAge > nineMonths && penguinAge < year) {
                    if(!rank === '3') {
                        getDatabase.updatePenguinTable('3', 'Rank', 'Username', client.username).then(exists => { // reset rank cause they cheated 
                            if(exists) {
                                client.disconnect()
                            }
                        })
                    } else {
                        if(rank === '3') {
                            getDatabase.updatePenguinTable('4', 'Rank', 'Username', client.username).then(exists => {
                                if(exists) {
                                    console.log(`Updated ${client.username}'s rank to 4`)
                                }
                            })
                        }
                    }
                }

                if(penguinAge === year || penguinAge > year) {
                    if(!rank === '4') {
                        getDatabase.updatePenguinTable('4', 'Rank', 'Username', client.username).then(exists => { // reset rank cause they cheated 
                            if(exists) {
                                client.disconnect()
                            }
                        })
                    } else {
                        if(rank === '4') {
                            getDatabase.updatePenguinTable('6', 'Rank', 'Username', client.username).then(exists => {
                                if(exists) {
                                    console.log(`Updated ${client.username}'s rank to 6`)
                                }
                            })
                        }
                    }
                }
            } 
        })
    }
}

module.exports = rank