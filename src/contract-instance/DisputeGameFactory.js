const instantiate = require("./instantiate.js")

const {implWithSigner} = instantiate

const impl = implWithSigner("DisputeGameFactory")

// 不完整
class DisputeGameFactory {
    ////// read //////
    owner() {
        return impl.owner()
    }
    ////// write //////
    transferOwnership(newOwner) {
        return impl.transferOwnership(newOwner)
    }
}

module.exports = DisputeGameFactory