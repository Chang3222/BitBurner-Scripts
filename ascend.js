/** @param {NS} ns **/
export async function main(ns) {
	let members = ns.gang.getMemberNames();
	for(let gangster of members){
		ns.gang.ascendMember(gangster);
	}
}