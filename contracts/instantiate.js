const ethers = require("ethers")
const fs = require('fs')

const provider = new ethers.JsonRpcProvider(process.env.L1_RPC_ENDPOINT)
const wallet = new ethers.Wallet(process.env.ADMIN_PK, provider)

function getABI(name) {
    const apiPath = `${process.env.ABI_FOLDER}/${name}.sol/${name}.json`
    return require(apiPath).abi
}
function getAddress(name) {
    const addressesFile = fs.readFileSync(process.env.ADDRESS_FILE, 'utf-8')
    const addresses = JSON.parse(addressesFile)
    return addresses[name]
}

const implMeta = name => ({
    abi: getABI(name),
    address: getAddress(name + "Proxy") // 通过代理地址操作合约
})

const proxyMeta = name => ({
    abi: getABI(name + "Proxy"),
    address: getAddress(name + "Proxy")
})

module.exports = {
    implWithSigner: function(name) {
        const {abi, address} = implMeta(name)
        const contract = new ethers.Contract(address, abi, provider)
        return contract.connect(wallet)
    },
    proxyWithSigner: function(name) {
        const {abi, address} = proxyMeta(name)
        const contract = new ethers.Contract(address, abi, provider)
        return contract.connect(wallet)
    }
}