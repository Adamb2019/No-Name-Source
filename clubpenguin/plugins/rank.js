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
    rankUpdate(username) {
        database.query(`SELECT * FROM penguins WHERE Username = '${username}'`, function(err, results) {
            if(results) {
                let penguinAge = results[0].Age
                let penguinAge2 = +penguinAge + 1
                if(penguinAge === threeMonths) {
                    database.query(`UPDATE penguins SET Age = '${penguinAge2}' WHERE Username = '${username}'`)
                    database.query(`UPDATE penguins SET Rank = '2' WHERE Username = '${username}'`)
                } else {
                    console.log(`error updating ${username}'s rank`)
                }

                if(penguinAge === sixMonths) {
                    database.query(`UPDATE penguins SET Age = '${penguinAge2}' WHERE Username = '${username}'`)
                    database.query(`UPDATE penguins SET Rank = '3' WHERE Username = '${username}'`)
                } else {
                    console.log(`error updating ${username}'s rank`)
                }

                if(penguinAge === nineMonths) {
                    database.query(`UPDATE penguins SET Age = '${penguinAge2}' WHERE Username = '${username}'`)
                    database.query(`UPDATE penguins SET Rank = '4' WHERE Username = '${username}'`)
                } else {
                    console.log(`error updating ${username}'s rank`)
                }

                if(penguinAge === year) {
                    database.query(`UPDATE penguins SET Age = '${penguinAge2}' WHERE Username = '${username}'`)
                    database.query(`UPDATE penguins SET Rank = '5' WHERE Username = '${username}'`)
                } else {
                    console.log(`error updating ${username}'s rank`)
                }
            }
        })
    }
}

module.exports = rank