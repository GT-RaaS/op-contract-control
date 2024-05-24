const instantiate = require("./instantiate.js")

const {implWithSigner} = instantiate

const impl = implWithSigner("ProtocolVersions")

class ProtocolVersions {
    constructor() {
        this.impl = impl
    }
    connect(signer) {
        this.impl = this.impl.connect(signer)
    }
    ////// read //////
    owner() {
        return this.impl.owner()
    }
    recommended() {
        return this.impl.recommended()
    }
    required() {
        return this.impl.required()
    }
    version() {
        return this.impl.version()
    }
    ////// write //////
    // renounceOwnership 将所有权交给零地址
    setRecommended(recommended) {
        return this.impl.setRecommended(recommended)
    }
    setRequired(required) {
        return this.impl.setRequired(required)
    }
    transferOwnership(newOwner) {
        return this.impl.transferOwnership(newOwner)
    }
}

module.exports = ProtocolVersions