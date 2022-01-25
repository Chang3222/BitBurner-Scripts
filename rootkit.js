/** @param {NS} ns **/
export async function main(ns) {
	let type = ns.args[0];
	let members = ns.gang.getMemberNames();
	let equipments = ns.gang.getEquipmentNames().filter(equip => ns.gang.getEquipmentType(equip) == type);
	let price = 0;

	for (let i = 0; i < equipments.length; i++) {
		price += ns.gang.getEquipmentCost(equipments[i]);
	}

	if (price * members.length > ns.getPlayer().money) ns.tprint("not enough money");
	else {
		for (let i = 0; i < members.length; i++) {
			for (let j = 0; j < equipments.length; j++) {
				ns.gang.purchaseEquipment(members[i], equipments[j]);
			}
		}
	}
}