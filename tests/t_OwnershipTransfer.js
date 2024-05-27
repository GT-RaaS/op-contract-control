const SystemConfig = require("../src/contract-instance/SystemConfig.js")
const ProtocolVersions = require("../src/contract-instance/ProtocolVersions.js")
const DisputeGameFactory = require("../src/contract-instance/DisputeGameFactory.js")
const Instantiation = require("../src/contract-instance/instantiate.js")
const ProxyAdmin = require("../src/contract-instance/ProxyAdmin")
const instantiate = require("../src/contract-instance/instantiate.js")
const callViaSafe = require("../src/interact/callViaSafe.js")

const {getAddress} = instantiate
const SystemOwnerSafe = getAddress("SystemOwnerSafe")

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

async function protocolVersionsTransferOwnership() {
    console.log("ProtocolVersions.transferOwnership")
    pv = new ProtocolVersions()
    await transferOwnership(pv, acc1Wallet.address)
    pv.connect(acc1Wallet)
    await transferOwnership(pv, adminWallet.address)
}

const {transOwnerDisputeGameFactory, transOwnerProxyAdmin} = callViaSafe

// 由SafeProxy作为owner的需要通过Safe合约进行所有权转让
// 包括：DisputeGameFactory，ProxyAdmin
async function transViaSafe() {
    const newOwner = adminWallet.address
    console.log(`Transfer ownership to Admin(${newOwner}) via safe`)
    await transOwnerDisputeGameFactory(newOwner)
    await transOwnerProxyAdmin(newOwner)

    console.log("Transfer ownership back to SafeOwner") 
    let disputeGameFactory = new DisputeGameFactory()
    let proxyAdmin = new ProxyAdmin()
    console.log("DisputeGameFactory Owner (before):", await disputeGameFactory.owner())
    let txResponse = await disputeGameFactory.transferOwnership(SystemOwnerSafe)
    await txResponse.wait()
    console.log("DisputeGameFactory Owner (after):", await disputeGameFactory.owner())
    console.log("ProxyAdmin owner (before):", await proxyAdmin.owner())
    txResponse = await proxyAdmin.transferOwnership(SystemOwnerSafe)
    await txResponse.wait()
    console.log("ProxyAdmin owner (after):", await proxyAdmin.owner())
}

async function run() {
    await systemConfigTransferOwnership()
    await protocolVersionsTransferOwnership()
    await transViaSafe()
}

module.exports = run