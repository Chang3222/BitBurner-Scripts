/** @param {NS} ns **/
export async function main(ns) {
	let members = ns.gang.getMemberNames();
	let task;
	let tasks = ns.gang.getTaskNames();
	let bolo = false;
	for (let word of ns.args) task += (word + ' ');
	task = task.slice(0, -1);
	task = task.slice(9);
	for (let t of tasks) if (task == t) bolo = true;
	if (bolo) {
		for (let member of members) {
			ns.gang.setMemberTask(member, task);
		}
	}
	else ns.tprint("Tarefa inexistente\n");
}