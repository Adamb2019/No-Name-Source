const login = require('./clubpenguin/handlers/login.js')
const world = require('./clubpenguin/handlers/world.js')
const database = require('./clubpenguin/database/database.js')
const worlds = require('./connections/worlds.json')

if(worlds.login.port === "") {
    console.log('[Warning] No login port provided')
}

if(worlds.world.port === "") {
    console.warn('[Warning] No world port provided')
}