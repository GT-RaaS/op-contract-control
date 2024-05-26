const instantiate = require("./instantiate.js")

const {implWithSigner} = instantiate

const impl = implWithSigner("ProxyAdmin")

class ProxyAdmin {
    constructor() {
        this.impl = impl
    }
    connect(signer) {
        this.impl = this.impl.connect(signer)
    }
    /* 合约方法 */
    ////// read //////
    addressManager() {
        return this.impl.addressManager()
    }
    getProxyAdmin(proxy) {
        return this.impl.getProxyAdmin(proxy)
    }
    getProxyImplementation(proxy) {
        return this.impl.getProxyImplementation(proxy)
    }
    implementationName(address) {
        return this.impl.implementationName(address)
    }
    isUpgrading() {
        return this.impl.isUpgrading()
    }
    owner() {
        return this.impl.owner()
    }
    proxyType(address) {
        return this.impl.proxyType(address)
    }
    ////// write //////
    changeProxyAdmin(proxy, newAdmin) {
        return this.impl.changeProxyAdmin(proxy, newAdmin)
    }
    setAddressManager(address) {
        return this.impl.setAddressManager(address)
    }
    setImplementationName(address, name) {
        return this.impl.setImplementationName(address, name)
    }
    setProxyType(address, type) {
        return this.impl.setProxyType(address, type)
    }
    setUpgrading(upgrading) {
        return this.impl.setUpgrading(upgrading)
    }
    transferOwnership(newOwner) {
        return this.impl.transferOwnership(newOwner)
    }
    upgrade(proxy, implementation) {
        return this.impl.upgrade(proxy, implementation)
    }
    upgradeAndCall(proxy, implementation, data) {
        return this.impl.upgradeAndCall(proxy, implementation, data)
    }
}

module.exports = ProxyAdmin