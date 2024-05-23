const instantiate = require("./instantiate.js")

const {implWithSigner} = instantiate

const impl = implWithSigner("SuperchainConfig")

////// read //////
const guardian = async () => impl.guardian()
const paused = async () => impl.paused()
const version = async () => impl.version()

////// write //////
const pause = async (identifier) => impl.pause(identifier)
const unpause = async () => impl.unpause()

// CHECK:
// initialize

module.exports = {
    /* 合约方法 */
    ////// read //////
    guardian,
    paused,
    version,
    ////// write //////
    pause,
    unpause
}