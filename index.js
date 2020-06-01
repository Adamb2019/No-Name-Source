const login = require('./clubpenguin/handlers/login/login.js')
const world = require('./clubpenguin/handlers/login/world.js')
const database = require('./clubpenguin/database/database.js')
const databaseInfo = require('./connections/database.json')
const worlds = require('./connections/worlds.json')

if(worlds.login.port === "") {
    console.log('[Warning] No login port provided server will now close')
    process.exit()
}

if(worlds.world.port === "") {
    console.log('[Warning] No world port provided server will now close')
    process.exit()
}

if(isNaN(worlds.login.port)) {
    console.log('[Warning] Invalid login port provided server will now close')
    process.exit()
}

if(isNaN(worlds.world.port)) {
    console.log('[Warning] Invalid world port provided server will now close')
    process.exit()
}

if(databaseInfo.database.host  === "" || databaseInfo.database.user  === "" || databaseInfo.database.databaseName === "") {
    console.log('[Warning] Invalid database details server will now close')
    process.exit()
}

if(databaseInfo.database.databaseName !== "clubPenguin") { // put database name here
    console.log('[Warning] Invalid database name server will now close')
    process.exit()
}