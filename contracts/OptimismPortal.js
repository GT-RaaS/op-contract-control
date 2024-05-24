const instantiate = require("./instantiate.js")

const {implWithSigner} = instantiate

const impl = implWithSigner("OptimismPortal")

// 不完整
class OptimismPortal {
    ////// read //////
    guardian() {
        return impl.guardian()
    }
}

async function run() {
    console.log(await impl.guardian())
}

run()

module.exports = OptimismPortal