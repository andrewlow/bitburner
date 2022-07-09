/** @param {NS} ns */
export async function main(ns) {
	//
	// starter script - target every node we can root
	// and run an attack on n00dles
	var port0 = [
		"n00dles",
		"foodnstuff",
		"sigma-cosmetics",
		"joesguns",
		"hong-fang-tea",
		"harakiri-sushi",
		"nectar-net"]

	for (var i = 0; i < port0.length; i++) {
		await ns.exec("bust.js", "home", 1, "n00dles", port0[i])
	}
}
