// Emergecy Prevention - Withdral Pause/Unpause
const SuperchainConfig = require("../contracts/SuperchainConfig.js")

async function pause() {
    console.log("SuperchainConfig.pause")
    console.log("paused (before):", await SuperchainConfig.paused())
    let txResponse = await SuperchainConfig.pause(new Date().toLocaleString())
    await txResponse.wait()
    console.log("paused (after):", await SuperchainConfig.paused())
}

async function unpause() {
    console.log("SuperchainConfig.unpause")
    console.log("paused (before):", await SuperchainConfig.paused())
    let txResponse = await SuperchainConfig.unpause()
    await txResponse.wait()
    console.log("paused (after):", await SuperchainConfig.paused())
}

async function run() {
    await pause()
    await unpause()
}

// run()

module.exports = run