const SuperchainConfig = require("../src/contract-instance/SuperchainConfig.js")
const scc = new SuperchainConfig()

async function pause() {
    console.log("SuperchainConfig.pause")
    console.log("paused (before):", await scc.paused())
    let txResponse = await scc.pause(new Date().toLocaleString())
    await txResponse.wait()
    console.log("paused (after):", await scc.paused())
}

async function unpause() {
    console.log("SuperchainConfig.unpause")
    console.log("paused (before):", await scc.paused())
    let txResponse = await scc.unpause()
    await txResponse.wait()
    console.log("paused (after):", await scc.paused())
}

async function run() {
    await pause()
    await unpause()
}

// run()

module.exports = run