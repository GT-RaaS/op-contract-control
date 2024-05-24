const instantiate = require("./instantiate.js")

const {implWithSigner} = instantiate

const impl = implWithSigner("SystemConfig")

class SystemConfig {
    constructor() {
        this.impl = impl
    }
    connect(signer) {
        this.impl = this.impl.connect(signer)
    }
    /* 封装方法 */
    async readGasConfig() {
        let [_overhead, _scalar] = await Promise.all([
            this.overhead(),
            this.scalar()
        ])
        return {_overhead, _scalar}
    }

    /* 合约方法 */
    ////// address read //////
    batchInbox() {
        return this.impl.batchInbox()
    }
    l1CrossDomainMessenger() {
        return this.impl.l1CrossDomainMessenger()
    }
    l1ERC721Bridge() {
        return this.impl.l1ERC721Bridge()
    }
    l1StandardBridge() {
        return this.impl.l1StandardBridge()
    }
    l2OutputOracle() {
        return this.impl.l2OutputOracle()
    }
    optimismMintableERC20Factory() {
        return this.impl.optimismMintableERC20Factory()
    }
    optimismPortal() {
        return this.impl.optimismPortal()
    }
    owner() {
        return this.impl.owner()
    }
    unsafeBlockSigner() {
        return this.impl.unsafeBlockSigner()
    }
    ////// parameter read //////
    batcherHash() {
        return this.impl.batcherHash()
    }
    minimumGasLimit() {
        return this.impl.minimumGasLimit()
    }
    gasLimit() {
        return this.impl.gasLimit()
    }
    overhead() {
        return this.impl.overhead()
    }
    scalar() {
        return this.impl.scalar()
    }
    resourceConfig() {
        return this.impl.resourceConfig()
    }
    startBlock() {
        return this.impl.startBlock()
    }
    version() {
        return this.impl.version()
    }
    ////// write //////
    setBatcherHash(batcherHash) {
        return this.impl.setBatcherHash(batcherHash)
    }
    setGasConfig(overhead, scalar) {
        return this.impl.setGasConfig(overhead, scalar)
    }
    setGasLimit(gasLimit) {
        return this.impl.setGasLimit(gasLimit)
    }
    setResourceConfig({
        maxResourceLimit,
        elasticityMultiplier,
        baseFeeMaxChangeDenominator,
        minimumBaseFee,
        systemTxMaxGas,
        maximumBaseFee
    }) {
        return this.impl.setResourceConfig({
            maxResourceLimit,
            elasticityMultiplier,
            baseFeeMaxChangeDenominator,
            minimumBaseFee,
            systemTxMaxGas,
            maximumBaseFee
        })
    }
    setUnsafeBlockSigner(unsafeBlockSigner) {
        return this.impl.setUnsafeBlockSigner(unsafeBlockSigner)
    }
    transferOwnership(newOwner) {
        return this.impl.transferOwnership(newOwner)
    }
}

module.exports = SystemConfig