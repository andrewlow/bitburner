/** @param {NS} ns */
export async function main(ns) {
	//
	// starter script - target every node we can root
	// and run an attack on args[0]
	var port0 = [
		"n00dles",
		"foodnstuff",
		"sigma-cosmetics",
		"joesguns",
		"hong-fang-tea",
		"harakiri-sushi",
		"nectar-net"]

	ns.tprintf("Attacking " + ns.args[0] + ' with all port 0 servers')

	for (var i = 0; i < port0.length; i++) {
		// first kill if anything on the server
		await ns.killall(port0[i], false)

		// run bust on this server
		await ns.exec("bust.js", "home", 1, ns.args[0], port0[i])
	}
}
