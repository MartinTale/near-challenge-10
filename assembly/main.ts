import {
	context,
	PersistentVector,
	PersistentUnorderedMap,
	MapEntry,
	math,
} from "near-sdk-as";

@nearBindgen
class Candidate {
	voteCount: number;
	alive: boolean;

	constructor(public name: string, public avatar: string) {
		this.voteCount = 0;
		this.alive = true;
	}
}

@nearBindgen
class Vote {
	constructor(public candidateId: number) {
		
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

const candidates = new PersistentUnorderedMap<number, Candidate>("m");
const votes = new PersistentUnorderedMap<string, Vote>("n");
const logs = new PersistentUnorderedMap<number, ActionLog>("b");

function randomNumber(min = 0, max = 100): i32 {
	const buf = math.randomBuffer(4);
	return i32(min + (((((0xff & buf[0]) << 24) |
	((0xff & buf[1]) << 16) |
	((0xff & buf[2]) << 8) |
	((0xff & buf[3]) << 0)) as number) % (max - min)
	));
}

function randomBoolean(): boolean {
	return randomNumber(0, 100) >= 50;
}

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

export function addCandidate(name: string, avatar: string): CallResponse {
	const candidate = new Candidate(name, avatar);

	candidates.set(candidates.length, candidate);

	log('Added candidate ' + candidate.name);

	return response([candidate.name + ' successfully added!'], true);
}

export function vote(candidateId: string): CallResponse {
	const candidateIntId = parseInt(candidateId);

	if (votes.contains(context.sender)) {
		return response(['You have already voted!'], false);
	}

	const candidate = candidates.get(candidateIntId);

	if (candidate == null) {
		return response(["Candidate doesn't exist!"], false);
	}

	if (candidate.alive) {
		candidate.voteCount += 1;
	
		candidates.set(candidateIntId, candidate);
	
		votes.set(context.sender, new Vote(candidateIntId));

		log('Voted for ' + candidate.name);
	
		return response(["Successfully voted for " + candidate.name + "!"], true);
	} else {
		return response([
			"You can't vote for the dead!",
			"Or can you?",
			"No, no, you can't :p",
		], false);
	}
}

export function viewCandidates(): MapEntry<number, Candidate>[] {
	return candidates.entries();
}

// Additional Features

export function viewVotes(): MapEntry<string, Vote>[] {
	return votes.entries();
}

export function viewLogs(): MapEntry<number, ActionLog>[] {
	return logs.entries().slice(-20);
}

export function removeCandidate(candidateId: string): CallResponse {
	const candidateIntId = parseInt(candidateId);
	const candidate = candidates.get(candidateIntId);

	if (candidate == null) {
		return response(["Candidate doesn't exist! I guess that's something you wanted in the first place!"], true);
	}

	candidate.alive = false;

	candidates.set(candidateIntId, candidate);

	log('Removed candidate ' + candidate.name);

	return response([candidate.name + ' "removed" from election!'], true);
}

export function removeVote(): CallResponse {
	if (votes.contains(context.sender)) {
		const lastVote = votes.get(context.sender);
		let lastVoteCandidate: Candidate | null = null;

		if (lastVote) {
			lastVoteCandidate = candidates.get(lastVote.candidateId);
	
			if (lastVoteCandidate) {
				lastVoteCandidate.voteCount -= 1;
	
				candidates.set(lastVote.candidateId, lastVoteCandidate);
			}

			votes.delete(context.sender);
		}

		if (lastVoteCandidate) {
			log('Removed his vote for ' + lastVoteCandidate.name);
			return response(['Your vote for ' + lastVoteCandidate.name + ' has been removed!'], true);
		} else {
			return response(['Your vote has been removed!'], true);
		}
	} else {
		return response(["Dodged a bullet there! You didn't vote for a candidate before!"], true);
	}
}

export function addCandidateTrumpMode(name: string, avatar: string): CallResponse {
	const candidate = new Candidate(name, avatar);

	candidate.voteCount = randomNumber(100, 10000);
	
	candidates.set(candidates.length, candidate);

	log("Added candidate " + candidate.name + " in Trump mode with " + candidate.voteCount.toString() + " votes");

	return response([
		candidate.name + ' successfully added!',
		'...',
		'Crowd roars! ' + candidate.name + ' gets ' + candidate.voteCount.toString() + ' votes!',
	], true);
}

export function addCandidateSantaMode(name: string, avatar: string): CallResponse {
	const candidate = new Candidate(name, avatar);

	const candidateEntries = candidates.entries();

	for (let i = 0; i < candidateEntries.length; i += 1) {
		candidateEntries[i].value.voteCount += randomNumber(9000, 10000);
		candidates.set(candidateEntries[i].key, candidateEntries[i].value);
	}

	candidate.voteCount += randomNumber(9000, 10000);
	candidates.set(candidates.length, candidate);

	log("Added candidate " + candidate.name + " in Santa mode");

	return response([
		candidate.name + ' successfully added!',
		'Ho, Ho, Ho!',
		'Everyone gets 9000+ votes!',
	], true);
}

export function addCandidateHitlerMode(name: string): CallResponse {
	log("Tried adding candidate " + name + " in Hitler mode");
	return response([
		name + ' has joined the party!',
		'...',
		name + ' has left the party!',
		'...',
		'Wait! Why is he not moving???',
	], true);
}

export function askCatToReviveCandidate(candidateId: string): CallResponse {
	const candidateIntId = parseInt(candidateId);
	const candidate = candidates.get(candidateIntId);

	if (candidate == null) {
		return response(["Are you kidding me? Candidate has not been alive yet!"], false);
	}

	if (candidate.alive) {
		return response(["Eh? He's already alive! What are you doing with your life?"], false);
	}

	if (randomBoolean()) {
		candidate.alive = true;
	
		candidates.set(candidateIntId, candidate);

		log("Made Cat revive " + candidate.name);

		return response([
			"Cat's a merciful god and your wish has been granted!",
			candidate.name + ' lives again!',
		], true);
	} else {
		log("Was rejected by Cat to revive " + candidate.name);

		return response([
			"Cat's not in a mood right now!",
			'Try again later ;)',
		], false);
	}
}

export function vote360NoScopeMode(): CallResponse {
	const messages: string[] = [];

	if (votes.contains(context.sender)) {
		const previousVote = votes.get(context.sender);
		let previousVoteCandidate: Candidate | null = null;

		if (previousVote) {
			previousVoteCandidate = candidates.get(previousVote.candidateId);

			if (previousVoteCandidate) {
				previousVoteCandidate.voteCount -= 1;

				candidates.set(previousVote.candidateId, previousVoteCandidate);
			}
		}

		votes.delete(context.sender);

		if (previousVoteCandidate) {
			messages.push('You jump the system and your previous vote (' + previousVoteCandidate.name + ') has been removed!');
		} else {
			messages.push('You jump the system and your previous vote has been removed!');
		}
	} else {
		messages.push('You jump!');
	}

	messages.push('You spin!');
	messages.push('You vote!');
	messages.push('...');

	const candidateIds = candidates.keys();
	const randomCandidateId = candidateIds[randomNumber(0, candidateIds.length)];
	const randomCandidate = candidates.get(randomCandidateId);

	if (randomCandidate) {
		randomCandidate.voteCount += 1;
	
		candidates.set(randomCandidateId, randomCandidate);
		votes.set(context.sender, new Vote(randomCandidateId));

		log("Made a 360 No Scope vote for " + randomCandidate.name);

		messages.push('Vote lands on ' + randomCandidate.name);
	} else {
		messages.push('Nothing happens!');
	}

	return response(messages, true);
}

export function getLeadingCandidate(): CallResponse {
	let totalNumberOfVotes = 0;
	let leadingCandidate = new Candidate('Nobody', randomNumber(0, 1000000).toString());
	let leadingCandidateVoteCount = -1;
	const candidateEntries = candidates.entries();

	for (let i = 0; i < candidateEntries.length; i += 1) {
		const candidate = candidateEntries[i].value;

		totalNumberOfVotes += i32(candidate.voteCount);

		if (candidate.voteCount > leadingCandidateVoteCount) {
			leadingCandidate = candidate;
			leadingCandidateVoteCount = i32(candidate.voteCount);
		}
	}

	if (leadingCandidate) {
		const percentageVotes = Math.round((leadingCandidate.voteCount / totalNumberOfVotes) * 100);
		return response([
			leadingCandidate.name + " is currently in 1st place with " + percentageVotes.toString() + "% (" + leadingCandidate.voteCount.toString() + ") votes!",
		], true);
	} else {
		return response(["There are no candidates. Nobody is winning. Voting system sad! :("], false);
	}
}

export function startNewElection(): CallResponse {
	let totalNumberOfVotes = 0;
	let leadingCandidate = new Candidate('Nobody', randomNumber(0, 1000000).toString());
	let leadingCandidateVoteCount = -1;
	const candidateEntries = candidates.entries();

	for (let i = 0; i < candidateEntries.length; i += 1) {
		const candidate = candidateEntries[i].value;

		totalNumberOfVotes += i32(candidate.voteCount);

		if (candidate.voteCount > leadingCandidateVoteCount) {
			leadingCandidate = candidate;
			leadingCandidateVoteCount = i32(candidate.voteCount);
		}
	}

	candidates.clear();
	votes.clear();

	log("Started new election!");

	if (leadingCandidate) {
		const percentageVotes = Math.round((leadingCandidate.voteCount / totalNumberOfVotes) * 100);
		return response([
			leadingCandidate.name + " won the election with " + percentageVotes.toString() + "% (" + leadingCandidate.voteCount.toString() + ") votes!",
			"...",
			"Starting a new election!"
		], true);
	} else {
		return response([
			"Nobody won the election",
			"...",
			"Starting a new election!"
		], true);
	}
}
