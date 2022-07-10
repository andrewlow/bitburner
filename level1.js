/** @param {NS} ns */
export async function main(ns) {
	//
	// starter script - target every node we can root
	// and run an attack on args[0]
	var port1 = [
		"zer0",
		"max-hardware",
		"CSEC",
		"neo-net",
		"iron-gym"]

	ns.tprintf("Attacking " + ns.args[0] + ' with all port 1 servers')

	for (var i = 0; i < port1.length; i++) {
		// first kill if anything on the server
		await ns.killall(port1[i], false)

		// run bust on this server
		await ns.exec("bust.js", "home", 1, ns.args[0], port1[i])
	}
}
