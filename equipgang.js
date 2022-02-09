/** @param {NS} ns **/
export async function main(ns) {
	let type = ns.args[0];
	let members = ns.gang.getMemberNames();
	let equipments = ns.gang.getEquipmentNames().filter(equip => ns.gang.getEquipmentType(equip) == type);
	let price = 0;

	if(equipments.length == 0){
		ns.tprint("Non existent type\n");
		return;
	}

	for (let i of equipments) {
		price += ns.gang.getEquipmentCost(i);
	}

	if (price * members.length > ns.getPlayer().money) ns.tprint("Not enough money");
	else {
		for (let member of members) {
			for (let equipment of equipments) {
				ns.gang.purchaseEquipment(member, equipment);
			}
		}
	}
}