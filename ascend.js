/** @param {NS} ns **/
export async function main(ns) {
	let members = ns.gang.getMemberNames();
	for(let i = 0; i < members.length; i++){
		ns.gang.ascendMember(members[i]);
	}
}