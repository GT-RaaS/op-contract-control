const instantiate = require("./instantiate.js")

const {implWithSigner} = instantiate

const impl = implWithSigner("SystemConfig")

/* 封装方法 */
async function readGasConfig() {
    let [_overhead, _scalar] = await Promise.all([
        overhead(),
        scalar()
    ])
    return {_overhead, _scalar}
}

/* 合约方法 */
////// address read //////
const batchInbox = async () => impl.batchInbox()
const l1CrossDomainMessenger = async () => impl.l1CrossDomainMessenger()
const l1ERC721Bridge = async () => impl.l1ERC721Bridge()
const l1StandardBridge = async () => impl.l1StandardBridge()
const l2OutputOracle = async () => impl.l2OutputOracle()
const optimismMintableERC20Factory = async () => impl.optimismMintableERC20Factory()
const optimismPortal = async () => impl.optimismPortal()
const owner = async () => impl.owner()
const unsafeBlockSigner = async () => impl.unsafeBlockSigner()
////// parameter read //////
const batcherHash = async () => impl.batcherHash()
const minimumGasLimit = async () => impl.minimumGasLimit()
const gasLimit = async () => impl.gasLimit()
const overhead = async () => impl.overhead()
const scalar = async () => impl.scalar()
async function resourceConfig() {
    let [
        maxResourceLimit,
        elasticityMultiplier,
        baseFeeMaxChangeDenominator,
        minimumBaseFee,
        systemTxMaxGas,
        maximumBaseFee
    ] = await impl.resourceConfig()

    return {
        maxResourceLimit,
        elasticityMultiplier,
        baseFeeMaxChangeDenominator,
        minimumBaseFee,
        systemTxMaxGas,
        maximumBaseFee
    }
}
const startBlock = async () => impl.startBlock()
const version = async () => impl.version()


////// write //////
const setBatcherHash = async batcherHash => impl.setBatcherHash(batcherHash)
const setGasConfig = async (overhead, scalar) => impl.setGasConfig(overhead, scalar)
const setGasLimit = async gasLimit => impl.setGasLimit(gasLimit)
// const setResourceConfig = async resourceConfig => impl.setResourceConfig(resourceConfig)
const setResourceConfig = async ({
    maxResourceLimit,
    elasticityMultiplier,
    baseFeeMaxChangeDenominator,
    minimumBaseFee,
    systemTxMaxGas,
    maximumBaseFee
}) => impl.setResourceConfig({
    maxResourceLimit,
    elasticityMultiplier,
    baseFeeMaxChangeDenominator,
    minimumBaseFee,
    systemTxMaxGas,
    maximumBaseFee
})
const setUnsafeBlockSigner = async (unsafeBlockSigner) => impl.setUnsafeBlockSigner(unsafeBlockSigner)
const transferOwnership = async (newOwner) => impl.transferOwnership(newOwner)
// CHECK:
// initialize

module.exports = {
    /* 封装方法 */
    readGasConfig,

    /* 合约方法 */
    ////// address read //////
    batchInbox,
    l1CrossDomainMessenger,
    l1ERC721Bridge,
    l1StandardBridge,
    l2OutputOracle,
    optimismMintableERC20Factory,
    optimismPortal,
    owner,
    unsafeBlockSigner,
    ////// parameter read //////
    batcherHash,
    minimumGasLimit,
    gasLimit,
    overhead,
    scalar,
    resourceConfig,
    startBlock,
    version,
    ////// write //////
    setBatcherHash,
    setGasConfig,
    setGasLimit,
    setResourceConfig,
    setUnsafeBlockSigner,
    transferOwnership
}