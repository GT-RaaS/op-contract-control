const SystemConfig = require("../contracts/SystemConfig.js")
const ProtocolVersions = require("../contracts/ProtocolVersions.js")
const DisputeGameFactory = require("../contracts/DisputeGameFactory.js")
const Instantiation = require("../contracts/instantiate.js")

const [adminWallet, acc1Wallet] = Instantiation.wallets

async function transferOwnership(impl, address) {
    console.log("current owner:", await impl.owner())
    let txResponse = await impl.transferOwnership(address)
    await txResponse.wait()
    console.log("transfered to:", await impl.owner())
}

async function systemConfigTransferOwnership() {
    console.log("SystemConfig.transferOwnership")
    sc = new SystemConfig()
    await transferOwnership(sc, acc1Wallet.address)
    sc.connect(acc1Wallet)
    await transferOwnership(sc, adminWallet.address)
}

async function ProtocolVersionsTransferOwnership() {
    console.log("ProtocolVersions.transferOwnership")
    pv = new ProtocolVersions()
    await transferOwnership(pv, acc1Wallet.address)
    pv.connect(acc1Wallet)
    await transferOwnership(pv, adminWallet.address)
}

async function DisputeGameFactoryTransferOwnership() {
    console.log("DisputeGameFactory.transferOwnership")
    dgf = new DisputeGameFactory()
    console.log(await dgf.owner())
    // await transferOwnership(dgf, acc1Wallet.address)
    // dgf.connect(acc1Wallet)
    // await transferOwnership(dgf, adminWallet.address)
}

// DisputeGameFactoryTransferOwnership()