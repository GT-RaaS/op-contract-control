const instantiate = require("./instantiate.js")

const {implViaProxyWithSigner} = instantiate

const impl = implViaProxyWithSigner("DisputeGameFactory")

class DisputeGameFactory {
    constructor() {
        this.impl = impl
    }
    connect(signer) {
        this.impl = this.impl.connect(signer)
    }
    /* 合约方法 */
    ////// read //////
    owner() {
        return this.impl.owner()
    }
    ////// write //////
    transferOwnership(newOwner) {
        return this.impl.transferOwnership(newOwner)
    }
}

module.exports = DisputeGameFactory