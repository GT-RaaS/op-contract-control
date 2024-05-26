const ethers = require("ethers")
const SystemOwnerSafe = require("../contract-instance/SystemOwnerSafe")
const DisputeGameFactory = require("../contract-instance/DisputeGameFactory")
const ProxyAdmin = require("../contract-instance/ProxyAdmin")
const instantiate = require("../contract-instance/instantiate.js")

const {getABI, getAddress} = instantiate

async function transOwnerDisputeGameFactory(newOwner) {
    let sos = new SystemOwnerSafe({})
    const disputeGameFactory = new DisputeGameFactory()

    console.log("DisputeGameFactory Owner (before):", await disputeGameFactory.owner())
    const DisputeGameFactoryProxyAddr = getAddress("DisputeGameFactoryProxy")
    const DisputeGameFactoryABI = getABI("DisputeGameFactory")
    let dfgIface = new ethers.Interface(DisputeGameFactoryABI)
    let idata = dfgIface.encodeFunctionData("transferOwnership", [newOwner])

    let txResponse = await sos.execTransaction(DisputeGameFactoryProxyAddr, idata)
    await txResponse.wait()
    console.log("DisputeGameFactory Owner (after):", await disputeGameFactory.owner())
}

async function transOwnerProxyAdmin(newOwner) {
    let sos = new SystemOwnerSafe({})
    const proxyAdmin = new ProxyAdmin()

    console.log("ProxyAdmin Owner (before):", await proxyAdmin.owner())
    const ProxyAdminAddr = getAddress("ProxyAdmin")
    const ProxyAdminABI = getABI("ProxyAdmin")
    let paIface = new ethers.Interface(ProxyAdminABI)
    let idata = paIface.encodeFunctionData("transferOwnership", [newOwner])

    let txResponse = await sos.execTransaction(ProxyAdminAddr, idata)
    await txResponse.wait()
    console.log("ProxyAdmin Owner (after):", await proxyAdmin.owner())
}

module.exports = {
    transOwnerDisputeGameFactory,
    transOwnerProxyAdmin
}