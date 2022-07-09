/** @param {NS} ns */
export async function main(ns) {
	// bust.js target host
	// target = machine to attack
	// host = machine to run on
	var target = ns.args[0]
	var host = ns.args[1]

	ns.tprint("Using " + host + " to attack " + target)
	// exploit host if needed
	exploit(ns, host)

	await ns.scp("attack.js", host)
	// figure out how many copies we can run
	var req = ns.getScriptRam("attack.js", host)
	var ram = ns.getServerMaxRam(host)
	var copies = Math.floor(ram / req)
	await ns.exec("attack.js", host, copies, target)
}

function exploit(ns, host) {
	var numPorts = ns.getServerNumPortsRequired(host)
	if (numPorts == 0) {
		// Easy, we are good to go
		ns.nuke(host)
	}
	if (numPorts == 1) {
		// check if we have BruteSSH.exe yet
		if (!ns.fileExists("BruteSSH.exe", "home")) {
			ns.tprint("Need BruteSSH.exe first")
			ns.exit()
		}
		ns.brutessh(host)
		ns.nuke(host)

	}
	if (numPorts == 2) {
		// check for BruteSSH.exe AND FTPCrack.exe	
		if (!ns.fileExists("BruteSSH.exe", "home") | !ns.fileExists("FTPCrack.exe", "home")) {
			ns.tprint("Need BruteSSH.exe and FTPCrack.exe first")
			ns.exit()
		}
		ns.brutessh(host)
		ns.ftpcrack(host)
		ns.nuke(host)
	}
	if (numPorts == 3) {
		if (!ns.fileExists("BruteSSH.exe", "home") |
			!ns.fileExists("FTPCrack.exe", "home") |
			!ns.fileExists("relaySMTP.exe", "home")) {
			ns.tprint("Need BruteSSH.exe, FTPCrack.exe and relaySMTP.exe first")
			ns.exit()
		}
		ns.brutessh(host)
		ns.ftpcrack(host)
		ns.relaysmtp(host)
		ns.nuke(host)
	}
	if (numPorts >= 4) {
		ns.tprint("Too many ports to hack")
		ns.exit()
	}
}
