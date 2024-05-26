const instantiate = require("./instantiate.js")

const {implViaProxyWithSigner} = instantiate

const impl = implViaProxyWithSigner("OptimismPortal")

class OptimismPortal {
    ////// read //////
    guardian() {
        return impl.guardian()
    }
}


module.exports = OptimismPortal