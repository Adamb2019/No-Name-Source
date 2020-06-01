const crypto_js = require('crypto')

class crypto {
    randomkey() {
        let code = crypto_js.randomBytes(20).toString('hex')
        return code
    }
}

module.exports = crypto