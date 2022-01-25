export async function main(ns) {
	var target = ns.args[0];
	var moneyThresh = ns.getServerMaxMoney(target) * 0.85;
	var securityThresh = ns.getServerMinSecurityLevel(target) + 5;
	while (ns.getServerMoneyAvailable(target) > 0) {
		if (ns.getServerSecurityLevel(target) > securityThresh) {
			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
			await ns.grow(target);
		} else {
			await ns.hack(target);
		}
	}
	ns.tprint(target + " has been depleted \n");
	
}