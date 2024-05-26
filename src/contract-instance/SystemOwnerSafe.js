const ethers = require("ethers")
const instantiate = require("./instantiate.js")

const {getABI, getAddress, wallets, provider} = instantiate

class SystemOwnerSafe {
    constructor({SafeProxyAddr, signerWallet}) {
        if (SafeProxyAddr == undefined) {
            SafeProxyAddr = getAddress("SystemOwnerSafe")
        }
        if (signerWallet == undefined) {
            signerWallet = wallets[0]
        }
        const SafeABI = getABI("Safe")
        const contract = new ethers.Contract(SafeProxyAddr, SafeABI, provider).connect(signerWallet)
        
        this.wallet = signerWallet
        this.impl = contract
    }
    connect(signer) {
        this.impl = this.impl.connect(signer)
    }
    /* 合约方法 */
    execTransaction(target, data) {
        const signature = ethers.solidityPacked(
            ["uint256","bytes32","uint8"],
            [
                BigInt(this.wallet.address),
                ethers.ZeroHash,
                1
            ]
        )
        return this.impl.execTransaction(
            target, // to
            0, // value
            data,
            0, // operation, 0: Call, 1: DelegateCall
            0, // safeTxGas
            0, // baseGas
            0, // gasPrice
            ethers.ZeroAddress,
            ethers.ZeroAddress,
            signature
        )
    }
}

module.exports = SystemOwnerSafe