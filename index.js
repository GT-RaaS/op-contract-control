const tSysmtemConfig = require('./tests/tSystemConfig.js')
const tSuperchainConfig = require('./tests/tSuperchainConfig.js')
const transferOwnership = require('./tests/t_OwnershipTransfer.js')
async function main() {
    // console.log("\n===== test SysmtemConfig =====")
    // await tSysmtemConfig()
    
    // console.log("\n===== test SuperchainConfig =====")
    // await tSuperchainConfig()

    console.log("\n===== test OwnershipTransfer =====")
    await transferOwnership()
}

main()