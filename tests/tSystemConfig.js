const SystemConfig = require("../src/contract-instance/SystemConfig.js")
const sc = new SystemConfig()

let parameters = {}

async function print(keep) {
    let [
        batcherHash,
        overhead,
        scalar,
        gasLimit,
        resourceConfig,
        unsafeBlockSigner,
    ] = await Promise.all([
        sc.batcherHash(), // 0x00000000000000000000000074a688a092ee83a98f2c7b4f559648839ba62c37
        sc.overhead(), // 2100
        sc.scalar(), // 1000000
        sc.gasLimit(), // 30000000
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
        sc.resourceConfig(),
        sc.unsafeBlockSigner() // 0x03d12D075C7327f9AC01BD703179d22709b2BdD5
    ])
    if (keep == true) {
        parameters = {
            batcherHash,
            overhead,
            scalar,
            gasLimit,
            resourceConfig,
            unsafeBlockSigner,
        }
    }
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
    let txRspSetBatcherHash = await sc.setBatcherHash("0x00000000000000000000000074a688a092ee83a98f2c7b4f559648839ba62c38")
    await txRspSetBatcherHash.wait()
    console.log("SystemConfig.setGasConfig")
    let txRspSetGasConfig = await sc.setGasConfig(32100, 31000000)
    await txRspSetGasConfig.wait()
    console.log("SystemConfig.setGasLimit")
    let txRspSetGasLimit = await sc.setGasLimit(330000000)
    await txRspSetGasLimit.wait()
    console.log("SystemConfig.setUnsafeBlockSigner")
    let txRspSetUnsafeBlockSigner = await sc.setUnsafeBlockSigner("0x73768Ae43c8621a5821cD6A18dd828328cEa2B9F")
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
    let txRspSetResourceConfig = await sc.setResourceConfig(resourceConfig)
    await txRspSetResourceConfig.wait()
}

async function setBack() {
    let txRspSetBatcherHash = await sc.setBatcherHash(parameters.batcherHash)
    await txRspSetBatcherHash.wait()
    let txRspSetGasConfig = await sc.setGasConfig(parameters.overhead, parameters.scalar)
    await txRspSetGasConfig.wait()
    let txRspSetGasLimit = await sc.setGasLimit(parameters.gasLimit)
    await txRspSetGasLimit.wait()
    let txRspSetUnsafeBlockSigner = await sc.setUnsafeBlockSigner(parameters.unsafeBlockSigner)
    await txRspSetUnsafeBlockSigner.wait()
    let txRspSetResourceConfig = await sc.setResourceConfig(parameters.resourceConfig)
    await txRspSetResourceConfig.wait()
}

async function run() {
    console.log("before config SystemConfig")
    await print(true)
    await set()
    console.log("after config SystemConfig")
    await print(false)
    console.log("restore config")
    await setBack()
    await print(false)
}
// run()

module.exports = run