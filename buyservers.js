/** @param {NS} ns **/
export async function main(ns) {
	let aux = ns.args[0];
	let budget;
	let ram = 2;
	let i = 0;
	if (aux == 0) budget = ns.getPlayer().money;
	else budget = aux;
	while (ns.getPurchasedServerLimit() * ns.getPurchasedServerCost(ram) < budget && ram < ns.getPurchasedServerMaxRam()) {
		ram *= 2;
	}
	ram /= 2;
	for (i = 0; i < ns.getPurchasedServerLimit(); i++) {
		ns.purchaseServer("server-" + i, ram);
	}
	ns.tprint(i + " servidores de " + ram + " RAM adquiridos por " + ns.getPurchasedServerCost(ram) + " cada");
}