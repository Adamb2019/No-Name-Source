const fs = require('fs')
const Path = require('Path')
const login = require('./clubpenguin/handlers/login/login.js')
const world = require('./clubpenguin/handlers/login/world.js')
const database = require('./clubpenguin/database/database.js')
const redemption = require('./clubpenguin/handlers/redemption/redemption.js')
const databaseInfo = require('./connections/database.json')
const worlds = require('./connections/worlds.json')
const rooms = require('./clubpenguin/handlers/crumbs/rooms.json')
const items = require('./clubpenguin/handlers/crumbs/items.json')
const igloo = require('./clubpenguin/handlers/crumbs/igloo.json')
const iglooFloor = require('./clubpenguin/handlers/crumbs/iglooFloor.json')
const furniture = require('./clubpenguin/handlers/crumbs/furniture.json')

let cmdPath = Path.join(__dirname, '/clubpenguin/handlers/world/commands/')
let pluginsPath = Path.join(__dirname, '/clubpenguin/plugins/')

fs.readdir(cmdPath, function(err, results) {
    console.log(`[Server] Loaded ${results.length} command's`)
});

fs.readdir(pluginsPath, function(err, results) {
    console.log(`[Server] Loaded ${results.length} plugin's`)
});

console.log(`[Server] An as2 Club Penguin emulator written in Node JS`)
console.log(`[Server] Loaded ${Object.keys(items).length} Items`)
console.log(`[Server] Loaded ${Object.keys(igloo).length} Igloos`)
console.log(`[Server] Loaded ${Object.keys(iglooFloor).length} Igloo Floors`)
console.log(`[Server] Loaded ${Object.keys(furniture).length} Furnitures`)

if(worlds.login.port === "") {
    console.log('[Warning] No login port provided server will now close')
    process.exit()
}

if(worlds.world.port === "") {
    console.log('[Warning] No world port provided server will now close')
    process.exit()
}

if(worlds.redemption.port === "") {
    console.log('[Warning] No redemption port provided server will now close')
    process.exit()
}

if(isNaN(worlds.login.port)) {
    console.log('[Warning] Invalid login port provided server will now close')
    process.exit()
}

if(isNaN(worlds.world.port)) {
    console.log('[Warning] Invalid World port provided server will now close')
    process.exit()
}

if(isNaN(worlds.redemption.port)) {
    console.log('[Warning] Invalid redemption port provided server will now close')
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