const database = require('../../database/database.js')

database.query(`SELECT * FROM book WHERE book = '${book}'`, async function(err, results) { // book is yet to be defined

});