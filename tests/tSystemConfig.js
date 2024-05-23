const SystemConfig = require("../contracts/SystemConfig.js")

async function print() {
    let [
        batcherHash,
        overhead,
        scalar,
        gasLimit,
        resourceConfig,
        unsafeBlockSigner,
    ] = await Promise.all([
        SystemConfig.batcherHash(), // 0x00000000000000000000000074a688a092ee83a98f2c7b4f559648839ba62c37
        SystemConfig.overhead(), // 2100
        SystemConfig.scalar(), // 1000000
        SystemConfig.gasLimit(), // 30000000
        /*
        resourceConfig: {
            maxResourceLimit: 20000000n,
            elasticityMultiplier: 10n,
            baseFeeMaxChangeDenominator: 8n,
            minimumBaseFee: 1000000000n,
            systemTxMaxGas: 1000000n,
            maximumBaseFee: 340282366920938463463374607431768211455n
        }
        */
        SystemConfig.resourceConfig(),
        SystemConfig.unsafeBlockSigner() // 0x03d12D075C7327f9AC01BD703179d22709b2BdD5
    ])
    console.log({
        batcherHash,
        overhead,
        scalar,
        gasLimit,
        resourceConfig,
        unsafeBlockSigner,
    })
}

async function set() {
    console.log("SystemConfig.setBatcherHash")
    let txRspSetBatcherHash = await SystemConfig.setBatcherHash("0x00000000000000000000000074a688a092ee83a98f2c7b4f559648839ba62c38")
    await txRspSetBatcherHash.wait()
    console.log("SystemConfig.setGasConfig")
    let txRspSetGasConfig = await SystemConfig.setGasConfig(32100, 31000000)
    await txRspSetGasConfig.wait()
    console.log("SystemConfig.setGasLimit")
    let txRspSetGasLimit = await SystemConfig.setGasLimit(30000000)
    await txRspSetGasLimit.wait()
    console.log("SystemConfig.setUnsafeBlockSigner")
    let txRspSetUnsafeBlockSigner = await SystemConfig.setUnsafeBlockSigner("0x73768Ae43c8621a5821cD6A18dd828328cEa2B9F")
    await txRspSetUnsafeBlockSigner.wait()
    console.log("SystemConfig.setResourceConfig")
    let resourceConfig = {
        maxResourceLimit: 10000000n,
        elasticityMultiplier: 10n,
        baseFeeMaxChangeDenominator: 8n,
        minimumBaseFee: 1000000000n,
        systemTxMaxGas: 1000000n,
        maximumBaseFee: 340282366920938463463374607431768211455n
    }
    let txRspSetResourceConfig = await SystemConfig.setResourceConfig(resourceConfig)
    await txRspSetResourceConfig.wait()
}

async function run() {
    console.log("before config SystemConfig")
    await print()
    await set()
    console.log("after config SystemConfig")
    await print()
}
// run()

module.exports = run