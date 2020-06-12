const mysql = require('mysql')
const connection = require('./../../connections/database.json')

const database = mysql.createConnection({
    multipleStatements: true,
    host: connection.database.host,
    user: connection.database.user,
    password: connection.database.password,
    database: connection.database.databaseName
});

database.connect(function(err) {
    if(err) {
        database.destory()
        throw err
    }
});

module.exports = database
