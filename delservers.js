/** @param {NS} ns **/
export async function main(ns) {
	let servidores = ns.getPurchasedServers();
	for (let i = 0; i < servidores.length; i++) {
		ns.killall(servidores[i]);
		ns.deleteServer(servidores[i]);
	}
}