import { getOpenServers, maxDeploy, sudoAllPossible } from "util.js";

export async function main(ns) {
	let bob = true;
	let targets;
	while (bob) {
		bob = false;
		await sudoAllPossible(ns, "home");
		targets = getOpenServers(ns, "home");
		for (let target of targets) {
			if (ns.getServerMoneyAvailable(target) == 0 || target == "home") continue;
			else bob = true;
			for (let server of targets) {
				ns.tprint("Deploying function on " + server + '\n');
				await maxDeploy(ns, server, [target], "hack.js");
			}
			while (ns.getServerMoneyAvailable(target) > 0) await ns.asleep(1000);
			for (let server of targets) {
				if (server == "home") continue;
				ns.killall(server);
			}
		}
	}
	ns.tprint("All servers have been depleted\n");
}