import "regenerator-runtime/runtime";

import { initContract, login, logout } from "./utils";

import getConfig from "./config";
const { networkId } = getConfig("development");

const BOATLOAD_OF_GAS = "300000000000000";

window.addEventListener("DOMContentLoaded", (event) => {
	const avatarContainer = document.getElementById("avatar-container");
	let currentAvatar = Date.now().toString();
	let currentName = "Martin Tale";

	const LOADING_SVG = `<svg xmlns="http://www.w3.org/2000/svg" class="loading" viewBox="0 0 24 24"><path d="M13.75 22c0 .966-.783 1.75-1.75 1.75s-1.75-.784-1.75-1.75.783-1.75 1.75-1.75 1.75.784 1.75 1.75zm-1.75-22c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 10.75c.689 0 1.249.561 1.249 1.25 0 .69-.56 1.25-1.249 1.25-.69 0-1.249-.559-1.249-1.25 0-.689.559-1.25 1.249-1.25zm-22 1.25c0 1.105.896 2 2 2s2-.895 2-2c0-1.104-.896-2-2-2s-2 .896-2 2zm19-8c.551 0 1 .449 1 1 0 .553-.449 1.002-1 1-.551 0-1-.447-1-.998 0-.553.449-1.002 1-1.002zm0 13.5c.828 0 1.5.672 1.5 1.5s-.672 1.501-1.502 1.5c-.826 0-1.498-.671-1.498-1.499 0-.829.672-1.501 1.5-1.501zm-14-14.5c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm0 14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2z"/></svg>`;
	console.log(document.body);
	console.log(document.getElementById("new-candidate-button"));
	document.getElementById("new-candidate-button").onclick = (e) => {
		document.getElementById("new-candidate-popup").style.display = "flex";
		document.getElementById("signed-in-flow").style.filter = "blur(5px)";
	};

	document.getElementById("close-new-candidate-popup").onclick = (e) => {
		document.getElementById("new-candidate-popup").style.display = "none";
		document.getElementById("signed-in-flow").style.filter = "none";
	};

	const randomizeButton = document.getElementById("randomize-candidate");

	function startLoadingButton(button) {
		// const size = button.getBoundingClientRect();

		button.innerHTML = LOADING_SVG;
		button.style.pointerEvents = "none";
		button.style.display = "flex";
		button.style.justifyContent = "center";
		button.style.alignItems = "center";
		// button.style.width = size.width + "px";
		// button.style.height = size.height + "px";
	}

	function stopLoadingButton(button, content) {
		button.innerHTML = content;
		button.style.pointerEvents = "all";
		button.style.display = "inherit";
		// button.style.width = "inherit";
		// button.style.height = "inherit";
	}

	const candidateNameInput = document.getElementById("name");

	async function randomizeCandidate() {
		startLoadingButton(randomizeButton);
		randomizeAvatar();
		const randomUser = await fetch("https://randomuser.me/api/", {
			mode: "cors",
		});
		const randomUserData = await randomUser.json();
		const randomUserName = randomUserData.results[0].name;
		currentName = randomUserName.first + " " + randomUserName.last;
		candidateNameInput.value = currentName;
		stopLoadingButton(randomizeButton, "Randomize!");
	}

	randomizeButton.onclick = randomizeCandidate;

	const addCandidateButton = document.getElementById("save-new-candidate");
	const addCandidateHitlerButton = document.getElementById(
		"save-new-candidate-hitler"
	);
	const addCandidateTrumpButton = document.getElementById(
		"save-new-candidate-trump"
	);
	const addCandidateSantaButton = document.getElementById(
		"save-new-candidate-santa"
	);

	addCandidateButton.onclick = async () => {
		try {
			startLoadingButton(addCandidateButton);
			// make an update call to the smart contract
			const response = await window.contract.addCandidate(
				{
					// pass the value that the user entered in the greeting field
					avatar: currentAvatar,
					name: currentName,
				},
				BOATLOAD_OF_GAS
			);

			updateResponse(response.messages, response.success);
			updateCandidates();
			randomizeCandidate();
			document.getElementById("new-candidate-popup").style.display =
				"none";
			document.getElementById("signed-in-flow").style.filter = "none";
		} catch (e) {
			console.log(e);
			alert(
				"Something went wrong! " +
					"Maybe you need to sign out and back in? " +
					"Check your browser console for more info."
			);
			throw e;
		} finally {
			// re-enable the form, whether the call succeeded or failed
			stopLoadingButton(addCandidateButton, "Add Candidate");
		}
	};

	addCandidateHitlerButton.onclick = async () => {
		try {
			startLoadingButton(addCandidateHitlerButton);
			// make an update call to the smart contract
			const response = await window.contract.addCandidateHitlerMode(
				{
					// pass the value that the user entered in the greeting field
					name: currentName,
				},
				BOATLOAD_OF_GAS
			);

			updateResponse(response.messages, response.success);
			updateCandidates();
			randomizeCandidate();
			document.getElementById("new-candidate-popup").style.display =
				"none";
			document.getElementById("signed-in-flow").style.filter = "none";
		} catch (e) {
			console.log(e);
			alert(
				"Something went wrong! " +
					"Maybe you need to sign out and back in? " +
					"Check your browser console for more info."
			);
			throw e;
		} finally {
			// re-enable the form, whether the call succeeded or failed
			stopLoadingButton(
				addCandidateHitlerButton,
				`<img src="https://img.icons8.com/dusk/64/000000/hitler--v1.png" />`
			);
		}
	};

	addCandidateTrumpButton.onclick = async () => {
		try {
			startLoadingButton(addCandidateTrumpButton);
			// make an update call to the smart contract
			const response = await window.contract.addCandidateTrumpMode(
				{
					// pass the value that the user entered in the greeting field
					avatar: currentAvatar,
					name: currentName,
				},
				BOATLOAD_OF_GAS
			);

			updateResponse(response.messages, response.success);
			updateCandidates();
			randomizeCandidate();
			document.getElementById("new-candidate-popup").style.display =
				"none";
			document.getElementById("signed-in-flow").style.filter = "none";
		} catch (e) {
			console.log(e);
			alert(
				"Something went wrong! " +
					"Maybe you need to sign out and back in? " +
					"Check your browser console for more info."
			);
			throw e;
		} finally {
			// re-enable the form, whether the call succeeded or failed
			stopLoadingButton(
				addCandidateTrumpButton,
				`<img src="https://img.icons8.com/color/48/000000/donald-trump.png" />`
			);
		}
	};

	addCandidateSantaButton.onclick = async () => {
		try {
			startLoadingButton(addCandidateSantaButton);
			// make an update call to the smart contract
			const response = await window.contract.addCandidateSantaMode(
				{
					// pass the value that the user entered in the greeting field
					avatar: currentAvatar,
					name: currentName,
				},
				BOATLOAD_OF_GAS
			);

			updateResponse(response.messages, response.success);
			updateCandidates();
			randomizeCandidate();
			document.getElementById("new-candidate-popup").style.display =
				"none";
			document.getElementById("signed-in-flow").style.filter = "none";
		} catch (e) {
			console.log(e);
			alert(
				"Something went wrong! " +
					"Maybe you need to sign out and back in? " +
					"Check your browser console for more info."
			);
			throw e;
		} finally {
			// re-enable the form, whether the call succeeded or failed
			stopLoadingButton(
				addCandidateSantaButton,
				`<img src="https://img.icons8.com/office/80/000000/santa.png" />`
			);
		}
	};

	const clearVoteButton = document.getElementById("clear-vote");
	clearVoteButton.onclick = async (e) => {
		try {
			startLoadingButton(clearVoteButton);
			const response = await window.contract.removeVote(
				{},
				BOATLOAD_OF_GAS
			);

			updateResponse(response.messages, response.success);
			updateCandidates();
		} catch (e) {
			console.log(e);
			alert(
				"Something went wrong! " +
					"Maybe you need to sign out and back in? " +
					"Check your browser console for more info."
			);
			throw e;
		} finally {
			stopLoadingButton(clearVoteButton, "Clear Your Vote");
		}
	};

	const restartElectionButton = document.getElementById("restart-election");
	restartElectionButton.onclick = async (e) => {
		try {
			startLoadingButton(restartElectionButton);
			const response = await window.contract.startNewElection(
				{},
				BOATLOAD_OF_GAS
			);

			updateResponse(response.messages, response.success);
			updateCandidates();
		} catch (e) {
			console.log(e);
			alert(
				"Something went wrong! " +
					"Maybe you need to sign out and back in? " +
					"Check your browser console for more info."
			);
			throw e;
		} finally {
			stopLoadingButton(restartElectionButton, "Clear Your Vote");
		}
	};

	const randomVoteButton = document.getElementById("random-vote");
	randomVoteButton.onclick = async (e) => {
		try {
			startLoadingButton(randomVoteButton);
			const response = await window.contract.vote360NoScopeMode(
				{},
				BOATLOAD_OF_GAS
			);

			updateResponse(response.messages, response.success);
			updateCandidates();
		} catch (e) {
			console.log(e);
			alert(
				"Something went wrong! " +
					"Maybe you need to sign out and back in? " +
					"Check your browser console for more info."
			);
			throw e;
		} finally {
			stopLoadingButton(randomVoteButton, "360° No Scope Vote");
		}
	};

	document.querySelector("#sign-in-button").onclick = login;
	document.querySelector("#sign-out-button").onclick = logout;

	// Display the signed-out-flow container
	function signedOutFlow() {
		document.querySelector("#signed-out-flow").style.display = "block";
	}

	// Displaying the signed in flow container and fill in account-specific data
	function signedInFlow() {
		document.querySelector("#signed-in-flow").style.display = "block";

		document
			.querySelectorAll("[data-behavior=account-id]")
			.forEach((el) => {
				el.innerText = window.accountId;
			});

		randomizeCandidate();
		updateCandidates();
	}

	const responseContainer = document.getElementById("response");

	function updateResponse(messages, success) {
		responseContainer.classList.toggle("error", success === false);
		responseContainer.classList.toggle("success", success === true);
		responseContainer.classList.add("shake");
		responseContainer.innerHTML =
			"<span>" + messages.join("</span><span>") + "</span>";
		setTimeout(() => {
			responseContainer.classList.remove("shake");
		}, 600);
	}

	function randomizeAvatar(avatar) {
		currentAvatar = Date.now().toString();
		avatarContainer.src =
			"https://avatars.dicebear.com/api/open-peeps/" +
			currentAvatar +
			".svg";
	}

	function sortByVotes(a, b) {
		if (a.value.voteCount > b.value.voteCount) {
			return -1;
		} else if (a.value.voteCount < b.value.voteCount) {
			return 1;
		}

		return 0;
	}

	const candidateListContainer = document.getElementById("candidate-list");
	async function updateCandidates() {
		try {
			// make an update call to the smart contract
			const candidates = await window.contract.viewCandidates();

			candidateListContainer.innerHTML = "";

			const aliveCandidates = candidates.filter(
				(candidate) => candidate.value.alive
			);

			aliveCandidates.sort(sortByVotes);
			const deadCandidates = candidates.filter(
				(candidate) => candidate.value.alive === false
			);
			deadCandidates.sort(sortByVotes);

			candidateListContainer.innerHTML += `<strong style="display: flex;text-decoration: underline;">Alive</strong>`;

			for (let i = 0; i < aliveCandidates.length; i += 1) {
				const candidate = aliveCandidates[i].value;

				let voteWord = "votes";
				if (candidate.voteCount == 1) {
					voteWord = "vote";
				}

				let lastElement = "";
				if (i == aliveCandidates.length - 1) {
					lastElement = 'style="border-bottom: 0"';
				}

				candidateListContainer.innerHTML += `<div class="candidate alive" ${lastElement}>
        <div class="rank">${i + 1}</div>
        <img src="https://avatars.dicebear.com/api/open-peeps/${
			candidate.avatar
		}.svg">
        <div class="details">
          <strong>${candidate.name}</strong>
          <span>${candidate.voteCount} ${voteWord}</span>
        </div>
        <div class="actions">
          <button class="vote" data-id="${aliveCandidates[i].key}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z"/></svg>
          </button>
          <button class="kill" data-id="${aliveCandidates[i].key}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g class="" transform="translate(0,0)" style=""><path d="M255.997 16.004c-120 0-239.997 60-239.997 149.998C16 226.002 61 256 61 316c0 45-15 45-15 75 0 14.998 48.01 32.002 89.998 44.998v60h239.997v-60s90.567-27.957 90-45c-.933-27.947-15-30-15-74.998 0-30 45.642-91.42 44.998-149.998 0-90-119.998-149.998-239.996-149.998zm-90 179.997c33.137 0 60 26.864 60 60 0 33.136-26.863 60-60 60C132.863 316 106 289.136 106 256c0-33.136 26.862-60 59.998-60zm179.998 0c33.136 0 60 26.864 60 60 0 33.136-26.864 60-60 60-33.136 0-60-26.864-60-60 0-33.136 26.864-60 60-60zm-89.998 105c15 0 45 60 45 75 0 29.998 0 29.998-15 29.998h-60c-15 0-15 0-15-30 0-15 30-74.998 45-74.998z" fill-opacity="1"></path></g></svg>
          </button>
          <button class="revive" data-id="${aliveCandidates[i].key}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g class="" transform="translate(0,0)" style=""><path d="M463.46 37.008l-30.694 50.738-7.043-2.28c-27.146-8.797-71.525-7.15-97.6.11L321.22 87.5l-28.68-48.543c-33.63 69.254-32.264 117.56-14.79 148.574 18.71 33.208 57.378 49.09 99.117 48.574 48.743-.606 88.968-19.665 107.035-54.194 16.918-32.332 15.684-80.456-20.443-144.902zM323.935 137.594c18.45.1 29.36 15.338 31.462 36.644-37.11 17.91-53.963 3.398-61.173-26.545 11.382-7.063 21.324-10.144 29.71-10.1zm109.26 0c8.385-.045 18.328 3.036 29.71 10.1-7.21 29.942-24.064 44.454-61.174 26.544 2.104-21.306 13.014-36.545 31.463-36.644zm-293.553 50.96c-1.226-.01-2.446-.003-3.66.018-30.175.536-56.142 10.59-75.743 26.574-43.444 35.43-57.27 100.752-12.824 166.192 20.293 33.995 44.432 54.24 70.797 64.187 32.85 12.395 66.655 8.823 99.94 4.114 33.284-4.71 65.854-10.63 96.896-8.42 31.04 2.212 62.09 10.18 90.505 41.165 19.374 21.125 46.887-1.627 23.82-24.156-35.024-34.207-72.527-47.42-109.377-50.04-36.85-2.62-72.2 4.698-104.207 9.228-32.007 4.53-60.272 6.552-84.558-2.61-14.39-5.43-28.308-14.802-41.55-31.142h351.744c13.673-52.293 14.867-106.368 1.873-142.072-19.765 8.49-42.412 12.9-66.2 13.197h-.002c-29.85.37-59.458-6.925-82.907-22.823-4.647 3.012-9.407 6.23-14.292 9.685l-5.734 4.057-5.49-4.382c-46.63-37.2-91.028-52.48-129.03-52.773z" fill-opacity="1"></path></g></svg>
          </button>
        </div>
      </div>`;
			}

			candidateListContainer.innerHTML += `<strong style="display: flex;text-decoration: underline;">Deceased</strong>`;

			for (let i = 0; i < deadCandidates.length; i += 1) {
				const candidate = deadCandidates[i].value;

				let voteWord = "votes";
				if (candidate.voteCount == 1) {
					voteWord = "vote";
				}

				let lastElement = "";
				if (i == aliveCandidates.length - 1) {
					lastElement = 'style="border-bottom: 0"';
				}

				candidateListContainer.innerHTML += `<div class="candidate dead" ${lastElement}>
        <div class="rank">${i + 1}</div>
        <img src="https://avatars.dicebear.com/api/open-peeps/${
			candidate.avatar
		}.svg">
        <div class="details">
          <strong>${candidate.name}</strong>
          <span>${candidate.voteCount} ${voteWord}</span>
        </div>
        <div class="actions">
          <button class="vote" data-id="${deadCandidates[i].key}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z"/></svg>
          </button>
          <button class="kill" data-id="${deadCandidates[i].key}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g class="" transform="translate(0,0)" style=""><path d="M255.997 16.004c-120 0-239.997 60-239.997 149.998C16 226.002 61 256 61 316c0 45-15 45-15 75 0 14.998 48.01 32.002 89.998 44.998v60h239.997v-60s90.567-27.957 90-45c-.933-27.947-15-30-15-74.998 0-30 45.642-91.42 44.998-149.998 0-90-119.998-149.998-239.996-149.998zm-90 179.997c33.137 0 60 26.864 60 60 0 33.136-26.863 60-60 60C132.863 316 106 289.136 106 256c0-33.136 26.862-60 59.998-60zm179.998 0c33.136 0 60 26.864 60 60 0 33.136-26.864 60-60 60-33.136 0-60-26.864-60-60 0-33.136 26.864-60 60-60zm-89.998 105c15 0 45 60 45 75 0 29.998 0 29.998-15 29.998h-60c-15 0-15 0-15-30 0-15 30-74.998 45-74.998z" fill-opacity="1"></path></g></svg>
          </button>
          <button class="revive" data-id="${deadCandidates[i].key}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g class="" transform="translate(0,0)" style=""><path d="M463.46 37.008l-30.694 50.738-7.043-2.28c-27.146-8.797-71.525-7.15-97.6.11L321.22 87.5l-28.68-48.543c-33.63 69.254-32.264 117.56-14.79 148.574 18.71 33.208 57.378 49.09 99.117 48.574 48.743-.606 88.968-19.665 107.035-54.194 16.918-32.332 15.684-80.456-20.443-144.902zM323.935 137.594c18.45.1 29.36 15.338 31.462 36.644-37.11 17.91-53.963 3.398-61.173-26.545 11.382-7.063 21.324-10.144 29.71-10.1zm109.26 0c8.385-.045 18.328 3.036 29.71 10.1-7.21 29.942-24.064 44.454-61.174 26.544 2.104-21.306 13.014-36.545 31.463-36.644zm-293.553 50.96c-1.226-.01-2.446-.003-3.66.018-30.175.536-56.142 10.59-75.743 26.574-43.444 35.43-57.27 100.752-12.824 166.192 20.293 33.995 44.432 54.24 70.797 64.187 32.85 12.395 66.655 8.823 99.94 4.114 33.284-4.71 65.854-10.63 96.896-8.42 31.04 2.212 62.09 10.18 90.505 41.165 19.374 21.125 46.887-1.627 23.82-24.156-35.024-34.207-72.527-47.42-109.377-50.04-36.85-2.62-72.2 4.698-104.207 9.228-32.007 4.53-60.272 6.552-84.558-2.61-14.39-5.43-28.308-14.802-41.55-31.142h351.744c13.673-52.293 14.867-106.368 1.873-142.072-19.765 8.49-42.412 12.9-66.2 13.197h-.002c-29.85.37-59.458-6.925-82.907-22.823-4.647 3.012-9.407 6.23-14.292 9.685l-5.734 4.057-5.49-4.382c-46.63-37.2-91.028-52.48-129.03-52.773z" fill-opacity="1"></path></g></svg>
          </button>
        </div>
      </div>`;
			}

			candidateListContainer
				.querySelectorAll(".vote")
				.forEach((voteButton) => {
					voteButton.onclick = async (e) => {
						const target = e.target.closest(".vote");
						try {
							startLoadingButton(target);
							const response = await window.contract.vote(
								{
									candidateId: target.getAttribute("data-id"),
								},
								BOATLOAD_OF_GAS
							);

							updateResponse(response.messages, response.success);
							updateCandidates();
						} catch (e) {
							console.log(e);
							alert(
								"Something went wrong! " +
									"Maybe you need to sign out and back in? " +
									"Check your browser console for more info."
							);
							throw e;
						} finally {
							// re-enable the form, whether the call succeeded or failed
							updateCandidates();
						}
					};
				});

			candidateListContainer
				.querySelectorAll(".kill")
				.forEach((killButton) => {
					killButton.onclick = async (e) => {
						const target = e.target.closest(".kill");
						try {
							startLoadingButton(target);
							const response =
								await window.contract.removeCandidate(
									{
										candidateId:
											target.getAttribute("data-id"),
									},
									BOATLOAD_OF_GAS
								);

							updateResponse(response.messages, response.success);
							updateCandidates();
						} catch (e) {
							console.log(e);
							alert(
								"Something went wrong! " +
									"Maybe you need to sign out and back in? " +
									"Check your browser console for more info."
							);
							throw e;
						} finally {
							// re-enable the form, whether the call succeeded or failed
							updateCandidates();
						}
					};
				});

			candidateListContainer
				.querySelectorAll(".revive")
				.forEach((reviveButton) => {
					reviveButton.onclick = async (e) => {
						const target = e.target.closest(".revive");
						try {
							startLoadingButton(target);
							const response =
								await window.contract.askCatToReviveCandidate(
									{
										candidateId:
											target.getAttribute("data-id"),
									},
									BOATLOAD_OF_GAS
								);

							updateResponse(response.messages, response.success);
							updateCandidates();
						} catch (e) {
							console.log(e);
							alert(
								"Something went wrong! " +
									"Maybe you need to sign out and back in? " +
									"Check your browser console for more info."
							);
							throw e;
						} finally {
							// re-enable the form, whether the call succeeded or failed
							updateCandidates();
						}
					};
				});

			updateVotes(candidates);
			updateLogs();
		} catch (e) {
			console.log(e);
			alert(
				"Something went wrong! " +
					"Maybe you need to sign out and back in? " +
					"Check your browser console for more info."
			);
			throw e;
		}
	}

	const voteListContainer = document.getElementById("vote-list");
	async function updateVotes(candidates) {
		try {
			// make an update call to the smart contract
			const votes = await window.contract.viewVotes();

			voteListContainer.innerHTML = "";

			for (let i = 0; i < votes.length; i += 1) {
				const voter = votes[i].key;
				const votedFor =
					candidates[votes[i].value.candidateId].value.name;

				let lastElement = "";
				if (i == votes.length - 1) {
					lastElement = 'style="border-bottom: 0"';
				}

				voteListContainer.innerHTML += `<div class="vote" ${lastElement}>
        <div class="details">
          <strong>${votedFor}</strong>
          <span>${voter}</span>
        </div>
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z"/></svg>
        </div>
		  </div>`;
			}
		} catch (e) {
			console.log(e);
			alert(
				"Something went wrong! " +
					"Maybe you need to sign out and back in? " +
					"Check your browser console for more info."
			);
			throw e;
		}
	}

	const logListContainer = document.getElementById("log-list");
	async function updateLogs() {
		try {
			// make an update call to the smart contract
			let logs = await window.contract.viewLogs();

			logs = logs.reverse();

			logListContainer.innerHTML = "";

			for (let i = 0; i < logs.length; i += 1) {
				logListContainer.innerHTML += `<div class="log">
          <span>${logs[i].value.user}</span>
          <strong>${logs[i].key}. ${logs[i].value.action}</strong>
		  </div>`;
			}
		} catch (e) {
			console.log(e);
			alert(
				"Something went wrong! " +
					"Maybe you need to sign out and back in? " +
					"Check your browser console for more info."
			);
			throw e;
		}
	}

	// `nearInitPromise` gets called on page load
	window.nearInitPromise = initContract()
		.then(() => {
			if (window.walletConnection.isSignedIn()) signedInFlow();
			else signedOutFlow();
		})
		.catch(console.error);

	let s = {};
	s.a = document.getElementById("snowfall-element");
	s.b = s.a.getContext("2d");
	s.c = function () {
		this.a = Math.random() * 2 + 2;
		this.b = Math.random() * s.a.width - this.a - 1 + this.a + 1;
		this.c = this.b;
		this.d = Math.random() * 50 + 1;
		this.e = Math.random();
		this.f = Math.random() * Math.PI * 2;
		this.g = Math.random() * 1.5 + 0.5;
		this.i = Math.random() * s.a.height - this.a - 1 + this.a + 1;
		this.j = () => {
			if (this.i > s.a.height + this.a) {
				this.i = -this.a;
			} else {
				this.i += this.g;
			}
			this.f += 0.02;
			this.b = this.c + this.d * Math.sin(this.f);
			s.b.fillStyle = "rgba(255,255,255," + this.e + ")";
			s.b.fillRect(this.b, this.i, this.a, this.a);
		};
	};
	s.e = () => {
		s.a.width = window.innerWidth;
		s.a.height = window.innerHeight;
		s.d = [];
		for (
			let x = 0;
			x < Math.ceil((s.a.width * s.a.height) / 15000);
			x += 1
		) {
			s.d.push(new s.c());
		}
	};
	window.addEventListener("resize", s.e);
	s.f = () => {
		requestAnimationFrame(s.f);
		s.b.clearRect(0, 0, s.a.width, s.a.height);
		for (let x in s.d) {
			s.d[x].j();
		}
	};
	s.e();
	s.f();
});
