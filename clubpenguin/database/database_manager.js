const database = require('./database.js')

class database_manager {
    getPenguinTable(data, columnName) {
        return new Promise(async function(resolve, reject) {
            await database.query(`SELECT * FROM penguins WHERE ${columnName} = ?`, [data], function(err, results) {
                return resolve(results)
            })
        })
    }

    updatePenguinTable(data, columnName, data1, data2) { 
        /*
        im dumb and will forget soooo
        data = thing we are updating
        columnName = what column we are updating
        data1 = what we are pulling it from so from username Adam
        data2 = WHERE statement so ADAM penguin NAME ETC
        */
        return new Promise(async function(resolve, reject) {
            await database.query(`UPDATE penguins SET ${columnName} = ? WHERE ${data1} = ?`, [data, data2], function(err, results) {
                return resolve(results)
            })
        })
    }

    getInventoryTable(data, columnName) {
        return new Promise(async function(resolve, reject) {
            await database.query(`SELECT * FROM inventory WHERE ${columnName} = ?`, [data], function(err, results) {
                return resolve(results)
            })
        })
    }

    updateInventoryTable(data, columnName, data1, data2) {
        /*
        im dumb and will forget soooo
        data = thing we are updating
        columnName = what column we are updating
        data1 = what we are pulling it from so from username Adam
        data2 = WHERE statement so ADAM penguin NAME ETC
        */
        return new Promise(async function(resolve, reject) {
            await database.query(`UPDATE inventory SET ${columnName} = ? WHERE ${data1} = ?`, [data, data2], function(err, results) {
                console.log('ipdated table')
                return resolve(results)
            })
        })
    }

    getIPBansTable(data, columnName) {
        return new Promise(async function(resolve, reject) {
            await database.query(`SELECT * FROM ip_bans WHERE ${columnName} = ?`, [data], function(err, results) {
                return resolve(results)
            })
        })
    }

    updateIPBansTable(data, columnName, data1, data2) {
        /*
        im dumb and will forget soooo
        data = thing we are updating
        columnName = what column we are updating
        data1 = what we are pulling it from so from username Adam
        data2 = WHERE statement so ADAM penguin NAME ETC
        */
        return new Promise(async function(resolve, reject) {
            await database.query(`UPDATE ip_bans SET ${columnName} = ? WHERE ${data1} = ?`, [data, data2], function(err, results) {
                return resolve(results)
            })
        })
    }

    getLoginTable(data, columnName) {
        return new Promise(async function(resolve, reject) {
            await database.query(`SELECT * FROM login WHERE ${columnName} = ?`, [data], function(err, results) {
                return resolve(results)
            })
        })
    }

    updateLoginTable(data, columnName, data1, data2) {
        /*
        im dumb and will forget soooo
        data = thing we are updating
        columnName = what column we are updating
        data1 = what we are pulling it from so from username Adam
        data2 = WHERE statement so ADAM penguin NAME ETC
        */
        return new Promise(async function(resolve, reject) {
            await database.query(`UPDATE login SET ${columnName} = ? WHERE ${data1} = ?`, [data, data2], function(err, results) {
                return resolve(results)
            })
        })
    }

    getPenguinRedemptionTable(data, columnName) {
        return new Promise(async function(resolve, reject) {
            await database.query(`SELECT * FROM penguin_redemption WHERE ${columnName} = ?`, [data], function(err, results) {
                return resolve(results)
            })
        })
    }

    updatePenguinRedemptionTable(data, columnName, data1, data2) {
        /*
        im dumb and will forget soooo
        data = thing we are updating
        columnName = what column we are updating
        data1 = what we are pulling it from so from username Adam
        data2 = WHERE statement so ADAM penguin NAME ETC
        */
        return new Promise(async function(resolve, reject) {
            await database.query(`UPDATE penguin_redemption SET ${columnName} = ? WHERE ${data1} = ?`, [data, data2], function(err, results) {
                return resolve(results)
            })
        })
    }

    getRedemptionCodeTable(data, columnName) {
        return new Promise(async function(resolve, reject) {
            await database.query(`SELECT * FROM redemption_code WHERE ${columnName} = ?`, [data], function(err, results) {
                return resolve(results)
            })
        })
    }

    updateRedemptionCodeTable(data, columnName, data1, data2) {
        /*
        im dumb and will forget soooo
        data = thing we are updating
        columnName = what column we are updating
        data1 = what we are pulling it from so from username Adam
        data2 = WHERE statement so ADAM penguin NAME ETC
        */
        return new Promise(async function(resolve, reject) {
            await database.query(`UPDATE redemption_code SET ${columnName} = ? WHERE ${data1} = ?`, [data, data2], function(err, results) {
                return resolve(results)
            })
        })
    }   

    getIglooTable(data, columnName) {
        return new Promise(async function(resolve, reject) {
            await database.query(`SELECT * FROM Igloo WHERE ${columnName} = ?`, [data], function(err, results) {
                return resolve(results)
            })
        })
    }

    updateIglooTable(data, columnName, data1, data2) {
        /*
        im dumb and will forget soooo
        data = thing we are updating
        columnName = what column we are updating
        data1 = what we are pulling it from so from username Adam
        data2 = WHERE statement so ADAM penguin NAME ETC
        */
        return new Promise(async function(resolve, reject) {
            await database.query(`UPDATE Igloo SET ${columnName} = ? WHERE ${data1} = ?`, [data, data2], function(err, results) {
                return resolve(results)
            })
        })
    }
    
    getRoomTable(data, columnName) {
        return new Promise(async function(resolve, reject) {
            await database.query(`SELECT * FROM Rooms WHERE ${columnName} = ?`, [data], function(err, results) {
                return resolve(results)
            })
        })
    }

    updateRoomTable(data, columnName, data1, data2) {
        /*
        im dumb and will forget soooo
        data = thing we are updating
        columnName = what column we are updating
        data1 = what we are pulling it from so from username Adam
        data2 = WHERE statement so ADAM penguin NAME ETC
        */
       return new Promise(async function(resolve, reject) {
           await database.query(`UPDATE Rooms SET ${columnName} = ? WHERE ${data1} = ?`, [data, data2], function(err, results) {
               return resolve(results)
           })
       })
    }
}


module.exports = database_manager