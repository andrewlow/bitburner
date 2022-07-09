var allServers = new Array()

/** @param {NS} ns */
export async function main(ns) {
	var numPorts = ns.args[0]

	ns.tprint("Scanning for all servers with port level " + numPorts)
	addScan(ns, "home")

	// now walk them all looking for appropriate port level
	for (var i = 0; i < allServers.length; i++) {
		var serv = ns.getServer(allServers[i])
		if (serv["numOpenPortsRequired"] == numPorts) {
			// found the port count, is this one idle
			var ps = ns.ps(allServers[i])
			var busy = "\t<<working>>"
			if (ps.length == 0) {
				busy = ""
			}
			// does it have memory?
			if (serv["maxRam"] > 0) {

				ns.tprint(allServers[i] + " " + busy)
			}
		}
	}
}

function addScan(ns, host) {
	var scan = ns.scan(host)
	for (var i = 0; i < scan.length; i++) {
		if (!allServers.includes(scan[i])) {
			allServers.push(scan[i])
			addScan(ns, scan[i])
		}
	}
}
