export function swap(items, leftIndex, rightIndex) {
	var temp = items[leftIndex];
	items[leftIndex] = items[rightIndex];
	items[rightIndex] = temp;
}

export function partition(ns, items, left, right) {
	var pivot = ns.getServerRequiredHackingLevel(items[Math.floor((right + left) / 2)]),
		i = left,
		j = right;
	while (i <= j) {
		while (ns.getServerRequiredHackingLevel(items[i]) < pivot) {
			i++;
		}
		while (ns.getServerRequiredHackingLevel(items[j]) > pivot) {
			j--;
		}
		if (i <= j) {
			swap(items, i, j);
			i++;
			j--;
		}
	}
	return i;
}

export function quickSort(ns, items, left, right) {
	var index;
	if (items.length > 1) {
		index = partition(ns, items, left, right);
		if (left < index - 1) {
			quickSort(ns, items, left, index - 1);
		}
		if (index < right) {
			quickSort(ns, items, index, right);
		}
	}
	return items;
}

export function getServers(ns, root) {
	const list = [root];
	const queue = [root];
	while (queue.length > 0) {
		let server = queue.shift();
		for (const s of ns.scan(server)) {
			if (list.find(l => l == s)) continue;
			queue.push(s);
			list.push(s);
		}
	}
	return quickSort(ns, list, 0, list.length - 1);
};

export function getOpenServers(ns, root) {
	return getServers(ns, root).filter(server => ns.hasRootAccess(server));
}

export async function maxDeploy(ns, host, scriptArgs, scriptName) {
	const threads = Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / ns.getScriptRam(scriptName));
	if (threads == 0) return;
	await ns.scp(scriptName, ns.getHostname(), host);
	ns.exec(scriptName, host, threads, ...scriptArgs);
};

export function getSudo(ns, server) {
	while (!ns.hasRootAccess(server)) {
		ns.nuke(server);
	}
}

export async function sudoAllPossible(ns, root) {
	let serverList = getServers(ns, root).filter(server => !ns.hasRootAccess(server));
	let breachers = 0;

	if (ns.fileExists("BruteSSH.exe")) breachers++;
	if (ns.fileExists("HTTPWorm.exe")) breachers++;
	if (ns.fileExists("SQLInject.exe")) breachers++;
	if (ns.fileExists("FTPCrack.exe")) breachers++;
	if (ns.fileExists("relaySMTP.exe")) breachers++;

	for (const s of serverList) {
		if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(s) &&
			breachers >= ns.getServerNumPortsRequired(s) &&
			!ns.hasRootAccess(s)) {
			ns.tprint("Trying to get sudo on " + s + "\n");
			if (ns.fileExists("BruteSSH.exe")) ns.brutessh(s);
			if (ns.fileExists("HTTPWorm.exe")) ns.httpworm(s);
			if (ns.fileExists("SQLInject.exe")) ns.sqlinject(s);
			if (ns.fileExists("FTPCrack.exe")) ns.ftpcrack(s);
			if (ns.fileExists("relaySMTP.exe")) ns.relaysmtp(s);
			getSudo(ns, s);
		}
	}
}

export async function backAllPossible(ns, root) {
	let serverList = getServers(ns, root).filter(server => ns.hasRootAccess(server));

	for (const s of serverList) {
		ns.installBackdoor(s);
	}
}