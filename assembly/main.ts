import {
	context,
	PersistentUnorderedMap,
	MapEntry,
} from "near-sdk-as";

@nearBindgen
class Pet {
	donations: number;
	
	constructor() {
		this.donations = 0;
	}
}

@nearBindgen
class CallResponse {
	constructor(
		public success: boolean,
		public messages: string[],
	) {

	}
}

@nearBindgen
class ActionLog {
	constructor(
		public user: string,
		public action: string,
	) {

	}
}

// const petList = ['Cat', 'Dog', 'Human', 'Pig', 'Sheep', 'Cow', 'Chicken', 'Guinea Pig', 'Duck', 'Bee', 'Horse', 'Bird', 'Fish', 'Rabbit'];
const petList = ['Cat', 'Dog', 'Human'];
const pets = new PersistentUnorderedMap<string, Pet>("m");
const logs = new PersistentUnorderedMap<number, ActionLog>("b");

function response(messages: string[], success: boolean): CallResponse {
	return new CallResponse(success, messages)
}

function log(message: string): void {
	const logEntries = logs.keys();
	logs.set(logEntries.length, new ActionLog(
		context.sender,
		message,
	));
}

export function donate(fund: string): CallResponse {
	const donation = parseFloat(context.attachedDeposit.toString()) / (10 ** 24);
	if (donation == 0) {
		return response(['Try attaching deposit!'], false);
	}

	if (petList.includes(fund) == false) {
		return response([fund + " fund doesn't exist!"], false);
	}

	if (pets.contains(fund)) {
		const pet = pets.get(fund);

		if (pet) {
			pet.donations += donation;
			pets.set(fund, pet);

			log('Donated ' + donation.toString() + ' NEAR to ' + fund + ' fund!')

			return response([
				'Thank you for ' + donation.toString() + ' NEAR donation!',
			], true);
		} else {
			return response(["This shouldn't happen!"], false);
		}
	} else {
		const pet = new Pet();

		pet.donations += donation;
		pets.set(fund, pet);

		log('Donated ' + donation.toString() + ' NEAR to ' + fund + ' fund!')

		return response([
			'Thank you for ' + donation.toString() + ' NEAR donation!',
		], true);
	}
}

export function viewPets(): MapEntry<string, Pet>[] {
	return pets.entries();
}

export function viewLogs(): MapEntry<number, ActionLog>[] {
	return logs.entries().slice(-20);
}
