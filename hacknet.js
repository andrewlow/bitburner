/** @param {NS} ns */
export async function main(ns) {
	// grow hacknet until maxed
	while (ns.hacknet.numNodes() < ns.hacknet.maxNumNodes()) {
		// this is a dumb race, but whatever spend money on what works

		// be dumb, just try to buy one
		await ns.hacknet.purchaseNode(1)

		// for every hacknet node we own - upgrade levels to max 
		for (var i = 0; i < ns.hacknet.numNodes(); i++) {
			await ns.hacknet.upgradeLevel(i, 1)
			await ns.hacknet.upgradeRam(i,1)
			await ns.hacknet.upgradeCore(i,1)
		}

		// Sleep
		await ns.sleep(5000)
	}
}
