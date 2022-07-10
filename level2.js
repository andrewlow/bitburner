/** @param {NS} ns */
export async function main(ns) {
	//
	// starter script - target every node we can root
	// and run an attack on args[0]
	var port2 = [
		"omega-net",
		"silver-helix",
		"phantasy",
		"the-hub",
		"avmnite-02h"]

	ns.tprintf("Attacking " + ns.args[0] + ' with all port 2 servers')

	for (var i = 0; i < port2.length; i++) {
		// first kill if anything on the server
		await ns.killall(port2[i], false)

		// run bust on this server
		await ns.exec("bust.js", "home", 1, ns.args[0], port2[i])
	}
}
