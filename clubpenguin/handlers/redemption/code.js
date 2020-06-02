const database = require('../../database/database.js')

database.query(`SELECT * FROM codes WHERE code = '${code}'`, async function(err, results) { // code is yet to be defined

});