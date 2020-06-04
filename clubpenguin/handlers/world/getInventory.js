class handleGetInventory {
    getInventory(items) {
        let inventory = ['413', '1', '2'] // this was a test ill leave it here for now...
        let itemIds = items.ItemID
        inventory.push(itemIds)
        console.log(itemIds)
        return inventory.join('%')
    }

    sendInventory(client, items) {
        return client.send_xt('gi', -1, this.getInventory(items))
    }
}

module.exports = handleGetInventory