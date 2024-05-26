// deploy SafeProxy(Safe.sol)
const ethers = require("ethers")
const SafeProxyFactory = require("../contract-instance/SafeProxyFactory.js")
const instantiate = require("../contract-instance/instantiate.js")
const {getAddress, getABI, wallets, provider} = instantiate
const acc1Wallet = wallets[1]

const spf = new SafeProxyFactory()

async function DeployNewSafeProxy() {
    const SafeSingletonAddr = getAddress("SafeSingleton")
    if (SafeSingletonAddr == undefined) {
        console.log("SafeSingleton address not found")
        return
    }

    const SafeABI = getABI("Safe")
    let safeIface = new ethers.Interface(SafeABI)
    const SafeProxyFactoryABI = getABI("SafeProxyFactory")
    let spfIface = new ethers.Interface(SafeProxyFactoryABI)

    let idata = safeIface.encodeFunctionData("setup", [
        [acc1Wallet.address], // singers
        1, // threshold
        ethers.ZeroAddress, // to
        ethers.ZeroHash, // data
        ethers.ZeroAddress, // fallbackHandler
        ethers.ZeroAddress, // paymentToken
        0, // payment
        ethers.ZeroAddress // paymentReceiver
    ])

    let txResponse =  await spf.createProxyWithNonce(SafeSingletonAddr, idata, new Date().getTime())
    let receipt = await txResponse.wait()
    console.log("Receipt:", receipt)
    for (let log of receipt.logs) {
        try {
            const parsedLog = spfIface.parseLog(log);
            console.log("parsedLog:", parsedLog)
            if (parsedLog.name === "ProxyCreation") {
                console.log("SafeProxy Address:", parsedLog.args.proxy);
                console.log("Singleton Address:", parsedLog.args.singleton);
            }
        } catch (e) {}
    }
}

DeployNewSafeProxy()