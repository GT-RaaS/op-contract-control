const instantiate = require("./instantiate.js")

const {implWithSigner} = instantiate

const impl = implWithSigner("SuperchainConfig")

class SuperchainConfig {
    constructor() {
        this.impl = impl
    }
    connect(signer) {
        this.impl = this.impl.connect(signer)
    }
    ////// read //////
    guardian() {
        return this.impl.guardian()
    }
    paused() {
        return this.impl.paused()
    }
    version() {
        return this.impl.version()
    }
    ////// write //////
    pause(identifier) {
        return this.impl.pause(identifier)
    }
    unpause() {
        return this.impl.unpause()
    }
    // initialize 方法只能调用一次
}

module.exports = SuperchainConfig