const instantiate = require("./instantiate.js")

const {implWithSigner} = instantiate

const impl = implWithSigner("SafeProxyFactory")

class SafeProxyFactory {
    constructor() {
        this.impl = impl
    }
    connect(signer) {
        this.impl = this.impl.connect(signer)
    }
    ////// write //////
    createProxyWithNonce(singleton, initializer, saltNonce) {
        return impl.createProxyWithNonce(singleton, initializer, saltNonce)
    }
}

module.exports = SafeProxyFactory